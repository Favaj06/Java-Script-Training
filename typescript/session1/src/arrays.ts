// Task A

const fruits: string[] = ["apple", "banana", "cherry"];
const temperatures: number[] = [22.5, 19.0, 30.1];
const flags: boolean[] = [true, false, true];

// Task B

// fruits.push(42);
// Error:
// Argument of type 'number' is not assignable to parameter of type 'string'.

// temperatures.push("hot");
// Error:
// Argument of type 'string' is not assignable to parameter of type 'number'.

// Task C

const mixed: (string | number)[] = ["Alice", 1, "Bob", 2];

// mixed.push(true);
// Error:
// Argument of type 'boolean' is not assignable to parameter of type 'string | number'.

// string[] and Array<string> are exactly the same.
// They are interchangeable; only the syntax is different.