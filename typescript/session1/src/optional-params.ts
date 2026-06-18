// Task A

function greetUser(name: string, title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}

greetUser("Alice");
greetUser("Alice", "Dr.");

// -----------------------------

// Task B

function createAccount(email: string, role: string = "user"): object {
  return { email, role };
}

createAccount("alice@example.com");
createAccount("bob@example.com", "admin");

// -----------------------------

// Optional parameters may or may not be passed by the caller.
// Default parameters always have a value because TypeScript assigns one.
// Use optional parameters when the value is truly optional.
// Use default parameters when a sensible default should be used.