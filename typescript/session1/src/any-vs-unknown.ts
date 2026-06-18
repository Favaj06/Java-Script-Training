// Part A — any

let dangerousValue: any = "hello";

dangerousValue = 42;
dangerousValue = { name: "Alice" };

console.log(dangerousValue.foo.bar);

// -----------------------------

// Part B — unknown

let safeValue: unknown = "hello";

// console.log(safeValue.toUpperCase());
// Error:
// Object is of type 'unknown'.

// Correct way
if (typeof safeValue === "string") {
  console.log(safeValue.toUpperCase());
}

// Type narrowing means checking the type of an unknown value
// before using it so TypeScript knows which operations are safe.