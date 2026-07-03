const fs = require("fs");

// writeFileSync() creates a new file or replaces the existing content.
fs.writeFileSync("output.txt", "Hello from Node.js file system!");

// Read the file and display its content.
const content = fs.readFileSync("output.txt", "utf8");
console.log("File content:", content);

// appendFileSync() adds new content without removing the existing content.
fs.appendFileSync("output.txt", "\nThis line was appended.");

// Read the updated file.
const updated = fs.readFileSync("output.txt", "utf8");
console.log("Updated content:", updated);

// writeFileSync() replaces the entire file content.
// appendFileSync() adds new content at the end of the file.