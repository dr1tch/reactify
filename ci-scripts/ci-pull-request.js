// const core = require('@actions/core');

const { listChangedFiles, buildPackage, isPrNameValid, eventPath, isPackageChanged } = require('./utils');
const { execSync } = require('child_process');


const mainPullRequest = async() => {
    const changedFiles = await listChangedFiles()
    console.log('Running for Pull Request');
    if (!isPackageChanged(changedFiles)) {
        console.log('No changes in "packages/ui/". Skipping package build.');
        return;
    }
    try {

        console.log({ EventPath: JSON.stringify(eventPath, null, 2) });

        const prName = eventPath.pull_request.head.ref;

        if (!isPrNameValid(prName)) return;

        console.log('Changed Files:', changedFiles);

        if (changedFiles.some((file) => file.filename.startsWith('packages/ui/'))) {
            console.log('Package in "packages/ui/" has changed. Building the package...');
            buildPackage();
            execSync('node ci-scripts/release-it-pr.js', { encoding: 'utf-8' })

        } else {
            console.log('No changes in "packages/ui/". Skipping package build.');
        }

        console.log('Pull Request processing completed.');
    } catch (error) {
        console.log({ error });
        // core.setFailed(error.message);
    }
};

mainPullRequest();