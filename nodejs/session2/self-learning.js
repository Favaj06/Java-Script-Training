const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'output.txt')

async function fileOperations() {
  try {
    // Write to the file using fs.promises
    await fs.promises.writeFile(filePath, 'Line 1 — written using fs.promises')
    console.log('File written')

    // Read the file
    const content = await fs.promises.readFile(filePath, 'utf8')
    console.log('Content:', content)

    // Append new lines
    await fs.promises.appendFile(filePath, '\nLine 2 — appended')
    await fs.promises.appendFile(filePath, '\nLine 3 — appended again')

    // Read the updated file
    const updated = await fs.promises.readFile(filePath, 'utf8')
    console.log('Updated:\n', updated)

    console.log('\n----------------------------------')
    console.log('JavaScript Files in session2')
    console.log('----------------------------------')

    // Read all files in the current directory
    const files = fs.readdirSync(__dirname)

    // Display only .js files with their sizes
    files.forEach(file => {
      if (file.endsWith('.js')) {
        const fileLocation = path.join(__dirname, file)
        const stats = fs.statSync(fileLocation)

        console.log(`${file} - ${(stats.size / 1024).toFixed(2)} KB`)
      }
    })

  } catch (err) {
    console.error('Error:', err.message)
  }
}

fileOperations()