import { promises as fsPromises, appendFileSync } from "fs"
import { resolve, join } from "path"
import { execSync } from "child_process"
import os from "os"

import * as github from '@actions/github';

const octokit = new github.getOctokit(process.env.GITHUB_TOKEN);
const eventPath = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
export const isMergeEvent = !eventPath.hasOwnProperty('pull_request');

async function getPRDetails() {
    const prNumber = github.context.payload.pull_request.number;
    const { data: pr } = await octokit.rest.pulls.get({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: prNumber,
    });

    return { prTitle: pr.title, branchName: pr.head.ref };
}

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


async function main() {
    const { branchName } = await getPRDetails();
    console.log(`checking out to branch: ${branchName}`);
    execSync(`git checkout ${branchName}`, { encoding: 'utf-8' });
    const changedFiles = await listChangedFiles();
    console.log({ changedFiles });
    if (branchName.startsWith('preview/') && changedFiles.length > 0) {
        const pkgFile = resolve("packages/ui", "package.json");
        const pkgData = JSON.parse(await fsPromises.readFile(pkgFile, "utf-8"));
        const commitHash = execSync('git rev-parse --short HEAD').toString('utf-8').trim();
        const pkgVersion = branchName.split('/').join('-')
        const version = pkgData.version.split('-')[0]
        const previewVersion = `${version}-${pkgVersion}-${commitHash}`;
        pkgData.version = previewVersion;
        await fsPromises.writeFile(pkgFile, JSON.stringify(pkgData, null, 2), "utf-8");
        console.log('changed files:')
        const changedFiles = execSync(`git status --porcelain`, { encoding: 'utf-8' });
        console.log({ changedFiles })
        console.log(`upgrading package version to ${pkgData.version}`)
        console.log("Committing changes...")
        const releaseAdd = execSync(`git add .releases package.json packages/ui/`, { encoding: 'utf-8' });
        const releaseCommit = execSync(`git commit -m "upgrading package version to ${pkgData.version}"`, { encoding: 'utf-8' });
        console.log('Commit Output: \n', releaseCommit);
        console.log("Pushing changes...")

        console.log(`Updated package version to: ${previewVersion}`);
        const npmrcPath = join(os.homedir(), '.npmrc');
        const nodeAuthToken = process.env.NODE_AUTH_TOKEN;
        if (nodeAuthToken) {
            appendFileSync(npmrcPath, `//registry.npmjs.org/:_authToken=${nodeAuthToken}\n`);
            appendFileSync(npmrcPath, 'registry=https://registry.npmjs.org/\n');
            appendFileSync(npmrcPath, 'always-auth=true\n');
        }
        const whoami = execSync('npm whoami').toString().trim();
        console.log({ whoami })
            // }
        const pwd = execSync('pwd').toString().trim();
        console.log("Building and Publishing the package...", pwd, nodeAuthToken)
        execSync(`cd packages/ui && yarn release-it`, {
            encoding: 'utf-8',
            env: {...process.env, npm_config_registry: 'https://registry.npmjs.org/', always_auth: true, NODE_AUTH_TOKEN: nodeAuthToken },
        });
        console.log("published with success :smile:")
        const rootPKGFile = resolve('package.json')
        const RootData = JSON.parse(
            await fsPromises.readFile(rootPKGFile, "utf-8").catch((e) => {
                console.error({ e })
                return "{}"
            })
        )
        RootData.dependencies[pkgData.name] = pkgData.version
        await fsPromises
            .writeFile(rootPKGFile, JSON.stringify(RootData, null, 2), "utf-8")
        const commitsListFromMaster = execSync('git log --pretty=format:%s HEAD..').toString('utf-8').trim()

        const changedFilesAfterRelease = execSync(`git status --porcelain`, { encoding: 'utf-8' });
        console.log(`upgrading package version to ${pkgData.version}`)
        console.log("Committing changes...")
        const releaseAddAfterRelease = execSync(`git add .releases package.json packages/ui`, { encoding: 'utf-8' });
        console.log({ releaseAddAfterRelease })
        const releaseCommitAfterRelease = execSync(`git commit -m "upgrading package version to ${pkgData.version}"`, { encoding: 'utf-8' });
        console.log('Commit Output: \n', releaseCommitAfterRelease);
        console.log("Pushing changes...")
    }
}

main().catch((err) => {
    console.error("Error: ", err);
    process.exit(1);
});