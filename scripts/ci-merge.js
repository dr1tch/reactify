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

        execSync('cd packages/ui && git config user.email "github-actions@github.com" && git config user.name "github-actions[bot]" && ' +
            'newVersion=$(yarn version --new-version $(getNewVersion) | grep -oP "(?<=to\s).*(?=:)") && ' +
            'git commit -am "chore: release version $newVersion" && ' +
            'git push && ' +
            'buildPackage && ' +
            'publishPackage $newVersion');

        console.log('Merge processing completed.');
    } catch (error) {
        console.log({ error });
        core.setFailed(error.message);
    }
};

mainMerge();