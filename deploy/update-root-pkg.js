const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;


async function updateRootPackageVersion(packagePath, rootPackagePath) {
    const packageJson = JSON.parse(await fs.promises.readFile(packagePath, "utf-8"));
    const rootPackageJson = JSON.parse(await fs.promises.readFile(rootPackagePath, "utf-8"));;

    // Assuming your package is a dependency in the root package.json
    rootPackageJson.dependencies[packageJson.name] = packageJson.version;

    await fs.promises.writeFile(rootPackagePath, JSON.stringify(rootPackageJson, null, 2));
    const pwd = execSync('pwd').toString().trim();
    console.log(`Writing package.json in ${pwd}`);
    console.log("Committing and pushing changes...")
        // execSync('git add .');
    const status = execSync('git status --porcelain').toString();
    console.log({ status })
        // if (status) {
        //     execSync(`git commit -m "updating ${packageJson.name} to ${packageJson.version}"`);
        //     execSync('git push');
        // } else {
        //     console.log('No changes to commit');
        // }
    const rootCommitCommands = [
        `git commit -am "updating ${packageJson.name} to ${packageJson.version}"`,
        `git push`,
    ].join(" && ")
    execSync(rootCommitCommands, {
        encoding: "utf-8",
    })
    console.log("Done!")
}


const packagePath = path.resolve(__dirname, '../packages/ui/package.json'); // Adjust the path to your package
const rootPackagePath = path.resolve(__dirname, '../package.json'); // Adjust the path to your root package

updateRootPackageVersion(packagePath, rootPackagePath).catch(e => console.error({ e }));