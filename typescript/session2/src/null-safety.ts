function getFirstWord(
  sentence: string | null
): string {
  if (sentence === null) {
    return "";
  }

  return sentence.split(" ")[0];
}

/*
Without this check,
calling split on null would crash.
*/

function getUserAge(
  user: {
    name: string;
    age?: number;
  }
): string {
  if (user.age === undefined) {
    return `${user.name}'s age is unknown`;
  }

  return `${user.name} is ${user.age} years old`;
}

/*
Without checking age,
calling toString on undefined
would throw an error.
*/

const config = {
  database: {
    host: "localhost",
    port: 5432
  }
};

function getDbPort(): number {
  return config.database.port;
}

/*
Already safe because database
and port always exist.
*/

const users = [
  "Alice",
  "Bob",
  "Charlie"
];

function findUser(
  name: string
): string {
  const found = users.find(
    u => u === name
  );

  if (found === undefined) {
    return "User not found";
  }

  return found.toUpperCase();
}
export {};
/*
Without checking,
toUpperCase on undefined
would crash.
*/