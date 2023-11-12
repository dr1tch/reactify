const { execSync } = require('child_process');
const core = require('@actions/core');
const fs = require('fs');
const github = require('@actions/github');

const isPrNameValid = (prName) => {
    const PR_REGEX = /^(patch|major|minor)\/.*/i;

    if (!PR_REGEX.test(prName)) {
        console.error('########################################################################################');
        console.error('Branch name does not follow the pattern: patch/**, minor/**, major/**, CI cancelled ');
        console.error('########################################################################################');
        return false;
    }
    return true;
};

const listChangedFiles = async(octokit, owner, repo, prNumber) => {
    const { data: changedFiles } = await octokit.rest.pulls.listFiles({
        owner,
        repo,
        pull_number: prNumber,
    });
    return changedFiles;
};

const buildPackage = () => {
    const buildOutput = execSync('cd packages/ui && yarn build', { encoding: 'utf-8' });
    console.log('Build Output: \n', buildOutput);
};

const mainPullRequest = async() => {
    console.log('Running for Pull Request');
    try {
        const ev = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
        console.log({ EventPath: JSON.stringify(ev, null, 2) });

        const prNum = ev.number;
        const prName = ev.pull_request.head.ref;

        if (!isPrNameValid(prName)) return;

        const owner = process.env.GITHUB_REPOSITORY_OWNER;
        const repo = process.env.repo.split('/')[1];

        const changedFiles = await listChangedFiles(github.getOctokit(), owner, repo, prNum);

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