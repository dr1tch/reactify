const { execSync } = require('child_process');
const { readFileSync } = require('fs')

const github = require('@actions/github');


const { version, publishType } = require('../packages/ui/package.json')

const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = process.env.repo ? process.env.repo.split('/')[1] : "";
const eventPath = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const pr_number = eventPath.number;
const githubToken = process.env.GITHUB_TOKEN;
const npmToken = process.env.NPM_TOKEN;
const nodeAuthToken = process.env.NODE_AUTH_TOKEN;

const isMergeEvent = !eventPath.hasOwnProperty('pull_request');

console.log({ eventPath: JSON.stringify(eventPath, null, 2) })

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

const listChangedFiles = async() => {
    let changedFiles = null
    if (isMergeEvent) {
        const baseCommit = eventPath.before;
        const headCommit = eventPath.after;

        // Fetch the list of changed files in the merge
        changedFiles = execSync(`git diff --name-only ${baseCommit} ${headCommit}`, { encoding: 'utf-8' })
            .split('\n')
            .filter(Boolean);

        console.log({ changedFiles });
        return changedFiles;
    } else {
        /**
         * Now we need to create an instance of Octokit which will use to call
         * GitHub's REST API endpoints.
         * We will pass the token as an argument to the constructor. This token
         * will be used to authenticate our requests.
         * You can find all the information about how to use Octokit here:
         * https://octokit.github.io/rest.js/v18
         **/
        const octokit = new github.getOctokit(githubToken);
        /**
         * We need to fetch the list of files that were changes in the Pull Request
         * and store them in a variable.
         * We use octokit.paginate() to automatically loop over all the pages of the
         * results.
         * Reference: https://octokit.github.io/rest.js/v18#pulls-list-files
         */
        const { data } = await octokit.rest.pulls.listFiles({
            owner,
            repo,
            pull_number: pr_number,
        });
        changedFiles = data
        return changedFiles;
    }

};

module.exports = {
    eventPath,
    owner,
    repo,
    pr_number,
    githubToken,
    npmToken,
    nodeAuthToken,
    getNewVersion,
    buildPackage,
    publishPackage,
    isPackageChanged,
    isPrNameValid,
    listChangedFiles
}