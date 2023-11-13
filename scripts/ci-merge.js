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

        const bumpVersionCommand = [
            'cd packages/ui',
            `git config user.email "github-actions@github.com"`,
            `yarn version --new-version ${newVersion}`,
            `git push`
        ].join("&&")

        execSync(bumpVersionCommand, {encoding: "utf-8"})

        console.log('Building the package...');
        buildPackage();

        console.log('Publishing the package...');
        publishPackage(newVersion);

        console.log('Merge processing completed.');
    } catch (error) {
        console.log({ error });
        console.log("--------------------")
        console.log("--------------------")
        console.log(error.stderr.toString())
        console.log("--------------------")
        console.log("--------------------")
        core.setFailed(error.message);
    }
};

mainMerge();
