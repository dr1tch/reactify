const fs = require("fs")
const { resolve, join } = require("path")
const execSync = require("child_process").execSync
const os = require("os")

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
            execSync("yarn install", {
                encoding: "utf-8",
            })
        } else {
            installPkgs(name, version)
        }
    } catch (error) {
        console.error({ error })
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
    const isPackageChanged = changedFiles.some((file) =>
            file.startsWith("packages/ui")
        )
        // ensure that changes are only in packages/ui
    if (!isPackageChanged) {
        console.log('No changes in "packages/ui/". Skipping package build.')

        return process.exit(0)
    }
    const pkgFile = resolve("packages/ui", "package.json")
    let packageJson = JSON.parse(await fs.promises.readFile(pkgFile, "utf-8"))
    const commitHash = execSync("git rev-parse --short HEAD")
        .toString("utf-8")
        .trim()
        // let packageJson = require('./package.json'); // Adjust the path as necessary
    const pkgVersion = branchName.split("/").join("-")
    const version = packageJson.version.split("-")[0]
    const previewVersion = `${version}-${pkgVersion}-${commitHash}`
    if (branchName !== "main" && branchName !== "master") {
        //   const safeBranchName = makeBranchSafeForNpm(branchName)
        // previewVersion.version = `${baseVersion}-${safeBranchName}`;
        packageJson.version = previewVersion
    } else {
        packageJson.version = getNewVersion(version)
    }
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
        ) // Adjust the path as necessary
    const changesAdded = execSync("git status").toString().trim()
    if (changesAdded) {
        execSync(
            `git commit -am "updating package version to ${packageJson.version}"`
        )
    }
    execSync("cd ../packages/ui && yarn release-it --verbose", { encoding: "utf-8" })
    const rootPackagePath = resolve("package.json") // Adjust the path to your root package

    const rootPackageJson = JSON.parse(
        await fs.promises.readFile(rootPackagePath, "utf-8")
    )

    // Assuming your package is a dependency in the root package.json
    rootPackageJson.dependencies[packageJson.name] = packageJson.version

    await fs.promises.writeFile(
        rootPackagePath,
        JSON.stringify(rootPackageJson, null, 2)
    )
    console.log("Installing packages again..")
    installPkgs(packageJson.name, packageJson.version)
    execSync(`git branch --set-upstream-to=origin/${branchName ?? "HEAD^"}`)
    const pwd = execSync("pwd").toString().trim()
    console.log(`Writing package.json in ${pwd}`)
    console.log("Committing and pushing changes...")
    const rootCommitCommands = [
        `git commit -am "updating ${packageJson.name} to ${packageJson.version}"`,
        "git push",
    ].join(" && ")
    execSync(rootCommitCommands, {
        encoding: "utf-8",
    })
    console.log("Done!")
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})