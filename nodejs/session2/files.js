const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

// Writes data to the file. If the file already exists, its contents are replaced.
fs.writeFileSync(filePath, 'Line 1 — written by Node.js')
console.log('File written')

// Reads the contents of the file as a UTF-8 string.
const content = fs.readFileSync(filePath, 'utf8')
console.log('Content:', content)

// Adds new content to the end of the file without removing existing data.
fs.appendFileSync(filePath, '\nLine 2 — appended')
fs.appendFileSync(filePath, '\nLine 3 — appended again')

// Reads the updated file content.
const updated = fs.readFileSync(filePath, 'utf8')
console.log('Updated:\n', updated)

const checkPath = path.join(__dirname, 'missing.txt')

if (fs.existsSync(checkPath)) {
  console.log('File exists')
} else {
  console.log('File does not exist — creating it')
  fs.writeFileSync(checkPath, 'Created because it was missing')
}

/*
Difference between writeFileSync() and appendFileSync()

writeFileSync():
- Creates a new file or overwrites the existing file with new content.

appendFileSync():
- Adds new content to the end of the existing file without deleting the old content.
*/

// Check if a file exists before reading it.
const checkPath = path.join(__dirname, 'missing.txt')

if (fs.existsSync(checkPath)) {
  console.log('File exists')
} else {
  console.log('File does not exist — creating it')
  fs.writeFileSync(checkPath, 'Created because it was missing')
}

/*
Explore:

If fs.readFileSync() is used on a file that does not exist,
Node.js throws an ENOENT (Error NO ENTry) error and the program stops.

To avoid this, first check whether the file exists using fs.existsSync(),
or use a try...catch block to catch the error and handle it gracefully
without crashing the application.
*/