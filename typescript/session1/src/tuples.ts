// Task A

const userRecord: [string, number, boolean] = ["Alice", 30, true];

// Task B

console.log(userRecord[0].toUpperCase());
console.log(userRecord[1].toFixed(2));
console.log(userRecord[2].toString());

// Task C

// const wrongOrder: [string, number, boolean] = [30, "Alice", true];
// Error:
// Type 'number' is not assignable to type 'string'.

// Task D

const coordinates: [number, number] = [19.076, 72.877];

// Explore

// userRecord.push("Extra");

// Modern TypeScript allows push(),
// but the pushed value is not considered part of the tuple.
// Accessing it through tuple indices is not type-safe.