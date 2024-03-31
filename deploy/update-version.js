const fs = require('fs');
const { resolve, join } = require('path');
const execSync = require('child_process').execSync;
const os = require('os');

function getCurrentBranchName() {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function makeBranchSafeForNpm(branchName) {
    return branchName.replace(/[^a-zA-Z0-9]/g, '-');
}

async function main() {
    const branchName = getCurrentBranchName();

    const pkgFile = resolve("package.json")
    let packageJson = JSON.parse(await fs.promises.readFile(pkgFile, "utf-8"))
    const commitHash = execSync("git rev-parse --short HEAD")
        .toString("utf-8")
        .trim()
        // let packageJson = require('./package.json'); // Adjust the path as necessary
    const pkgVersion = branchName.split("/").join("-")
    const version = packageJson.version.split("-")[0]
    const previewVersion = `${version}-${pkgVersion}-${commitHash}`
        // if (branchName !== 'main' && branchName !== 'master') {
    const safeBranchName = makeBranchSafeForNpm(branchName);
    // previewVersion.version = `${baseVersion}-${safeBranchName}`;
    packageJson.version = previewVersion;
    // }
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
    execSync(`git branch --set-upstream-to=origin/${branchName}`)
    const pwd = execSync('pwd').toString().trim();
    console.log(`Writing package.json in ${pwd}`);
    await fs.promises.writeFile(pkgFile, JSON.stringify(packageJson, null, 2), "utf-8") // Adjust the path as necessary

}

main().catch(console.error);