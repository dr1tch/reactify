import { promises as fsPromises, appendFileSync } from "fs"
import { resolve, join } from "path"
import { execSync } from "child_process"
import os from "os"

import * as github from '@actions/github';

const octokit = new github.getOctokit(process.env.GITHUB_TOKEN);
function getNewVersion() {
  const [major, minor, patch] = version.split(".").map((v) => parseInt(v))

  return [major, minor, patch + 1].join(".")
}
async function getPRDetails() {
    const prNumber = github.context.payload.pull_request.number;
    const { data: pr } = await octokit.rest.pulls.get({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: prNumber,
    });

    return { prTitle: pr.title, branchName: pr.head.ref };
}

async function main() {
    // this will be executed when we merge the PR
    
}

main().catch((err) => {
    console.error("Error: ", err);
    process.exit(1);
});