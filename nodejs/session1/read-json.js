const fs = require("fs");

// Read the JSON file as text.
const raw = fs.readFileSync("data.json", "utf8");

// JSON.parse() converts the JSON text into a JavaScript object.
const data = JSON.parse(raw);

console.log("All users:", data.users);
console.log("First user:", data.users[0].name);

const interns = data.users.filter(user => user.role === "intern");
console.log("Interns:", interns.map(user => user.name));

// If the JSON file has a syntax error, JSON.parse() throws an error
// and the program stops until the JSON is fixed.