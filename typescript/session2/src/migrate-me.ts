interface User {
  id: string;
  name: string;
}

const cache: Record<
  string,
  User
> = {};

function fetchUserFromCache(
  id: string
): User | null {
  return cache[id] ?? null;
}

function saveUserToCache(
  user: User
): void {
  cache[user.id] = user;
}

function processUsers<T, U>(
  users: T[],
  filterFn: (
    user: T
  ) => boolean,
  transformFn: (
    user: T
  ) => U
): U[] {
  return users
    .filter(filterFn)
    .map(transformFn);
}

function buildQueryString(
  params: Record<
    string,
    string | number
  >
): string {
  return Object.keys(params)
    .map(
      key =>
        `${key}=${encodeURIComponent(
          String(params[key])
        )}`
    )
    .join("&");
}

async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  delay: number
): Promise<T> {

  let attempt = 0;

  while (
    attempt < maxAttempts
  ) {
    try {
      return await fn();
    } catch (error) {
      attempt++;

      if (
        attempt >= maxAttempts
      ) {
        throw error;
      }

      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            delay
          )
      );
    }
  }

  throw new Error(
    "Retry failed"
  );
}

export {
  fetchUserFromCache,
  saveUserToCache,
  processUsers,
  buildQueryString,
  retry
};