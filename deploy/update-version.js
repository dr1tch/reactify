const fs = require('fs');
const { resolve } = require('path');
const execSync = require('child_process').execSync;

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

    // let packageJson = require('./package.json'); // Adjust the path as necessary
    console.dir(packageJson, { depth: null, colors: true })
    const pkgVersion = branchName.split("/").join("-")
    const version = uiPkg.version.split("-")[0]
    const previewVersion = `${version}-${pkgVersion}-${commitHash}`
        // if (branchName !== 'main' && branchName !== 'master') {
    const safeBranchName = makeBranchSafeForNpm(branchName);
    // previewVersion.version = `${baseVersion}-${safeBranchName}`;
    packageJson.version = previewVersion;
    // }
    const pwd = execSync('pwd').toString().trim();
    console.log(`Writing package.json in ${pwd}`);
    await fs.promises.writeFile(pkgFile, JSON.stringify(packageJson, null, 2), "utf-8") // Adjust the path as necessary
    let packageJsonAfter = JSON.parse(await fs.promises.readFile(pkgFile, "utf-8"))
    console.dir(packageJsonAfter, { depth: null, colors: true })
}

main().catch(console.error);