const fs = require('fs');
const { resolve, join } = require('path');
const execSync = require('child_process').execSync;
const os = require('os');

function getCurrentBranchName() {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function listChangedFiles() {
    let baseCommit = ""
    let headCommit = ""
    if (process.env.GITHUB_EVENT_NAME) {
        const eventPath = JSON.parse(
            fs.readFileSync(process.env.GITHUB_EVENT_PATH || "", "utf8")
        )
        if (eventPath.action === "opened") {
            baseCommit = process.env.GITHUB_BASE_REF
            headCommit = process.env.GITHUB_HEAD_REF
        } else if (process.env.GITHUB_EVENT_NAME === "push") {
            baseCommit = "HEAD^" // The previous commit
            headCommit = process.env.GITHUB_SHA // The latest commit SHA
        } else {
            baseCommit = eventPath.before
            headCommit = eventPath.after
        }
    } else {
        baseCommit = execSync("git rev-parse HEAD^").toString().trim()
        headCommit = execSync("git rev-parse HEAD").toString().trim()
    }

    // Fetch the list of changed files in the merge
    const changedFiles = execSync(
            `git diff --name-only ${baseCommit} ${headCommit ?? ""}`, { encoding: "utf-8" }
        )
        .split("\n")
        .filter(Boolean)

    return changedFiles
}
async function main() {
    let branchName = ""
    if (process.env.GITHUB_HEAD_REF) {
        branchName = process.env.GITHUB_HEAD_REF
    } else {
        branchName = getCurrentBranchName()
    }
    console.log({ branchName })
    const changedFiles = listChangedFiles()
    console.log({ changedFiles })
    const isPackageChanged = changedFiles.some((file) =>
            file.startsWith("packages/ui/")
        )
        // ensure that changes are only in packages/ui
    if (!isPackageChanged) {
        console.log('No changes in "packages/ui/". Skipping package build.')

        return process.exit(0)
    }
}

main().catch((err) => {
    console.error("Error: ", err)
    process.exit(1)
})