import * as github from '@actions/github';
import { execSync } from "child_process"

const token = process.env.GITHUB_TOKEN
const octokit = new github.getOctokit(token);
async function getPRDetails() {
    const prNumber = github.context.payload.pull_request.number;
    const { data: pr } = await octokit.rest.pulls.get({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: prNumber,
    });

    const prName = pr.title;
    const branchName = pr.head.ref;
    console.log(`PR Name: ${prName}`);
    console.log(`Branch Name: ${branchName}`);
    return { prName, branchName }

}

async function checkout() {
    const { branchName, prName, ...rest } = await getPRDetails()
    console.log({ branchName, prName, ...rest })
    console.log('changing branch')
    const checkout = execSync(`git checkout ${branchName}`, { encoding: 'utf-8' });
    console.log({ checkout })
}

checkout().catch((e) => {
    console.error({ e })
});