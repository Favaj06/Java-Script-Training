// Task A

function logEvent(event: string): void {
  console.log(`[LOG] ${event}`);
}

const result = logEvent("user_login");

console.log(result);

// Result is undefined because a void function returns nothing.

// -----------------------------

// Task B

function fail(message: string): never {
  throw new Error(message);
}

// -----------------------------

// Task C

function doSomething(): void {
  // return "hello";
  // Error:
  // Type 'string' is not assignable to type 'void'.
}

// -----------------------------

// Another example of never

function infiniteLoop(): never {
  while (true) {}
}

// This function never finishes execution,
// so its return type is never.