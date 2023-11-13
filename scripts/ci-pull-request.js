const core = require('@actions/core');
const { readFileSync } = require('fs');

const { listChangedFiles, buildPackage, isPrNameValid } = require('./utils');


const mainPullRequest = async() => {
    console.log('Running for Pull Request');
    if (!isPackageChanged(listChangedFiles)) {
        console.log('No changes in "packages/ui/". Skipping package build.');
        return;
    }
    try {
        const ev = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
        console.log({ EventPath: JSON.stringify(ev, null, 2) });

        const prName = ev.pull_request.head.ref;

        if (!isPrNameValid(prName)) return;

        const changedFiles = await listChangedFiles();

        console.log('Changed Files:', changedFiles);

        if (changedFiles.some((file) => file.filename.startsWith('packages/ui/'))) {
            console.log('Package in "packages/ui/" has changed. Building the package...');
            buildPackage();
        } else {
            console.log('No changes in "packages/ui/". Skipping package build.');
        }

        console.log('Pull Request processing completed.');
    } catch (error) {
        console.log({ error });
        core.setFailed(error.message);
    }
};

mainPullRequest();