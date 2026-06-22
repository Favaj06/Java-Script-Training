interface Product {
  id: string;
  name: string;
  price: number;
  tags: string[];
  discount?: number;
}

function applyDiscount(
  product: Product
): number {
  return (
    product.price -
    (product.discount ?? 0)
  );
}

/*
Without ?? 0,
price - undefined would produce NaN.
*/

function getTagSummary(
  product: Product
): string {
  return product.tags
    .join(", ")
    .toUpperCase();
}

/*
Original bug:
toUppercase()

Correct:
toUpperCase()
*/

function createProduct(
  name: string,
  price: number
): Product {
  return {
    id: Math.random().toString(),
    name,
    price,
    tags: []
  };
}

/*
Original parameters
had implicit any types.
*/

function findCheapest(
  products: Product[]
): Product | undefined {

  const sorted = [...products];

  sorted.sort(
    (a, b) =>
      a.price - b.price
  );

  return sorted[0];
}

/*
Copying prevents mutation
of original array.
*/

function printProduct(
  product: Product
): void {

  console.log(
    `${product.name} costs ${product.price}`
  );
}
export {};
/*
void functions
must not return a value.
*/