interface User {
  readonly id: number;
  name: string;
  email: string;
  age?: number;
  role:
    | "admin"
    | "editor"
    | "viewer";
}

function updateUser(
  user: User,
  updates: Partial<User>
): User {
  return {
    ...user,
    ...updates
  };
}

type UserContact =
  Pick<
    User,
    "name" | "email"
  >;

function sendWelcomeEmail(
  user: UserContact
): void {
  console.log(
    `Welcome ${user.name}`
  );
}

type NewUser =
  Omit<User, "id">;

function createUser(
  user: NewUser
): User {
  return {
    id: Date.now(),
    ...user
  };
}

type RolePermissions =
  Record<
    "admin" |
    "editor" |
    "viewer",
    string[]
  >;

const permissions: RolePermissions =
{
  admin: [
    "read",
    "write",
    "delete"
  ],
  editor: [
    "read",
    "write"
  ],
  viewer: ["read"]
};

function getPermissions(
  role:
    | "admin"
    | "editor"
    | "viewer"
): string[] {
  return permissions[role];
}

export {};