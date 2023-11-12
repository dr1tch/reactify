const { execSync } = require('child_process');
const core = require('@actions/core');
const fs = require('fs')
const github = require('@actions/github');
const { version } = require('../packages/ui/package.json')
const args = process.argv.slice(2);



// verify if the pull request name is valid
const isPrNameValid = (prName) => {
    const PR_REGEX = /^(patch|major|minor)\/.*/i;

    if (!PR_REGEX.test(prName)) {
        console.error('########################################################################################')
        console.error('Branch name does not follow the pattern: patch/**, minor/**, major/**, CI cancelled ')
        console.error('########################################################################################')
        return false
    }
    return true
}


// upgrade the version based on the pull request name
const getNewVersion = (prName) => {
    const [changeType, ...rest] = prName.split('/')
    const [major, minor, patch] = version.split('.').map(v => parseInt(v))
    switch (changeType) {
        case 'patch':
            return [major, minor, patch + 1].join('.')
        case 'minor':
            return [major, minor + 1, 0].join('.')
        case 'major':
            return [major + 1, 0, 0].join('.')
    }
}

// verify if a file inside ui has changed with regex check
const isPackageChanged = (changedFiles) => {
    const uiRegex = /packages\/ui\/.*\.*/
    return changedFiles.map(file => file.filename).filter(file => uiRegex.test(file)).length > 0
}

const main = async() => {
        console.log({ args })
        try {

            // GET pull request number
            const ev = JSON.parse(
                fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
            )
            const prNum = ev.number
                // GET PR BRANCH NAME
            const prName = ev.pull_request.head.ref




            if (!isPrNameValid(prName)) return;
            const owner = process.env.GITHUB_REPOSITORY_OWNER;
            const repo = process.env.repo.split('/')[1];
            const pr_number = prNum;
            const token = process.env.token;
            const githubToken = process.env.GITHUB_TOKEN;
            const npmToken = process.env.NPM_TOKEN;
            const nodeAuthToken = process.env.NODE_AUTH_TOKEN;
            console.log({ githubToken, npmToken, nodeAuthToken })
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
                            - changed files: ${changedFiles.map(file => `--${file.filename}\n`)} \n
                        `,
            });







        if (isPackageChanged(changedFiles)) {
            try {
                const [changeType, ...rest] = prName.split('/')
                const registry = execSync(`cd packages/ui && echo "//registry.npmjs.org/:_authToken=${npmToken}" > ~/.npmrc`)
                const catRegistry = execSync(`cd packages/ui && cat ~/.npmrc`)
                const pwd = execSync('pwd')
                console.log({
                        registry: registry.toString().trim().split('\n'),
                        catRegistry: catRegistry.toString().trim().split('\n'),
                        pwd: pwd.toString().trim().split('\n')
                    })
                    // Build and release the package

                // set up Git with your identity before running the commands
                execSync('git config --global user.email "github-actions@github.com" && git config --global user.name "github-actions[bot]"')
                // Increment the package version
                const versionBumpOutput = execSync(`cd packages/ui && yarn version --new-version ${getNewVersion(prName)}`, { encoding: 'utf-8' });
                // see git status
                const statusOutput = execSync(`cd packages/ui && git status`, { encoding: 'utf-8' });
                // Add the package.json file to the commit
                const addOutput = execSync(`cd packages/ui && git add package.json`, { encoding: 'utf-8' });
                // Commit the version change
                const commitOutput = execSync(`cd packages/ui && git commit -m "chore(release): ${getNewVersion(prName)}"`, { encoding: 'utf-8' });
                // Push the commit
                const pushOutput = execSync(`cd packages/ui && git push origin HEAD`, { encoding: 'utf-8' });
                // Build the package
                const buildOutput = execSync(`cd packages/ui && yarn build`, { encoding: 'utf-8' });
                // Tag the commit
                const tagOutput = execSync(`cd packages/ui && git tag ${getNewVersion(prName)}`, { encoding: 'utf-8' });
                // Publish the package
                const publishOutput = execSync(`cd packages/ui && yarn publish --new-version ${getNewVersion(prName)} --access public`, { encoding: 'utf-8', env: {...process.env, npm_config_registry: 'https://registry.npmjs.org/' } });
                                
                // Process the output if needed
                console.log('Release Output: \n', releaseOutput);
                console.log('upgrading version to: ', getNewVersion(prName))
                // Get the version of the package

            } catch (error) {
                // Handle errors
                console.log({ error })
                console.error('Error during release:', error.message);
                process.exit(1); // Exit with an error code
            }
        }




    } catch (error) {
        console.log({ error })
        core.setFailed(error.message);
    }
}

main()