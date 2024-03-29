import { promises as fsPromises, appendFileSync } from "fs"
import { resolve, join } from "path"
import { execSync } from "child_process"
import os from "os"
import { listChangedFiles, rollback } from "./release-preview.js"

function getNewVersion(version) {
    const [major, minor, patch] = version.split(".").map((v) => parseInt(v))

    return [major, minor, patch + 1].join(".")
}

async function main() {
    // this will be executed when we merge the PR
    const changedFiles = listChangedFiles()
    console.log('changed files:\n')
    console.log({ changedFiles })
    const isPackageChanged = changedFiles.some((file) =>
            file.startsWith("packages/ui/")
        )
        // ensure that changes are only in packages/ui
    if (!isPackageChanged) {
        console.log('No changes in "packages/ui/". Skipping package build.')

        return
    }
    // setup git config
    console.log("Setting up git config...")
    const gitConfigSetupCommands = [
        "git config user.name github-actions[bot]",
        "git config user.email youssouf.kacemi@gmail.com",
    ].join(" && ")
    execSync(gitConfigSetupCommands, { encoding: "utf-8" })
        // const pkgFile = resolve("packages/ui", "package.json")
        // const pkgData = JSON.parse(await fsPromises.readFile(pkgFile, "utf-8"))
        // const version = pkgData.version.split("-")[0]
        // const newVersion = getNewVersion(version)
        // pkgData.version = newVersion
        // await fsPromises.writeFile(pkgFile, JSON.stringify(pkgData, null, 2), "utf-8")
    console.log(`upgrading package version`)
    console.log("Cleaning up...")
    const commitChangesComands = [
        `git add .`,
        `git commit -m "cleaning up"`,
    ].join(" && ")

    execSync(commitChangesComands, {
            encoding: "utf-8",
        })
        // Generating new .npmrc file
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
            appendFileSync(npmrcPath, `${line}\n`)
        }
    }
    // execSync(`git branch --set-upstream-to=origin/${branchName}`)
    console.log("Building and Publishing the package...")
    execSync(`cd packages/ui && yarn release-it:verbose`, {
        encoding: "utf-8",
        env: {
            ...process.env,
            npm_config_registry: "https://registry.npmjs.org/",
            always_auth: true,
            NODE_AUTH_TOKEN: nodeAuthToken,
        },
    })
    const pkgFile = resolve("packages/ui", "package.json")
    const pkgData = JSON.parse(await fsPromises.readFile(pkgFile, "utf-8"))
    const version = pkgData.version.split("-")[0]
    console.log("published with success!")
        // Update root package.json
    console.log("Updating root package.json...")
    const rootPKGFile = resolve("package.json")
    const RootData = JSON.parse(
        await fsPromises.readFile(rootPKGFile, "utf-8").catch((e) => {
            console.error({ e })
        })
    )
    RootData.dependencies[pkgData.name] = version
    await fsPromises.writeFile(
        rootPKGFile,
        JSON.stringify(RootData, null, 2),
        "utf-8"
    )

    console.log("Committing and pushing changes...")
    const rootCommitCommands = [
        `git add package.json`,
        `git commit -m "updating ${pkgData.name} to ${version}"`,
        `git push`,
    ].join(" && ")
    execSync(rootCommitCommands, {
        encoding: "utf-8",
    })
    console.log("Done!")
}

main().catch((err) => {
    console.error("Error: ", err)
    rollback()
    process.exit(1)
})