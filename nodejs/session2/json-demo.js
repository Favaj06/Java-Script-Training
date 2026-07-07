const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'data.json')

const raw = fs.readFileSync(filePath, 'utf8')

// JSON.parse() converts a JSON string into a JavaScript object or array.
// Without JSON.parse(), the data would remain a plain string and we could
// not access properties, filter, or perform array operations.
const users = JSON.parse(raw)

console.log('All users:', users)
console.log('Total:', users.length)

const top = users.filter(u => u.score >= 90)
console.log('Top scorers:', top.map(u => u.name))

const avg = users.reduce((sum, u) => sum + u.score, 0) / users.length
console.log('Average score:', avg.toFixed(1))

// Add a new user
const newUser = { id: 5, name: 'Vikram', role: 'intern', score: 88 }
users.push(newUser)

// JSON.stringify(users, null, 2)
// null means no custom replacer function.
// 2 means indent the JSON with 2 spaces, making it easy to read.
// Without "2", the JSON would be written as a single compact line.
const updated = JSON.stringify(users, null, 2)

// Write back to file
fs.writeFileSync(filePath, updated)
console.log('User added and file updated')

// Verify
const verify = JSON.parse(fs.readFileSync(filePath, 'utf8'))
console.log('Total after update:', verify.length)

const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const index = currentData.findIndex(u => u.name === 'Amit')

if (index !== -1) {
  currentData[index].score = 90
  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2))
  console.log('Amit score updated to 90')
}

/*
Difference between Array.find() and Array.findIndex():

Array.find()
- Returns the first matching object from the array.

Array.findIndex()
- Returns the index (position) of the first matching object.

Use findIndex() when you need to update, replace, or remove an element
because the index tells you exactly where the element is located.
*/