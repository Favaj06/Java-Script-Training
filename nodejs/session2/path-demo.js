const path = require('path')

// Returns the absolute path of the current directory where this file is located.
console.log('Current directory:', __dirname)

// Returns the absolute path of the current JavaScript file.
console.log('Current file:     ', __filename)

// Creates a safe file path by joining directory names.
const filePath = path.join(__dirname, 'data', 'users.json')

// Displays the complete file path created using path.join().
console.log('Joined path:', filePath)

// Returns only the file name from the given path.
console.log('Basename:', path.basename('/home/user/notes.txt'))

// Returns the file extension.
console.log('Extension:', path.extname('index.html'))

// Returns only the directory part of the given path.
console.log('Dirname:  ', path.dirname('/home/user/notes.txt'))

// Manual string concatenation — fragile
const manual = __dirname + '/data/users.json'
console.log('Manual:    ', manual)

// path.join() — safe across all operating systems
const joined = path.join(__dirname, 'data', 'users.json')
console.log('path.join: ', joined)

// path.resolve() — always returns an absolute path
const resolved = path.resolve('data', 'users.json')
console.log('Resolved:  ', resolved)

/*
Difference between path.join() and path.resolve():

path.join():
- Joins path segments into a single path.
- Works safely across Windows, Linux, and macOS.
- Best for building file and folder paths.

path.resolve():
- Converts a path into an absolute path.
- Starts from the current working directory if the path is relative.
- If an absolute path is provided, it ignores the previous segments.

Use path.join() when combining folder names.
Use path.resolve() when you need the complete absolute path.
*/