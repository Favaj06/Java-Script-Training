/*
Error 1

Property 'username' does not exist on type 'User'

Cause:
Trying to access a property
that isn't defined.

Example:

interface User {
  name: string;
}

const user: User = {
  name: "Alice"
};

console.log(user.username);

Fix:

console.log(user.name);
*/

/*
Error 2

Argument of type 'string'
is not assignable to parameter
of type 'number'

Example:

function square(
  value: number
) {
  return value * value;
}

square("5");

Fix:

square(5);
*/

/*
Error 3

Parameter 'data'
implicitly has an 'any' type

Example:

function print(data) {
  console.log(data);
}

Fix:

function print(
  data: string
) {
  console.log(data);
}
*/

/*
Error 4

Object is possibly undefined

Example:

const names = ["Alice"];

const user =
  names.find(
    n => n === "Bob"
  );

console.log(
  user.toUpperCase()
);

Fix:

if (user) {
  console.log(
    user.toUpperCase()
  );
}
*/

/*
Error 5

Type 'string | undefined'
is not assignable to type string

Example:

interface User {
  name?: string;
}

const user: User = {};

const name: string =
  user.name;

Fix:

const name =
  user.name ?? "Guest";
*/

export {};