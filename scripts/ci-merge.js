const { execSync } = require('child_process');
const core = require('@actions/core');

const { isPackageChanged, getNewVersion, buildPackage, publishPackage, listChangedFiles, eventPath } = require("./utils");

const mainMerge = async() => {
    const changedFiles = await listChangedFiles()
    console.log('Running for Merge');
    if (!isPackageChanged(changedFiles)) {
        console.log('No changes in "packages/ui/". Skipping package build.');
        return;
    }
    try {
        console.log({ EventPath: JSON.stringify(eventPath, null, 2) });
        const newVersion = getNewVersion();

        console.log('Upgrading version to: ', newVersion);


        const gitResult = execSync('cd packages/ui && git config user.email "github-actions@github.com" && git config user.name "github-actions[bot]" && ' +
            `newVersion=$(yarn version --new-version ${newVersion} | grep -oP "(?<=to\s).*(?=:)") && ` +
            'git commit -am "chore: release version $newVersion" && ' +
            'git push  ', { encoding: 'utf-8', stdio: 'pipe' });

        console.log()
        console.log('Building the package...');
        buildPackage();

        console.log('Publishing the package...');
        publishPackage(newVersion);

        console.log('Merge processing completed.');
    } catch (error) {
        console.error('Error:', error.message);

        if (error.stderr) {
            console.error('Error Output:');
            console.error(error.stderr.toString());
        }
        if (error.output) {
            console.error('Error Output:');
            console.error(error.output.toString());
        }
        core.setFailed(error.message);
    }
};

mainMerge();