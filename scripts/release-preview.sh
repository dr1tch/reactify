#!/bin/bash

# Restore all git changes
git restore -s@ -SW  -- .

# Bump versions to edge
node ./scripts/release-preview.js

# Update token
if [[ ! -z ${NODE_AUTH_TOKEN} ]] ; then
  echo "//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}" >> ~/.npmrc
  echo "registry=https://registry.npmjs.org/" >> ~/.npmrc
  echo "always-auth=true" >> ~/.npmrc
  npm whoami
fi
cd packages/ui
# Release package
echo "Publishing @react-super-ui"
yarn build && yarn release
