import { promises as fsPromises, appendFileSync } from "fs"
import { resolve, join } from "path"
import { execSync } from "child_process"
import os from "os"

import * as github from '@actions/github';

const octokit = new github.getOctokit(process.env.GITHUB_TOKEN);
async function getPRDetails() {
    const prNumber = github.context.payload.pull_request.number;
    const { data: pr } = await octokit.rest.pulls.get({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: prNumber,
    });
    // console.log({ pr })

    return { prTitle: pr.title, branchName: pr.head.ref };
}

async function listChangedFiles() {
    let changedFiles = [];
    const prNumber = github.context.payload.pull_request.number;
    const { data } = await octokit.rest.pulls.listFiles({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: prNumber,
    });
    // console.log({ data })
    changedFiles = data
    return changedFiles;
}

async function main() {
    const { branchName } = await getPRDetails();
    console.log(`PR Branch Name: ${branchName}`);
    const checkout = execSync(`git checkout ${branchName}`, { encoding: 'utf-8' });
    const changedFiles = execSync(`git diff --name-only master...${branchName}`, { encoding: 'utf-8' }).trim().split('\n');
    console.log({ changedFiles })
    if (branchName.startsWith('preview/')) {
        const pkgFile = resolve("packages/ui", "package.json");
        const pkgData = JSON.parse(await fsPromises.readFile(pkgFile, "utf-8"));
        const commitHash = execSync('git rev-parse --short master').toString('utf-8').trim();
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
            // const releasePush = execSync(`git push`, { encoding: 'utf-8' });
            // console.log('Push Output: \n', releasePush);
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
            // const publishOutput = execSync(`cd packages/ui && npm publish -q --access public`, {
        const publishOutput = execSync(`cd packages/ui && yarn release-it:dev`, {
            encoding: 'utf-8',
            env: {...process.env, npm_config_registry: 'https://registry.npmjs.org/', always_auth: true, NODE_AUTH_TOKEN: nodeAuthToken },
        });
        console.log("published with success", { publishOutput })
        const { prTitle: releaseTitle, branchName: releaseBranch } = await getPRDetails();
        console.log({ releaseTitle, releaseBranch })
        console.log('Publish Output: \n', publishOutput);
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
        const commitsListFromMaster = execSync('git log --pretty=format:%s master..').toString('utf-8').trim()
        console.log({ commitsListFromMaster })
        console.log('changed files:')
        const changedFilesAfterRelease = execSync(`git status --porcelain`, { encoding: 'utf-8' });
        console.log({ changedFilesAfterRelease })
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