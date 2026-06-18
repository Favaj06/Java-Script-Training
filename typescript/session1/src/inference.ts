// Inferred types
let city = "Mumbai";
let year = 2024;

// Explicit types
let country: string;
let population: number;

country = "India";
population = 1400000000;

// Type inference exploration
let mystery;

mystery = "hello";
mystery = 42;   
// TypeScript assigns the 'any' type when it cannot infer a type.
// Variables of type 'any' can store values of any type.