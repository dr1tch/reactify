const fs = require('fs');
const path = require('path');

function updateRootPackageVersion(packagePath, rootPackagePath) {
    const packageJson = require(packagePath);
    const rootPackageJson = require(rootPackagePath);

    // Assuming your package is a dependency in the root package.json
    rootPackageJson.dependencies[packageJson.name] = packageJson.version;

    fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackageJson, null, 2));
    const pwd = execSync('pwd').toString().trim();
    console.log(`Writing package.json in ${pwd}`);
}

const packagePath = path.resolve(__dirname, '../packages/ui/package.json'); // Adjust the path to your package
const rootPackagePath = path.resolve(__dirname, '../package.json'); // Adjust the path to your root package

updateRootPackageVersion(packagePath, rootPackagePath);