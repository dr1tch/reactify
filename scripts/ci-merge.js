const { execSync } = require('child_process');
const core = require('@actions/core');
const fs = require('fs');
const github = require('@actions/github');

const getNewVersion = (prName, currentVersion) => {
    const [changeType, ...rest] = prName.split('/');
    const [major, minor, patch] = currentVersion.split('.').map((v) => parseInt(v));
    switch (changeType) {
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

const publishPackage = (newVersion) => {
    const publishOutput = execSync(`cd packages/ui && yarn publish --new-version ${newVersion} --access public`, {
        encoding: 'utf-8',
        env: {...process.env, npm_config_registry: 'https://registry.npmjs.org/' },
    });
    console.log('Publish Output: \n', publishOutput);
};

const mainMerge = async() => {
    console.log('Running for Merge');
    try {
        const ev = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
        console.log({ EventPath: JSON.stringify(ev, null, 2) });

        const prNum = ev.number;
        const prName = ev.pull_request.head.ref;

        const owner = process.env.GITHUB_REPOSITORY_OWNER;
        const repo = process.env.repo.split('/')[1];
        const currentVersion = process.env.npm_package_version;

        const newVersion = getNewVersion(prName, currentVersion);

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