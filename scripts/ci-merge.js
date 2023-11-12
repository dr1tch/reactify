const { execSync } = require('child_process');
const core = require('@actions/core');
const fs = require('fs');
const github = require('@actions/github');
const { version, publishType } = require('../packages/ui/package.json')
const getNewVersion = () => {
    const [major, minor, patch] = version.split('.').map((v) => parseInt(v));
    switch (publishType) {
        case 'patch':
            return [major, minor, patch + 1].join('.');
        case 'minor':
            return [major, minor + 1, 0].join('.');
        case 'major':
            return [major + 1, 0, 0].join('.');
    }
};

const buildPackage = () => {
    const buildOutput = execSync('cd packages/ui && yarn build', { encoding: 'utf-8' });
    console.log('Build Output: \n', buildOutput);
};
const listChangedFiles = async(octokit, owner, repo, prNumber) => {
    const { data: changedFiles } = await octokit.rest.pulls.listFiles({
        owner,
        repo,
        pull_number: prNumber,
    });
    return changedFiles;
};
const publishPackage = (newVersion) => {
    const publishOutput = execSync(`cd packages/ui && yarn publish --new-version ${newVersion} --access public`, {
        encoding: 'utf-8',
        env: {...process.env, npm_config_registry: 'https://registry.npmjs.org/' },
    });
    console.log('Publish Output: \n', publishOutput);
};

const isPackageChanged = (changedFiles) => {
    const uiRegex = /packages\/ui\/.*\.*/
    return changedFiles.map(file => file.filename).filter(file => uiRegex.test(file)).length > 0
}

const mainMerge = async() => {
    console.log('Running for Merge');
    if (!isPackageChanged(listChangedFiles)) {
        console.log('No changes in "packages/ui/". Skipping package build.');
        return;
    }
    try {
        const ev = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
        console.log({ EventPath: JSON.stringify(ev, null, 2) });

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