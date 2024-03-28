import { execSync, appendFileSync } from 'child_process';
import { readFileSync, promises as fsPromises } from 'fs'
import { join } from "path"
import os from "os"

import * as github from '@actions/github';


import { version } from '../packages/ui/package.json'

export const owner = process.env.GITHUB_REPOSITORY_OWNER;
export const repo = process.env.repo ? process.env.repo.split('/')[1] : "";
export const eventPath = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
export const pr_number = eventPath.number;
export const githubToken = process.env.GITHUB_TOKEN;
export const npmToken = process.env.NPM_TOKEN;
export const nodeAuthToken = process.env.NODE_AUTH_TOKEN;

export const isMergeEvent = !eventPath.hasOwnProperty('pull_request');

export const getNewVersion = () => {
    const [major, minor, patch] = version.split('.').map((v) => parseInt(v));
    return [major, minor, patch + 1].join('.')
        /* switch (publishType) {
            case 'patch':
                return [major, minor, patch + 1].join('.');
            case 'minor':
                return [major, minor + 1, 0].join('.');
            case 'major':
                return [major + 1, 0, 0].join('.');
        } */
};

export const buildPackage = () => {
    const buildOutput = execSync('cd packages/ui && yarn build', { encoding: 'utf-8' });
    console.log('Build Output: \n', buildOutput);
};


export const publishPackage = (newVersion) => {
    const publishOutput = execSync(`cd packages/ui && npm publish -q --access public`, {
        encoding: 'utf-8',
        env: {...process.env, npm_config_registry: 'https://registry.npmjs.org/' },
    });
    console.log('Publish Output: \n', publishOutput);
};

export const isPackageChanged = (changedFiles) => {
    const uiRegex = /packages\/ui\/.*\.*/
    if (isMergeEvent) {
        return changedFiles.filter(file => uiRegex.test(file)).length > 0
    } else {
        return changedFiles.map(file => file.filename).filter(file => uiRegex.test(file)).length > 0
    }
}


export const isPrNameValid = (prName) => {
    const PR_REGEX = /^(patch|major|minor)\/.*/i;

    if (!PR_REGEX.test(prName)) {
        console.error('########################################################################################');
        console.error('Branch name does not follow the pattern: patch/**, minor/**, major/**, CI cancelled ');
        console.error('########################################################################################');
        return false;
    }
    return true;
};

export const listChangedFiles = async() => {
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

export const writeToNpmrcFile = () => {
    const npmrcPath = join(os.homedir(), '.npmrc');
    const nodeAuthToken = process.env.NODE_AUTH_TOKEN;
    if (nodeAuthToken) {
        appendFileSync(npmrcPath, `//registry.npmjs.org/:_authToken=${nodeAuthToken}\n`);
        appendFileSync(npmrcPath, 'registry=https://registry.npmjs.org/\n');
        appendFileSync(npmrcPath, 'always-auth=true\n');
    }
}

export const addReleaseToReleasesFolder = async() => {
    const commitsListFromMaster = execSync('git log --pretty=format:%s HEAD..').toString('utf-8').trim().split('\n')
    const releaseFolder = resolve('.releases')
    await fsPromises.mkdir(releaseFolder, { recursive: true })

    const releaseFile = resolve(releaseFolder, `${data.version}.md`)
    const changelog = commitsListFromMaster.map((commit) => `- ${commit}`).join('\n')
    await fsPromises.writeFile(releaseFile, changelog, "utf-8")
}

export const commitAndPushChanges = (data) => {
    console.log('Committing changes...')
    const releaseAdd = execSync(`git add .releases package.json packages/ui/`, { encoding: 'utf-8' });
    const releaseCommit = execSync(`git commit -m "upgrading package version to ${data.version}"`, { encoding: 'utf-8' });
    console.log('Commit Output: \n', releaseCommit);
    console.log("Pushing changes...")
    const releasePush = execSync(`git push`, { encoding: 'utf-8' });
    console.log('Push Output: \n', releasePush);
}