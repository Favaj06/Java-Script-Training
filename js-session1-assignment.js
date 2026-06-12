console.log("Hello");

//section 1:
const name = "Mohamed Al Favaj";
let age = 21;
let role = "Student";
let isAvailable = true;
//const name = "Goku";
//Uncaught SyntaxError: Identifier 'name' has already been declared

console.log("name is a " + typeof name);
console.log("age is a " + typeof age);
console.log("role is a " + typeof role);
console.log("isAvailable is a " + typeof isAvailable);

// Section 2 — Template Literals

console.log(`Hi, I'm ${name} and I'm a ${role}.`);
console.log(`Available: ${isAvailable}`);
console.log(`My name has ${name.length} characters`);

//Section 3 — Arrow Functions
const fullName = (first, last) => `${first} ${last}`;
console.log(fullName("Alice", "Johnson"));
const isAdult = (age) => age >= 18;
console.log(isAdult(20));
console.log(isAdult(16));
const formatUser = (user) => `${user.name} — ${user.role}`;
const user = {
    name: "Alice",
    role: "dev"
};
console.log(formatUser(user));

//section 4 - Objects & Destructuring

const userDetails = {
  id: 1,
  name: "Alice",
  role: "dev",
  active: true,
  address: {
    city: "Mumbai",
    country: "India"
  }
};
const { name: userName, role: userRole, active } = userDetails;
const {
  address: { city }
} = userDetails;
const updatedUser = {
  ...userDetails,
  active: false
};
console.log(userName);
console.log(userRole);
console.log(active);
console.log(city);
console.log(updatedUser);

//Section 5 — Arrays & Spread

const devs = ["Alice", "Carol"];
const designers = ["Bob", "Dan"];
const team = [...devs, ...designers];
const updatedTeam = [...team, "Eve"];
const [firstMember, secondMember] = team;
console.log(team);
console.log(updatedTeam);
console.log(firstMember);
console.log(secondMember);

// Section 6 — Array `map` & `filter`

const users = [
  { id: 1, name: "Alice", role: "dev", active: true },
  { id: 2, name: "Bob", role: "design", active: false },
  { id: 3, name: "Carol", role: "dev", active: true },
  { id: 4, name: "Dan", role: "design", active: true },
  { id: 5, name: "Eve", role: "dev", active: false },
];
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name);
const devUsers = users.filter(user => user.role === "dev");
const userDescriptions = users.map(
  user => `${user.name} is a ${user.role}`
);
const activeDevNames = users
  .filter(user => user.active && user.role === "dev")
  .map(user => user.name);
console.log(activeUserNames);
console.log(devUsers);
console.log(userDescriptions);
console.log(activeDevNames);

//Section 7 — Array Functions
const users2 = [
  { id: 1, name: "Alice", role: "dev", active: true },
  { id: 2, name: "Bob", role: "design", active: false },
  { id: 3, name: "Carol", role: "dev", active: true },
  { id: 4, name: "Dan", role: "design", active: true },
  { id: 5, name: "Eve", role: "dev", active: false },
];
const usersPerRole = users.reduce((acc, user) => {
  acc[user.role] = (acc[user.role] || 0) + 1;
  return acc;
}, {});

const firstActiveDesigner = users.find(
  user => user.role === "design" && user.active
);

const hasInactiveUsers = users.some(
  user => !user.active
);

const allUsersHaveRole = users.every(
  user => user.role
);

console.log(usersPerRole);
console.log(firstActiveDesigner);
console.log(hasInactiveUsers);
console.log(allUsersHaveRole);

//Section 8 — Spot & Fix the Bugs

// 1. Loose equality trap

const input = "5";
const score = 5;

if (input === score) {
  console.log("match");
}

// 2. Missing return in arrow function

const doubled = [1, 2, 3].map(n => {
  return n * 2;
});

console.log(doubled);

// 3. Mutating original array

const original = [1, 2, 3];

const updatedArray = [...original, 4];

console.log(original);
console.log(updatedArray);

// 4. const object reassignment confusion

const userData = { name: "Alice", active: true };

userData.active = false;

console.log(userData);

//Section 9 — Things to Be Aware Of

// 1. Case sensitivity

const Username = "Alice";
const username = "Bob";
console.log(Username);
console.log(username);

// 2. undefined vs null
const a = null;
const b = undefined;
console.log(typeof a);
console.log(typeof b);

// 3. Call order matters
const greet = (name) => `Hello, ${name}`;
console.log(greet("Alice"));

// 4. Semicolons
const p = 10;
const q = 20;
console.log(p);
console.log(q);
