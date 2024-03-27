import { promises as fsPromises, appendFileSync } from "fs"
import { resolve, join } from "path"
import { execSync } from "child_process"
import os from "os"
import * as github from '@actions/github';
const token = process.env.GITHUB_TOKEN
const octokit = new github.getOctokit(token);

console.log({ token })
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
const getNewVersion = (version) => {
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
async function main() {
    const { branchName, prName } = await getPRDetails()
    console.log({})
    console.log('changing branch')
    const checkout = execSync(`git checkout ${branchName}`, { encoding: 'utf-8' });
    console.log({ checkout })
    const pkgFile = resolve('packages/ui/', "package.json")
    const data = JSON.parse(
        await fsPromises.readFile(pkgFile, "utf-8").catch((e) => {
            console.error({ e })
            return "{}"
        })
    )
    console.log({ pkgFile, data })
    const commit = execSync('git rev-parse --short HEAD').toString('utf-8').trim()
        // const commitsListFromMaster = execSync('git log --oneline master..').toString('utf-8').trim()
    const commitsListFromMaster = execSync('git log --pretty=format:%s HEAD..').toString('utf-8').trim().split('\n')

    // let branchName = execSync('git rev-parse --abbrev-ref HEAD').toString('utf-8').trim()
    let isPreview = branchName.includes('preview')
    const pkgVersion = branchName.split('/').join('-')
    const version = data.version.split('-')[0]
    if (isPreview) {
        data.version = `${version}-${pkgVersion}-${commit}`
        data.name = `${data.name.split('-preview')[0]}-preview`
    } else {
        data.version = `${getNewVersion(version)}`
    }
    await fsPromises
        .writeFile(pkgFile, JSON.stringify(data, null, 2), "utf-8")
    console.log("Building the package...")
    const buildOutput = execSync(`cd packages/ui && yarn build`, { encoding: 'utf-8' });
    console.log('Build Output: \n', buildOutput);
    const npmrcPath = join(os.homedir(), '.npmrc');
    const nodeAuthToken = process.env.NODE_AUTH_TOKEN;
    console.log({ isPreview, nodeAuthToken, npmrcPath, data, version, pkgVersion, commit, commitsListFromMaster, branchName })
    if (nodeAuthToken) {
        appendFileSync(npmrcPath, `//registry.npmjs.org/:_authToken=${nodeAuthToken}\n`);
        appendFileSync(npmrcPath, 'registry=https://registry.npmjs.org/\n');
        appendFileSync(npmrcPath, 'always-auth=true\n');

        const whoami = execSync('npm whoami').toString().trim();
        console.log({ whoami })
    }
    console.log("Publishing the package...")
    const publishOutput = execSync(`cd packages/ui && npm publish -q --access public`, {
        encoding: 'utf-8',
        env: {...process.env, npm_config_registry: 'https://registry.npmjs.org/' },
    });
    execSync(`rm ${npmrcPath}`)

    console.log('Publish Output: \n', publishOutput);
    const rootPKGFile = resolve('package.json')
    const RootData = JSON.parse(
        await fsPromises.readFile(rootPKGFile, "utf-8").catch((e) => {
            console.error({ e })
            return "{}"
        })
    )
    RootData.dependencies[data.name] = data.version
    await fsPromises
        .writeFile(rootPKGFile, JSON.stringify(RootData, null, 2), "utf-8")
        // create a .releases folder, with a file named after the version and with a changelog inside it
    const releaseFolder = resolve('.releases')
    await fsPromises.mkdir(releaseFolder, { recursive: true })

    const releaseFile = resolve(releaseFolder, `${data.version}.md`)
    const changelog = commitsListFromMaster.map((commit) => `- ${commit}`).join('\n')
    await fsPromises.writeFile(releaseFile, changelog, "utf-8")
    console.log({ releaseFile, changelog })
    console.log('changed files:')
    const changedFiles = execSync(`git status --porcelain`, { encoding: 'utf-8' });
    console.log({ changedFiles })
    console.log("Committing changes...")
    const releaseAdd = execSync(`git add .releases package.json packages/ui/`, { encoding: 'utf-8' });
    const releaseCommit = execSync(`git commit -m "chore: release ${data.name}@${data.version}"`, { encoding: 'utf-8' });
    console.log('Commit Output: \n', releaseCommit);
    console.log("Pushing changes...")
    const releasePush = execSync(`git push`, { encoding: 'utf-8' });
    console.log('Push Output: \n', releasePush);
}
main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error({ err })
    process.exit(1)
})