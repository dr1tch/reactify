import { promises as fsPromises } from "fs"
import { resolve } from "path"
import { execSync } from "child_process"
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
    const commitsListFromMaster = execSync('git log --pretty=format:%s master..').toString('utf-8').trim().split('\n')

    const date = Math.round(Date.now() / (1000 * 60))
    let branchName = execSync('git rev-parse --abbrev-ref HEAD').toString('utf-8').trim()
    let isPreview = branchName.includes('preview')
    const pkgVersion = branchName.split('/').join('-')
    const version = data.version.split('-')[0]
    if (isPreview) {
        data.version = `${version}-${pkgVersion}-${commit}`
        data.name = `${data.name.split('-preview')[0]}-preview`
    } else {
        data.version = `${getNewVersion(version)}`
    }

    console.log({
        isPreview,
        commit,
        date,
        branchName,
        commitsListFromMaster,
        pkgVersion,
        pkg: JSON.stringify(data, null, 2),
        version: data.version,
        data
    })

    const pwd = process.cwd()
    console.log({ pwd })

    await fsPromises
        .writeFile(pkgFile, JSON.stringify(data, null, 2), "utf-8")


    console.log("Building the package...")
    const buildOutput = execSync(`cd packages/ui && yarn build`, { encoding: 'utf-8' });
    console.log('Build Output: \n', buildOutput);

    console.log("Publishing the package...")
    const publishOutput = execSync(`cd packages/ui && npm publish -q --access public`, {
        encoding: 'utf-8',
        env: {...process.env, npm_config_registry: 'https://registry.npmjs.org/' },
    });
    console.log('Publish Output: \n', publishOutput);
    const rootPKGFile = resolve('package.json')
    const RootData = JSON.parse(
        await fsPromises.readFile(rootPKGFile, "utf-8").catch((e) => {
            console.error({ e })
            return "{}"
        })
    )
    RootData.dependencies[data.name] = data.version
    console.log({ rootPKGFile, RootData })
    await fsPromises
        .writeFile(rootPKGFile, JSON.stringify(RootData, null, 2), "utf-8")
        // create a .releases folder, with a file named after the version and with a changelog inside it
    const releaseFolder = resolve('.releases')
    await fsPromises.mkdir(releaseFolder, { recursive: true })
    const releaseFile = resolve(releaseFolder, `${data.version}.md`)
    const changelog = commitsListFromMaster.map((commit) => `- ${commit}`).join('\n')
    await fsPromises.writeFile(releaseFile, changelog, "utf-8")
    console.log({ releaseFile, changelog })
    console.log("Committing changes...")
    const releaseAdd = execSync(`git add .releases package.json packages/ui/`, { encoding: 'utf-8' });
    const releaseCommit = execSync(`git commit -m "chore: release ${data.name}@${data.version}"`, { encoding: 'utf-8' });
    console.log('Commit Output: \n', releaseCommit);
}
main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error({ err })
    process.exit(1)
})