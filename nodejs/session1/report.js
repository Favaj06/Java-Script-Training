const fs = require("fs");
const dayjs = require("dayjs");

// Read data from data.json
const raw = fs.readFileSync("data.json", "utf8");
const data = JSON.parse(raw);

// Get the role from the command line
const role = process.argv[2];

// Filter users based on the role
const users = data.users.filter(user => user.role === role);

console.log("Report generated on:", dayjs().format("DD MMM YYYY"));
console.log("Role:", role);
console.log("--------------------");

// Display matching users
users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name} (ID: ${user.id})`);
});

console.log("--------------------");
console.log(`Total: ${users.length} user(s) found`);