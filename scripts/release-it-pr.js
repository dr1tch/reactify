import { promises as fsPromises } from "fs"
import { resolve } from "path"
import { execSync } from "child_process"

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
    const commitsListFromMaster = execSync('git log --pretty=format:%s master..').toString('utf-8').trim()

    const date = Math.round(Date.now() / (1000 * 60))
    let branchName = execSync('git rev-parse --abbrev-ref HEAD').toString('utf-8').trim()
    let isPreview = branchName.includes('preview')
    const pkgVersion = branchName.split('/').join('-')
    if (isPreview) {
        data.version = `${data.version}-${pkgVersion}-${commit}`
    } else {
        data.version = `${data.version}-${commit}`
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
    data.name = `${data.name}-preview`
    const pwd = process.cwd()
    console.log({ pwd })

    await fsPromises
        .writeFile(pkgFile, JSON.stringify(data, null, 2), "utf-8")


    console.log("Building the package...")
    const buildOutput = execSync(`cd packages/ui && yarn build`, { encoding: 'utf-8' });
    console.log('Build Output: \n', buildOutput);

    console.log("Publishing the package...")
    const publishOutput = execSync(`cd packages/ui && yarn release-it`, {
        encoding: 'utf-8',
        env: {...process.env, npm_config_registry: 'https://registry.npmjs.org/' },
    });
    console.log('Publish Output: \n', publishOutput);
    const rootPKGFile = resolve('package.json')

}
main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error({ err })
    process.exit(1)
})