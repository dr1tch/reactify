const { execSync } = require('child_process');
// get branch name
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

console.log({branch})

// get commit hash
const commit = execSync('git rev-parse HEAD').toString().trim()

console.log({commit})

// get commit message
const message = execSync('git log -1 --pretty=%B').toString().trim()

console.log({message})

// get changed files
 const changedFiles =execSync('git diff --name-only ${{ github.event.pull_request.base.sha }} ${{ github.sha }} | xargs')
//  const anotherlist = execSync('git --no-pager diff --name-only HEAD^ HEAD')

console.log({ changedFiles, anotherlist })

// verify if a file inside ui has changed with regex check
const uiRegex = /packages\/ui\/.*\.*/
const changed = changedFiles.filter(file => uiRegex.test(file)).length > 0
console.log({changed})

// verify if a file inside ui has changed with string check
const changed2 = changedFiles.filter(file => file.includes('packages/ui')).length > 0
console.log({changed2})

// console.log({process: process.env})
// get the pull request name inside 
const pullRequestName = execSync('git log -1 --pretty=%s').toString().trim()
console.log({pullRequestName})

// get the pull request number
const pullRequestNumber = execSync('git log -1 --pretty=%s').toString().trim()
console.log({pullRequestNumber})

// get the pull request author
const pullRequestAuthor = execSync('git log -1 --pretty=%an').toString().trim()
const pullRequestTriggeringActor = process.env.GITHUB_TRIGGERING_ACTOR || null
console.log({pullRequestAuthor, pullRequestTriggeringActor})

const prTitle = process.env.GITHUB_EVENT_NAME === 'pull_request' ? process.env.GITHUB_PULL_REQUEST_TITLE : null;
const prNumber = process.env.GITHUB_EVENT_NAME === 'pull_request' ? process.env.GITHUB_PULL_REQUEST_NUMBER : null;

console.log('Pull Request Title:', prTitle);
console.log('Pull Request Number:', prNumber);