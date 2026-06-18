// Helper function

function throwDiscountError(message: string): never {
  throw new Error(message);
}

// -----------------------------

// Challenge 1

function calculateDiscount(
  price: number,
  discountPercent?: number
): number {
  if (discountPercent === undefined) {
    return price;
  }

  if (discountPercent >= 100) {
    throwDiscountError("Discount cannot be 100% or more.");
  }

  return price - (price * discountPercent) / 100;
}

console.log(calculateDiscount(1000));
console.log(calculateDiscount(1000, 20));

// -----------------------------

// Challenge 2

function formatUserList(users: [string, number][]): string[] {
  return users.map(
    ([name, age]) => `${name} (${age} years)`
  );
}

console.log(
  formatUserList([
    ["Alice", 30],
    ["Bob", 25],
  ])
);

// -----------------------------

// Challenge 3

function findFirst(
  arr: string[],
  searchTerm: string
): string | undefined {
  return arr.find((item) => item === searchTerm);
}

console.log(findFirst(["apple", "banana", "mango"], "banana"));
console.log(findFirst(["apple", "banana"], "orange"));