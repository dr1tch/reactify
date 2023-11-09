import getChangedWorkspaces from "yarn-changed-workspaces";

export const changedFiles = async () => {
  return await getChangedWorkspaces({
    branch: "master",
    projectRoot: process.cwd(),
  });
}

