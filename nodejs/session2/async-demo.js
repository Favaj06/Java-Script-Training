const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

// Synchronous
console.log('1 — before sync read')
const data = fs.readFileSync(filePath, 'utf8')
console.log('2 — sync read done:', data.split('\n').length, 'lines')
console.log('3 — after sync read')

console.log('---')

// Asynchronous
console.log('4 — before async read')
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err
  console.log('6 — async read done:', data.split('\n').length, 'lines')
})
console.log('5 — after async read (does not wait)')

/*
The synchronous read blocks the program until the file is completely read.
The asynchronous read allows the program to continue executing while the file
is being read in the background. This is important for servers because it lets
them handle multiple user requests without waiting for one file operation to finish.
*/