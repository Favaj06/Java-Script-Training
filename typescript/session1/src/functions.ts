// Parameter and Return Types

function multiply(a: number, b: number): number {
  return a * b;
}

function formatName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

function isAdult(age: number): boolean {
  return age >= 18;
}

function getFirstElement(arr: string[]): string | undefined {
  return arr[0];
}

// Test with wrong argument types (commented)

// multiply("2", 3);
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// formatName("Alice", 10);
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// isAdult("18");
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// getFirstElement([1, 2, 3]);
// Error: number[] is not assignable to string[].