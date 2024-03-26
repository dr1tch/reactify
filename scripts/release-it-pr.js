import { promises as fsPromises } from "fs"
import { resolve } from "path"
import { execSync } from "child_process"

async function main() {
    const pkgFile = resolve(process.cwd(), "package.json")
    const data = JSON.parse(
        await fsPromises.readFile(pkgFile, "utf-8").catch((e) => {
            console.error({ e })
            return "{}"
        })
    )

    const commit = execSync('git rev-parse --short HEAD').toString('utf-8').trim()

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
        pkgVersion,
        pkg: JSON.stringify(data, null, 2),
        version: data.version,
        data
    })
    data.name = `${data.name}-preview`


    fsPromises
        .writeFile(pkgFile, JSON.stringify(data, null, 2), "utf-8")
        .catch(() => {})

}
main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error({ err })
    process.exit(1)
})