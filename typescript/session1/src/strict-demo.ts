// noImplicitAny

// Error when strict mode is ON
// function greet(name) {
//   console.log(name);
// }

// Correct
function greet(name: string) {
  console.log(name);
}

// -----------------------------

// strictNullChecks

// Error when strict mode is ON
// let username: string = null;

// Correct
let username: string | null = null;