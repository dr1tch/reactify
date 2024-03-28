import { promises as fsPromises, appendFileSync, readFileSync } from "fs"
import { resolve, join } from "path"
import { execSync } from "child_process"
import os from "os"

const eventPath = JSON.parse(
  readFileSync(process.env.GITHUB_EVENT_PATH || "", "utf8")
)
function listChangedFiles() {
  console.dir(process.env, { depth: null, colors: true })
  console.dir(eventPath, { depth: null, colors: true })
  let baseCommit = ""
  let headCommit = ""
  if (eventPath.action === "opened") {
    baseCommit = eventPath.GITHUB_BASE_REF
    headCommit = eventPath.GITHUB_HEAD_REF
  } else {
    baseCommit = eventPath.before
    headCommit = eventPath.after
  }

  // Fetch the list of changed files in the merge
  const changedFiles = execSync(
    `git diff --name-only ${baseCommit} ${headCommit}`,
    { encoding: "utf-8" }
  )
    .split("\n")
    .filter(Boolean)
  return changedFiles
}

async function main() {
  const branchName = eventPath.GITHUB_HEAD_REF
  // checkout to pr branch
  execSync(`git checkout ${branchName}`, { encoding: "utf-8" })
  // list changed files (similar to git diff --name-only master..pr-branch)
  const changedFiles = listChangedFiles()
  console.log({ changedFiles })
  const isPackageChanged = changedFiles.some((file) =>
    file.startsWith("packages/ui/")
  )
  const isPreviewBranch = branchName.startsWith("preview/")
  // ensure that changes are only in packages/ui
  if (!isPackageChanged || !isPreviewBranch) {
    console.log('No changes in "packages/ui/". Skipping package build.')

    return
  }
  // setup git config
  console.log("Setting up git config...")
  const gitConfigSetupCommands = [
    "git config user.name github-actions[bot]",
    "git config user.email youssouf.kacemi@gmail.com",
  ].join(" && ")
  execSync(gitConfigSetupCommands, { encoding: "utf-8" })
  // update the ui package.json version with a new dev version
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
  console.log(`upgrading package version to ${pkgData.version}`)
  // Commit the changes
  console.log("Committing changes...")
  const commitChangesComands = [
    `git add packages/ui`,
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
      appendFileSync(npmrcPath, `${line}\n`)
    }
  }
  // Building and Publishing the package
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
  console.log("published with success!")
  // Update root package.json
  console.log("Updating root package.json...")
  const rootPKGFile = resolve("package.json")
  const RootData = JSON.parse(
    await fsPromises.readFile(rootPKGFile, "utf-8").catch((e) => {
      console.error({ e })
    })
  )
  RootData.dependencies[pkgData.name] = pkgData.version
  await fsPromises.writeFile(
    rootPKGFile,
    JSON.stringify(RootData, null, 2),
    "utf-8"
  )
  // Commit the changes
  console.log("Committing and pushing changes...")
  const rootCommitCommands = [
    `git add package.json`,
    `git commit -m "updating ${pkgData.name} to ${pkgData.version}"`,
    `git push`,
  ].join(" && ")
  const releaseCommitAfterRelease = execSync(rootCommitCommands, {
    encoding: "utf-8",
  })
  console.log("Done!")
}

main().catch((err) => {
  console.error("Error: ", err)
  process.exit(1)
})
