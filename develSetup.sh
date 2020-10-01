# Run this file with ./develSetup.sh to fix the "yarn add expo" issue
npm install expo;
npm audit fix --force;
npm install;
#This command is magic with broken deps and needed updates.
#npx npm-check-updates -u && npm i