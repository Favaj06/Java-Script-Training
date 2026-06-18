// 1. Union Types
// Example 1
let id: string | number = 101;
id = "EMP101";

// Example 2
function printValue(value: string | number): void {
  console.log(value);
}

printValue("Hello");
printValue(100);

// Example 3
let operationStatus: "success" | "failure" = "success";

// 2. Literal Types
function sendRequest(method: "GET" | "POST"): void {
  console.log(`Request Method: ${method}`);
}
sendRequest("GET");
sendRequest("POST");

// Error:
// Argument of type '"PUT"' is not assignable to type '"GET" | "POST"'.

// 3. Readonly Arrays

const colors: readonly string[] = ["Red", "Green", "Blue"];

console.log(colors);
// Error:
// Property 'push' does not exist on type 'readonly string[]'.

// Readonly arrays prevent accidental modification of data.
// They are useful when the array should never be changed.

// 4. strictNullChecks

let userName: string | null = "Alice";
// Error:
// 'userName' is possibly 'null'.

if (userName !== null) {
  console.log(userName.toUpperCase());
}

// With strictNullChecks enabled,
// TypeScript forces us to check for null
// before using methods on the value.