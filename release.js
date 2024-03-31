const fs = require("fs")
const fsPromises = fs.promises
const appendFileSync = fs.appendFileSync
const path = require("path")
const resolve = path.resolve
const join = path.join
const execSync = require("child_process").execSync
const os = require("os")

// For JSON files, require them directly
const uiPkg = require("./packages/ui/package.json")
const rootPkg = require("./package.json")
async function main() {
    const branchName = execSync("git rev-parse --abbrev-ref HEAD", {
        encoding: "utf-8",
    }).trim()
    console.log({ branchName })

    // list changed files (similar to git diff --name-only master..pr-branch)
    const changedFiles = execSync(
            `git diff --name-only origin/master..${branchName}`, { encoding: "utf-8" }
        )
        .split("\n")
        .filter(Boolean)
    console.log({ changedFiles })
    const isPackageChanged = changedFiles.some((file) =>
        file.startsWith("packages/ui/")
    )
    console.log({ isPackageChanged })
    const isPreviewBranch = branchName.startsWith("preview/")
        // ensure that changes are only in packages/ui
    if (!isPackageChanged /*|| !isPreviewBranch*/ ) {
        console.log('No changes in "packages/ui/". Skipping package build.')

        return
    }
    const commitHash = execSync("git rev-parse --short HEAD")
        .toString("utf-8")
        .trim()
    const pkgVersion = branchName.split("/").join("-")
    const version = uiPkg.version.split("-")[0]
    let previewVersion = ""
    if (!branchName.includes("preview")) {
        return
    }
    previewVersion = `${version}-${pkgVersion}-${commitHash}`
    uiPkg.version = previewVersion
    await fsPromises.writeFile('./packages/ui/package.json', JSON.stringify(uiPkg, null, 2), "utf-8")
    console.log(`upgrading package version to ${uiPkg.version}`)
        // Commit the changes
        // execSync("cd packages/ui && yarn install ", {
        //   encoding: "utf-8",
        // })
    console.log("Committing changes...")
    const commitChangesComands = [
        "git add .",
        `git commit -m "upgrading package version to ${uiPkg.version}"`,
    ].join(" && ")
    const releaseCommit = execSync(commitChangesComands, {
        encoding: "utf-8",
    })

    console.log("Commit Output: \n", releaseCommit)
    console.log(`Updated package version to: ${previewVersion}`)
        // Generating new .npmrc file
    console.log("Generating new .npmrc file...")
        // const npmrcPath = join(os.homedir(), ".npmrc")
    const nodeAuthToken = process.env.NPM_TOKEN
        // if (nodeAuthToken) {
        //   const registeryContent = [
        //     `//registry.npmjs.org/:_authToken=${nodeAuthToken}`,
        //     "registry=https://registry.npmjs.org/",
        //     "always-auth=true",
        //   ]
        //   for (const line of registeryContent) {
        //     appendFileSync(npmrcPath, `${line}\n`)
        //   }
        // }
    const whoAmI = execSync("npm whoami", { encoding: "utf-8" })
    console.log("whoami: ", whoAmI)
        // Building and Publishing the package
    console.log("Building and Publishing the package...")
    execSync(`git branch --set-upstream-to=origin/${branchName}`)
    execSync("cd packages/ui && yarn release-it", {
        encoding: "utf-8",
        env: {
            ...process.env,
            npm_config_registry: "https://registry.npmjs.org/",
        },
    })
    console.log("published with success!")
        // Update root package.json
    console.log("Updating root package.json...")
    rootPkg.dependencies[uiPkg.name] = uiPkg.version
    await fsPromises.writeFile(
            "./package.json",
            JSON.stringify(rootPkg, null, 2),
            "utf-8"
        )
        // Commit the changes
    console.log("Committing and pushing changes...")
    const rootCommitCommands = [
        "git add package.json",
        `git commit -m "updating ${uiPkg.name} to ${uiPkg.version}"`,
        "git push origin HEAD",
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