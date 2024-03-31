const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;


async function updateRootPackageVersion(packagePath, rootPackagePath) {
    const packageJson = JSON.parse(await fs.promises.readFile(packagePath, "utf-8"));
    const rootPackageJson = JSON.parse(await fs.promises.readFile(rootPackagePath, "utf-8"));;

    // Assuming your package is a dependency in the root package.json
    rootPackageJson.dependencies[packageJson.name] = packageJson.version;

    fs.promises.writeFile(rootPackagePath, JSON.stringify(rootPackageJson, null, 2));
    const pwd = execSync('pwd').toString().trim();
    console.log(`Writing package.json in ${pwd}`);
}


const pwd = execSync('pwd').toString().trim();
console.log(`Writing package.json in ${pwd}`);
const packagePath = path.resolve(__dirname, '../packages/ui/package.json'); // Adjust the path to your package
const rootPackagePath = path.resolve(__dirname, '../package.json'); // Adjust the path to your root package

updateRootPackageVersion(packagePath, rootPackagePath).catch(console.error);