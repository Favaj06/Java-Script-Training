/*type User = {
  fullName: string;
};

function getUserLabel(user: User): string {
  return user.fullNme.toUpperCase();
}*/

type User = {
  fullName: string;
};

function getUserLabel(user: User): string {
  return user.fullName.toUpperCase();
}
// In JavaScript, the bug was found only when the program ran.
// In TypeScript, the compiler detected the typo before the program was executed.
