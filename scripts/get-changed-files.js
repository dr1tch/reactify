const  getChangedWorkspaces = require( "yarn-changed-workspaces");
const path = require('path')
const getChangedFiles = async (branch = 'master') => {
    console.log(__dirname, __dirname.split('/').slice(0,-1).join('/'), branch)
  return await getChangedWorkspaces({
    branch,
    projectRoot:  __dirname.split('/').slice(0,-1).join('/')
  });
}

module.exports ={getChangedFiles}