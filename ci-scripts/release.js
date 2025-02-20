import {execSync} from "child_process"
import fs from "fs"
import {join} from "path"
import os from "os"

function listChangedFiles() {
    // Get changes between the current commit and its parent
    return execSync(
        'git diff --name-only HEAD HEAD^',
        { encoding: 'utf-8' }
    )
        .split('\n')
        .filter(Boolean)
}

async function generateNpmrc(nodeAuthToken) {
    const npmrcPath = join(os.homedir(), ".npmrc")
    const registryContent = [
        `//registry.npmjs.org/:_authToken=${nodeAuthToken}`,
        "registry=https://registry.npmjs.org/",
        "always-auth=true",
    ].join("\n")
    await fs.promises.writeFile(npmrcPath, registryContent + "\n")
}

async function publishToNpm(path) {
        // 1 - check if there is changes in the api package
        console.log(`checking for changes in packages/${path}...`)
        const changedFiles = listChangedFiles()
        console.log({changedFiles})

        // - if no changes, abort
        if (!changedFiles.some((file) => file.startsWith(`packages/${path}/`))) {
            console.log(`No changes in ${path}. Skipping package build.`)
            return process.exit(0)
        }

        // Generate .npmrc with authentication
        if (process.env.NODE_AUTH_TOKEN) {
            console.log("Generating new .npmrc file...")
            await generateNpmrc(process.env.NODE_AUTH_TOKEN)
        }

        // 2 - get the latest commit hash
        console.log("getting the latest commit hash...")
        const lastCommitHash = execSync("git rev-parse --short HEAD").toString().trim()
        console.log({lastCommitHash})

        console.log("preparing to publish package...")
        const newVersion = `0.0.1-${lastCommitHash}`
        console.log({newVersion})
        // moving to the package directory
        execSync(`cd packages/${path}`, {stdio: "inherit"})

        // logging current path
        console.log("path: ", process.cwd())

        // Build package
        console.log("Building package...")
        execSync("yarn build", {stdio: "inherit"})

        // Store original version
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

        try {
            // Publish with yarn
            console.log(`Publishing version ${newVersion}...`)
            execSync(`yarn publish --access public --new-version ${newVersion} --non-interactive --no-git-tag-version`, {
                stdio: "inherit"
            })

            // Revert version in package.json
            console.log("Reverting package.json version...")
            packageJson.version = "0.0.1"
            fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n')

            console.log("Package published successfully!")
        } catch (error) {
            // Revert version in package.json even if publish fails
            console.log("Publishing failed, reverting package.json version...")
            packageJson.version = "0.0.1"
            fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n')
            process.exit(1)
        }

}

publishToNpm("ui").catch((error) => {
    console.error("Error during publishing ui:", error)
    process.exit(1)
})

publishToNpm("api").catch((error) => {
    console.error("Error during publish:", error)
    process.exit(1)
})