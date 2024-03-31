const fs = require('fs');
const execSync = require('child_process').execSync;

function getCurrentBranchName() {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function makeBranchSafeForNpm(branchName) {
    return branchName.replace(/[^a-zA-Z0-9]/g, '-');
}

function main() {
    const branchName = getCurrentBranchName();

    let packageJson = require('./package.json'); // Adjust the path as necessary
    const pkgFile = resolve("packages/ui", "package.json")
    console.dir(packageJson, { depth: null, colors: true })
    const baseVersion = packageJson.version.split('-')[0]; // Assumes version is in the format x.y.z
    if (branchName !== 'main' && branchName !== 'master') {
        const safeBranchName = makeBranchSafeForNpm(branchName);
        packageJson.version = `${baseVersion}-${safeBranchName}`;
    }
    const pwd = execSync('pwd').toString().trim();
    console.log(`Writing package.json in ${pwd}`);
    fs.writeFileSync(pkgFile, JSON.stringify(packageJson, null, 2)); // Adjust the path as necessary
}

main();