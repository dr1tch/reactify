const fs = require("fs")
const { resolve, join } = require("path")
const execSync = require("child_process").execSync
const os = require("os")
const moment = require("moment")
const latestCommitHash = execSync("git rev-parse HEAD").toString().trim()

function rollback() {
    console.log("Rolling back changes...")
    execSync(`git reset --hard ${latestCommitHash}`)
    console.log("Changes rolled back successfully.")
}

function getCurrentBranchName() {
    return execSync("git rev-parse --abbrev-ref HEAD").toString().trim()
}

function getNewVersion(version) {
    const [major, minor, patch] = version.split(".").map((v) => parseInt(v))

    return [major, minor, patch + 1].join(".")
}

function listChangedFiles() {
    let baseCommit = ""
    const branchName = getCurrentBranchName()
    let headCommit = ""
    let eventData = {}
    if (branchName === "master" && !!process.env.GITHUB_EVENT_NAME) {
        eventData = JSON.parse(
            fs.readFileSync(process.env.GITHUB_EVENT_PATH || "", "utf8")
        )
        if (eventData.action === "opened") {
            baseCommit = process.env.GITHUB_BASE_REF
            headCommit = process.env.GITHUB_HEAD_REF
        } else if (process.env.GITHUB_EVENT_NAME === "push") {
            baseCommit = "HEAD^" // The previous commit
            headCommit = process.env.GITHUB_SHA // The latest commit SHA
        }
    } else {
        baseCommit = execSync("git rev-parse HEAD^").toString().trim()
        headCommit = execSync("git rev-parse HEAD").toString().trim()
    }

    // Fetch the list of changed files in the merge
    const changedFiles = execSync(
            `git diff --name-only ${baseCommit} ${headCommit ?? ""}`, { encoding: "utf-8" }
        )
        .split("\n")
        .filter(Boolean)

    return changedFiles
}

function checkPackageAvailability(packageName, version) {
    try {
        execSync(`npm view ${packageName}@${version}`)
        console.log(`${packageName}@${version} is available`)

        return true
    } catch (error) {
        console.error(`Error: ${packageName}@${version} is not available`)

        return false
    }
}

function installPkgs(name, version) {
    try {
        if (checkPackageAvailability(name, version)) {
            // Install the package
            console.log(`Installing ${name}@${version}`)
            execSync("yarn", { encoding: "utf-8" })
        } else {
            installPkgs(name, version)
        }
    } catch (error) {
        console.error({ error })
    }
}

function updateChangelog(version) {
    try {
        const changelogPath = resolve("packages/ui", "CHANGELOG.md")
        console.log("Reading changelog...")
        let changelogContent = ""
        try {
            changelogContent = fs.readFileSync(changelogPath, "utf-8")
            console.log("Changelog read successfully.")
        } catch {
            console.log(
                'Changelog file doesn\'t exist. Creating "CHANGELOG.md" file...'
            )
            changelogContent = ""
            fs.appendFileSync(changelogPath, "")
            console.log("Changelog file created!")
        }
        const branchName = getCurrentBranchName()
            // get new updates and format: "* <Commit Message> (<Issue Number>) <Commit Hash>"
        const newUpdates = execSync(
            `git log --no-merges --pretty=format:"* %s ([%h](https://github.com/dr1tch/reactify/commit/%H))" master..${branchName === "master" ? 'master' : branchName}`, { encoding: "utf-8" }
        )
        console.log({ newUpdates })
        if (newUpdates === "") {
            console.log("No new updates found.")

            return
        }
        const releaseHeader = `## ${version} (${moment().format("YYYY-MM-DD")})\n\n`
        const header = "# Changelog \n\n"

        let newChangelogContent

        if (!changelogContent.startsWith(header)) {
            newChangelogContent =
                header + releaseHeader + newUpdates + "\n\n" + changelogContent
        } else {
            newChangelogContent =
                header +
                releaseHeader +
                newUpdates +
                "\n\n" +
                changelogContent.substring(header.length)
        }

        fs.writeFileSync(changelogPath, newChangelogContent)
        console.log("Changelog updated successfully.")
    } catch (error) {
        console.error("Error updating changelog:", error)
    }
}

async function main() {
    let branchName = ""
    if (process.env.GITHUB_HEAD_REF) {
        branchName = process.env.GITHUB_HEAD_REF
    } else {
        branchName = getCurrentBranchName()
    }
    const changedFiles = listChangedFiles()
    console.log({ changedFiles })
    const isPackageChanged = changedFiles.some((file) =>
            file.startsWith("packages/ui")
        )
        // ensure that changes are only in packages/ui
    if (!isPackageChanged) {
        console.log('No changes in "packages/ui/". Skipping package build.')

        return process.exit(0)
    }
    console.log("Bumping version...")
    const pkgFile = resolve("packages/ui", "package.json")
    let packageJson = JSON.parse(await fs.promises.readFile(pkgFile, "utf-8"))
    const commitHash = execSync("git rev-parse --short HEAD")
        .toString("utf-8")
        .trim()
    const pkgVersion = branchName.split("/").join("-")
    const version = packageJson.version.split("-")[0]
    const previewVersion = `${version}-${pkgVersion}-${commitHash}`
    if (branchName !== "main" && branchName !== "master") {
        packageJson.version = previewVersion
    } else {
        packageJson.version = getNewVersion(version)
    }
    console.log(`New version: ${packageJson.version}`)
    console.log("Generating new .npmrc file...")
    const npmrcPath = join(os.homedir(), ".npmrc")
    const nodeAuthToken = process.env.NODE_AUTH_TOKEN
    if (nodeAuthToken) {
        const registeryContent = [
            `//registry.npmjs.org/:_authToken=${nodeAuthToken}`,
            "registry=https://registry.npmjs.org/",
            "always-auth=true",
        ]
        for (const line of registeryContent) {
            fs.appendFileSync(npmrcPath, `${line}\n`)
        }
    }
    await fs.promises.writeFile(
        pkgFile,
        JSON.stringify(packageJson, null, 2),
        "utf-8"
    )

    console.log("Build and Publish package...")
    execSync(
        `cd packages/ui && yarn install && yarn build && yarn publish --non-interactive --new-version ${packageJson.version} --access public`, {
            encoding: "utf-8",
        }
    )

    console.log("Updating changelog...")
    const isPreview = branchName !== "master"
    if (!isPreview) {
        console.log('Updating changelog for "master" branch...')
        updateChangelog(packageJson.version)
    }
    console.log("Updating root package.json...")
    const rootPackagePath = resolve("package.json")

    const rootPackageJson = JSON.parse(
        await fs.promises.readFile(rootPackagePath, "utf-8")
    )

    rootPackageJson.dependencies[packageJson.name] = packageJson.version

    await fs.promises.writeFile(
        rootPackagePath,
        JSON.stringify(rootPackageJson, null, 2)
    )
    console.log("Installing packages again..")
    installPkgs(packageJson.name, packageJson.version)
    const pwd = execSync("pwd").toString().trim()
    console.log(`Writing package.json in ${pwd}`)
    console.log("Committing and pushing changes...")
    const rootCommitCommands = [
        `git commit -am "chore: ${packageJson.name} release: v-${packageJson.version}"`,
        `git push origin ${branchName ?? "HEAD^"}`,
    ].join(" && ")
    execSync(rootCommitCommands, {
        encoding: "utf-8",
    })
    console.log("Done!")
}

main().catch((error) => {
    console.error({ error })
    rollback()
    process.exit(1)
})