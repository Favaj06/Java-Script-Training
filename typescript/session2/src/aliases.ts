type UserId = string;
type ProductId = string;
type Timestamp = number;

type Status = "active" | "inactive" | "pending";

type Direction = "north" | "south" | "east" | "west";

function getUserById(id: UserId): void {
  console.log(`Fetching user ${id}`);
}

function updateStatus(
  id: UserId,
  status: Status
): void {
  console.log(`Updating ${id} to ${status}`);
}

function move(
  direction: Direction,
  steps: number
): void {
  console.log(
    `Moving ${direction} by ${steps} steps`
  );
}

getUserById("U001");
updateStatus("U001", "active");
move("north", 10);
export {};
/*
Observation:

TypeScript does NOT catch passing a normal
string because UserId is simply an alias
for string.
*/

/*
Structural Typing:

UserId and ProductId are both strings
under the hood, so TypeScript treats
them as compatible.
*/