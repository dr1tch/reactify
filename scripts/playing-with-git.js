const { execSync } = require('child_process');
const core = require('@actions/core');
const github = require('@actions/github');

const main = async() => {
    try {
        /**
         * We need to fetch all the inputs that were provided to our action
         * and store them in variables for us to use.
         **/
        const owner = process.env.OWNER;
        const repo = process.env.REPO;
        const pr_number = process.env.PR_NUMBER;
        const token = process.env.TOKEN;

        /**
         * Now we need to create an instance of Octokit which will use to call
         * GitHub's REST API endpoints.
         * We will pass the token as an argument to the constructor. This token
         * will be used to authenticate our requests.
         * You can find all the information about how to use Octokit here:
         * https://octokit.github.io/rest.js/v18
         **/
        const octokit = new github.getOctokit(token);

        /**
         * We need to fetch the list of files that were changes in the Pull Request
         * and store them in a variable.
         * We use octokit.paginate() to automatically loop over all the pages of the
         * results.
         * Reference: https://octokit.github.io/rest.js/v18#pulls-list-files
         */
        const { data: changedFiles } = await octokit.rest.pulls.listFiles({
            owner,
            repo,
            pull_number: pr_number,
        });

        /**
         * Contains the sum of all the additions, deletions, and changes
         * in all the files in the Pull Request.
         **/
        let diffData = {
            additions: 0,
            deletions: 0,
            changes: 0
        };

        // Reference for how to use Array.reduce():
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
        diffData = changedFiles.reduce((acc, file) => {
            acc.additions += file.additions;
            acc.deletions += file.deletions;
            acc.changes += file.changes;
            return acc;
        }, diffData);

        /**
         * Loop over all the files changed in the PR and add labels according 
         * to files types.
         **/
        for (const file of changedFiles) {
            /**
             * Add labels according to file types.
             */
            const fileExtension = file.filename.split('.').pop();
            switch (fileExtension) {
                case 'md':
                    await octokit.rest.issues.addLabels({
                        owner,
                        repo,
                        issue_number: pr_number,
                        labels: ['markdown'],
                    });
                case 'js':
                    await octokit.rest.issues.addLabels({
                        owner,
                        repo,
                        issue_number: pr_number,
                        labels: ['javascript'],
                    });
                case 'yml':
                    await octokit.rest.issues.addLabels({
                        owner,
                        repo,
                        issue_number: pr_number,
                        labels: ['yaml'],
                    });
                case 'yaml':
                    await octokit.rest.issues.addLabels({
                        owner,
                        repo,
                        issue_number: pr_number,
                        labels: ['yaml'],
                    });
            }
        }

        /**
         * Create a comment on the PR with the information we compiled from the
         * list of changed files.
         */
        await octokit.rest.issues.createComment({
            owner,
            repo,
            issue_number: pr_number,
            body: `
        Pull Request #${pr_number} has been updated with: \n
        - ${diffData.changes} changes \n
        - ${diffData.additions} additions \n
        - ${diffData.deletions} deletions \n
        - changed files: ${changedFiles.map(file => file.filename)}
      `
        });


        // get branch name
        const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

        console.log({ branch })

        // get commit hash
        const commit = execSync('git rev-parse HEAD').toString().trim()

        console.log({ commit })

        // get commit message
        const message = execSync('git log -1 --pretty=%B').toString().trim()

        console.log({ message })

        console.log({ changedFiles })

        // verify if a file inside ui has changed with regex check
        const uiRegex = /packages\/ui\/.*\.*/
        const changed = changedFiles.map(file => file.filename).filter(file => uiRegex.test(file)).length > 0
        console.log({ changed })

        // verify if a file inside ui has changed with string check
        const changed2 = changedFiles.map(file => file.filename).filter(file => file.includes('packages/ui')).length > 0
        console.log({ changed2 })

        // console.log({process: process.env})
        // get the pull request name inside 
        const pullRequestName = execSync('git log -1 --pretty=%s').toString().trim()
        console.log({ pullRequestName })

        // get the pull request number
        const pullRequestNumber = execSync('git log -1 --pretty=%s').toString().trim()
        console.log({ pullRequestNumber })

        // get the pull request author
        const pullRequestAuthor = execSync('git log -1 --pretty=%an').toString().trim()
        const pullRequestTriggeringActor = process.env.GITHUB_TRIGGERING_ACTOR || null
        console.log({ pullRequestAuthor, pullRequestTriggeringActor })

        const prTitle = process.env.GITHUB_EVENT_NAME === 'pull_request' ? process.env.GITHUB_PULL_REQUEST_TITLE : null;
        const prNumber = process.env.GITHUB_EVENT_NAME === 'pull_request' ? process.env.GITHUB_PULL_REQUEST_NUMBER : null;

        console.log('Pull Request Title:', prTitle);
        console.log('Pull Request Number:', prNumber);

    } catch (error) {
        core.setFailed(error.message);
    }
}

main()