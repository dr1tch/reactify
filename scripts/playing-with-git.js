const { execSync } = require('child_process');


// get branch name
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

console.log(branch)

// get commit hash
const commit = execSync('git rev-parse HEAD').toString().trim()

console.log(commit)

// get commit message
const message = execSync('git log -1 --pretty=%B').toString().trim()

console.log(message)

// get changed files
let changedFiles = []
try {
  const commitCount = execSync('git rev-list --count HEAD').toString().trim();
  if (parseInt(commitCount) < 2) {
    console.error('Not enough commits for comparison.');
    // process.exit(1);
  }

  changedFiles = execSync('git diff --name-only HEAD^ HEAD').toString().trim().split('\n');
  console.log('Changed files:', changedFiles);
} catch (error) {
  console.error('Error:', error.message);
//   process.exit(1);
}
// const changedFiles = execSync('git diff --name-only HEAD HEAD~1').toString().trim().split('\n')

console.log({ changedFiles })

// verify if a file inside ui has changed with regex check
const uiRegex = /packages\/ui\/.*\.*/
const changed = changedFiles.filter(file => uiRegex.test(file)).length > 0
console.log(changed)

// verify if a file inside ui has changed with string check
const changed2 = changedFiles.filter(file => file.includes('packages/ui')).length > 0
console.log(changed2)


// get the pull request name
const pullRequestName = execSync('git log -1 --pretty=%s').toString().trim()
console.log(pullRequestName)

// get the pull request number
const pullRequestNumber = execSync('git log -1 --pretty=%s').toString().trim()
console.log(pullRequestNumber)

// get the pull request author
const pullRequestAuthor = execSync('git log -1 --pretty=%an').toString().trim()
console.log(pullRequestAuthor)

const prTitle = process.env.GITHUB_EVENT_NAME === 'pull_request' ? process.env.GITHUB_PULL_REQUEST_TITLE : null;
const prNumber = process.env.GITHUB_EVENT_NAME === 'pull_request' ? process.env.GITHUB_PULL_REQUEST_NUMBER : null;

console.log('Pull Request Title:', prTitle);
console.log('Pull Request Number:', prNumber);