interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "editor" | "viewer";
}

const adminUser: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  role: "admin"
};

const editorUser: User = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  role: "editor"
};

const viewerUser: User = {
  id: 3,
  name: "Charlie",
  email: "charlie@example.com",
  role: "viewer"
};
export {};
// Error:
// Type '"superuser"' is not assignable to type
// '"admin" | "editor" | "viewer"'.

// adminUser.id = 100;

// Error:
// Cannot assign to 'id' because it is a read-only property.

// readonly prevents accidental modification of IDs.
// Instead of relying on developers to remember not to change them,
// TypeScript enforces the rule at compile time.