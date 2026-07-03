const fs = require("fs").promises;
const readline = require("readline");

async function fileDemo() {
    try {
        // Create a file
        await fs.writeFile("async-output.txt", "Hello from Async File System!");

        // Read the file
        const content = await fs.readFile("async-output.txt", "utf8");
        console.log("File Content:", content);

        // Append new content
        await fs.appendFile("async-output.txt", "\nThis line was added using async/await.");

        // Read again
        const updated = await fs.readFile("async-output.txt", "utf8");
        console.log("Updated Content:");
        console.log(updated);
    } catch (error) {
        console.log(error);
    }
}

fileDemo();

// __dirname gives the current folder path.
// __filename gives the current file path.
// In ES Modules, they are replaced using import.meta.url.

// Readline example
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your name: ", (name) => {
    console.log(`Hello, ${name}!`);
    rl.close();
});

// npm install installs all required packages and updates package-lock.json if needed.
// npm ci installs packages exactly as listed in package-lock.json and is mainly used in CI/CD pipelines.