# package.json Notes

## name
The name of the Node.js project.

## version
Shows the current version of the project.

## description
A short explanation of what the project does.

## main
The main JavaScript file of the project.

## scripts
Stores shortcut commands that can be run using npm.

## keywords
Used to describe the project for searching on npm.

## author
The name of the developer.

## license
Specifies the license used for the project.

## dependencies
Lists the packages required for the project to run.

## Why are npm scripts useful?

npm scripts make it easy to run commands with short names.
Instead of typing long commands every time, everyone on the team
can use the same script, which keeps development consistent.

## Why npm scripts are useful

npm scripts provide simple shortcuts for running commands.
In a team, everyone can use the same commands without remembering
long or complicated terminal commands. This makes development
faster and avoids mistakes.

package.json contains the project information and the list of required packages.
package-lock.json stores the exact versions of those packages to ensure everyone installs the same dependencies.

Dependencies are packages required for the application to run, while devDependencies are only needed during development.
Nodemon is a devDependency because it helps restart the application automatically during development and is not needed in production.

## npm install vs npm ci

npm install installs packages and can update the package-lock.json file.
npm ci installs the exact versions from package-lock.json and is mainly used for automated builds and deployments.