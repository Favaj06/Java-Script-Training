const os = require("os");

console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("Hostname:", os.hostname());
console.log("Home directory:", os.homedir());
console.log("CPUs:", os.cpus().length);
console.log("Total memory (MB):", Math.round(os.totalmem() / 1024 / 1024));
console.log("Free memory (MB):", Math.round(os.freemem() / 1024 / 1024));

// A Node.js application can use this information to adjust its
// performance based on the operating system or available memory.
// For example, a video editing or data processing application
// can reduce memory usage on low-memory systems.