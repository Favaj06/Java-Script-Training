// Displays the current Node.js version.
// This helps check if the correct Node.js version is installed.
console.log("Node version:", process.version);

// Displays the operating system platform (Windows, Linux, macOS).
// Useful when writing code that behaves differently on different systems.
console.log("Platform:", process.platform);

// Displays the current working directory.
// Helpful for locating files and folders in a project.
console.log("Current directory:", process.cwd());

// Displays the memory used by the Node.js application.
// Useful for monitoring and debugging application performance.
console.log("Memory usage:", process.memoryUsage());

// process.argv stores the command line arguments passed to the program.
const args = process.argv;

console.log("All arguments:", args);

// Displays the first custom argument entered by the user.
console.log("Your input:", args[2]);

// A real-world use of command line arguments is allowing users to
// provide input such as a file name, user ID, or environment
// without changing the source code.

// Displays the current environment (development, production, etc.).
console.log("NODE_ENV:", process.env.NODE_ENV);

// Displays the current user's home directory.
console.log("HOME:", process.env.HOME || process.env.USERPROFILE);

// Environment variables are used to store sensitive information like
// API keys and database passwords securely. This keeps them out of
// the source code and makes it easier to use different settings
// for development, testing, and production.
/* PS C:\Users\M. Mohamed Al Favaj\OneDrive\Desktop\Java-Script-Training\nodejs\session1> node process-demo.js
Node version: v24.12.0
Platform: win32
Current directory: C:\Users\M. Mohamed Al Favaj\OneDrive\Desktop\Java-Script-Training\nodejs\session1
Memory usage: {
  rss: 36061184,
  heapTotal: 6090752,
  heapUsed: 4545608,
  external: 1590181,
  arrayBuffers: 10511
}
All arguments: [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\M. Mohamed Al Favaj\\OneDrive\\Desktop\\Java-Script-Training\\nodejs\\session1\\process-demo.js'
]
Your input: undefined
NODE_ENV: production
HOME: C:\Users\M. Mohamed Al Favaj*/

