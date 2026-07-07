const os = require('os')

// Returns the operating system platform (e.g., win32, linux, darwin).
console.log('Platform:     ', os.platform())

// Returns the CPU architecture (e.g., x64, arm64).
console.log('Architecture: ', os.arch())

// Returns the hostname (computer name) of the system.
console.log('Hostname:     ', os.hostname())

// Returns the home directory of the current user.
console.log('Home dir:     ', os.homedir())

// Returns the total number of CPU cores available.
console.log('CPU cores:    ', os.cpus().length)

// Converts the total system memory from bytes to megabytes.
const totalMB = Math.round(os.totalmem() / 1024 / 1024)

// Converts the free system memory from bytes to megabytes.
const freeMB = Math.round(os.freemem() / 1024 / 1024)

// Displays the available and total memory in MB.
console.log(`Memory: ${freeMB}MB free of ${totalMB}MB`)

const platform = os.platform()

if (platform === 'win32') {
  console.log('Running on Windows')
} else if (platform === 'darwin') {
  console.log('Running on Mac')
} else {
  console.log('Running on Linux')
}

const freePercent = Math.round((os.freemem() / os.totalmem()) * 100)

if (freePercent < 20) {
  console.log('Warning: Low memory —', freePercent + '% free')
} else {
  console.log('Memory OK —', freePercent + '% free')
}

/*
Real-world example:
A Node.js application may check the operating system at runtime to use
platform-specific commands or file paths. For example, a backup application
can run "dir" on Windows and "ls" on Linux/macOS, or choose the correct
file path format for each operating system.
*/