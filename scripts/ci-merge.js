const { execSync } = require('child_process');
const { readFileSync } = require('fs')
const core = require('@actions/core');

const { isPackageChanged, getNewVersion, buildPackage, publishPackage, listChangedFiles, eventPath } = require("./utils");

const mainMerge = async() => {
    const changedFiles = listChangedFiles()
    console.log('Running for Merge');
    if (!isPackageChanged(changedFiles)) {
        console.log('No changes in "packages/ui/". Skipping package build.');
        return;
    }
    try {
        console.log({ EventPath: JSON.stringify(eventPath, null, 2) });

        const newVersion = getNewVersion();

        console.log('Upgrading version to: ', newVersion);

        execSync(`cd packages/ui && yarn version --new-version ${newVersion}`, { encoding: 'utf-8' });

        console.log('Building the package...');
        buildPackage();

        console.log('Publishing the package...');
        publishPackage(newVersion);

        console.log('Merge processing completed.');
    } catch (error) {
        console.log({ error });
        core.setFailed(error.message);
    }
};

mainMerge();