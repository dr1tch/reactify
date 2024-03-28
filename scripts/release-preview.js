import { promises as fsPromises, appendFileSync, readFileSync } from "fs"
import { resolve, join } from "path"
import { execSync } from "child_process"
import os from "os"

import * as github from "@actions/github"
const octokit = new github.getOctokit(process.env.GITHUB_TOKEN)

async function getPRDetails() {
  const prNumber = github.context.payload.pull_request.number
  const { data: pr } = await octokit.rest.pulls.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: prNumber,
  })

  return { prTitle: pr.title, branchName: pr.head.ref }
}
async function listChangedFiles() {
  let changedFiles = []
  const prNumber = github.context.payload.pull_request.number
  const { data } = await octokit.rest.pulls.listFiles({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: prNumber,
  })
  changedFiles = data.map((file) => file.filename)
  return changedFiles
}

async function main() {
  const { branchName } = await getPRDetails()
  // checkout to pr branch
  execSync(`git checkout ${branchName}`, { encoding: "utf-8" })
  // list changed files (similar to git diff --name-only master..pr-branch)
  const changedFiles = await listChangedFiles()
  const isPackageChanged = changedFiles.some((file) =>
    file.startsWith("packages/ui/")
  )
  const isPreviewBranch = branchName.startsWith("preview/")
  console.log({ changedFiles })
  if (!isPackageChanged || !isPreviewBranch) {
    console.log('No changes in "packages/ui/". Skipping package build.')

    return
  }
  // ensure that changes are only in packages/ui
  console.log({
    isPreviewBranch: branchName.startsWith("preview/"),
    count: changedFiles.length,
    files: changedFiles,
  })
  const pkgFile = resolve("packages/ui", "package.json")
  const pkgData = JSON.parse(await fsPromises.readFile(pkgFile, "utf-8"))
  const commitHash = execSync("git rev-parse --short HEAD")
    .toString("utf-8")
    .trim()
  const pkgVersion = branchName.split("/").join("-")
  const version = pkgData.version.split("-")[0]
  const previewVersion = `${version}-${pkgVersion}-${commitHash}`
  pkgData.version = previewVersion
  await fsPromises.writeFile(pkgFile, JSON.stringify(pkgData, null, 2), "utf-8")
  console.log("changed files:")
  console.log(`upgrading package version to ${pkgData.version}`)
  console.log("Committing changes...")
  const commitChangesComands = [
    `git add .releases package.json packages/ui`,
    `git commit -m "upgrading package version to ${pkgData.version}"`,
  ].join(" && ")

  const releaseCommit = execSync(commitChangesComands, {
    encoding: "utf-8",
  })

  console.log("Commit Output: \n", releaseCommit)
  console.log(`Updated package version to: ${previewVersion}`)
  // Generating new .npmrc file
  console.log("Generating new .npmrc file...")
  const npmrcPath = join(os.homedir(), ".npmrc")
  const nodeAuthToken = process.env.NODE_AUTH_TOKEN
  if (nodeAuthToken) {
    const registeryContent = [
      `//registry.npmjs.org/:_authToken=${nodeAuthToken}`,
      "registry=https://registry.npmjs.org/",
      "always-auth=true",
    ]
    for (const line of registeryContent) {
      appendFileSync(npmrc, `${line}\n`)
    }
    // appendFileSync(
    //   npmrcPath,
    //   `//registry.npmjs.org/:_authToken=${nodeAuthToken}\n`
    // )
    // appendFileSync(npmrcPath, "registry=https://registry.npmjs.org/\n")
    // appendFileSync(npmrcPath, "always-auth=true\n")
  }
  console.log("Building and Publishing the package...")
  execSync(`cd packages/ui && yarn release-it:dev`, {
    encoding: "utf-8",
    env: {
      ...process.env,
      npm_config_registry: "https://registry.npmjs.org/",
      always_auth: true,
      NODE_AUTH_TOKEN: nodeAuthToken,
    },
  })
  console.log("published with success :smile:")
  // Update root package.json
  console.log("Updating root package.json...")
  const rootPKGFile = resolve("package.json")
  const RootData = JSON.parse(
    await fsPromises.readFile(rootPKGFile, "utf-8").catch((e) => {
      console.error({ e })
      return "{}"
    })
  )
  RootData.dependencies[pkgData.name] = pkgData.version
  await fsPromises.writeFile(
    rootPKGFile,
    JSON.stringify(RootData, null, 2),
    "utf-8"
  )

  console.log("Committing changes...")

  const commitsListFromMaster = execSync("git log --pretty=format:%s HEAD..")
    .toString("utf-8")
    .trim()
  console.log({ commitsListFromMaster })
  console.log("changed files:")
  const changedFilesAfterRelease = execSync(`git status --porcelain`, {
    encoding: "utf-8",
  })
  console.log({ changedFilesAfterRelease })
  const rootCommitCommands = [
    `git add package.json`,
    `git commit -m "updating ${pkgData.name} to ${pkgData.version}"`,
    `git push`,
  ].join(" && ")
  const releaseCommitAfterRelease = execSync(rootCommitCommands, {
    encoding: "utf-8",
  })

  //   console.log(`upgrading package version to ${pkgData.version}`)
  //   const releaseAddAfterRelease = execSync(
  //     `git add .releases package.json packages/ui`,
  //     { encoding: "utf-8" }
  //   )
  //   console.log({ releaseAddAfterRelease })
  //   const releaseCommitAfterRelease = execSync(
  //     `git commit -m "upgrading package version to ${pkgData.version}"`,
  //     { encoding: "utf-8" }
  //   )
  console.log("Commit Output: \n", releaseCommitAfterRelease)
  console.log("Pushing changes...")
}

main().catch((err) => {
  console.error("Error: ", err)
  process.exit(1)
})
