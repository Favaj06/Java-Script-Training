type Product = {
  name: string
  price: number
  rating: number
  salesCount: number
}

interface SortStrategy {
  sort(products: Product[]): Product[]
}


// ==========================================
// Task 2.1 — Sorting Strategies
// ==========================================

class SortByName implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }
}

class SortByPrice implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      a.price - b.price
    )
  }
}

class SortByRating implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      b.rating - a.rating
    )
  }
}

class SortByPopularity implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      b.salesCount - a.salesCount
    )
  }
}

/*
 * Why must sort() return a new array?
 *
 * If we sort the original array directly, the original product
 * order will be permanently changed.
 *
 * Example:
 *
 * const original = [...products]
 * original.sort((a, b) => a.price - b.price)
 *
 * Now original is no longer in its original order.
 *
 * This can cause bugs when another part of the application expects
 * the products to remain in their original order.
 *
 * Using [...products] creates a copy before sorting, so the original
 * array remains unchanged.
 */


// ==========================================
// Task 2.2 — ProductCatalogue
// ==========================================

class ProductCatalogue {
  private strategy: SortStrategy

  constructor(strategy: SortStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy
  }

  sort(products: Product[]): Product[] {
    return this.strategy.sort(products)
  }
}


const products: Product[] = [
  {
    name: 'Keyboard',
    price: 2499,
    rating: 4.3,
    salesCount: 1200
  },
  {
    name: 'Monitor',
    price: 18999,
    rating: 4.7,
    salesCount: 340
  },
  {
    name: 'Headset',
    price: 3499,
    rating: 4.1,
    salesCount: 870
  },
  {
    name: 'Webcam',
    price: 1999,
    rating: 3.9,
    salesCount: 2100
  },
  {
    name: 'Mouse',
    price: 899,
    rating: 4.5,
    salesCount: 3400
  }
]


const catalogue = new ProductCatalogue(new SortByName())

console.log(
  'By name:',
  catalogue.sort(products).map(p => p.name)
)

catalogue.setStrategy(new SortByPrice())

console.log(
  'By price:',
  catalogue.sort(products).map(p => p.name)
)

catalogue.setStrategy(new SortByRating())

console.log(
  'By rating:',
  catalogue.sort(products).map(p => p.name)
)

catalogue.setStrategy(new SortByPopularity())

console.log(
  'By popularity:',
  catalogue.sort(products).map(p => p.name)
)


/*
 * Strategy Interface Explanation:
 *
 * The sort() call on catalogue remains exactly the same for all
 * strategies because every strategy follows the SortStrategy
 * interface.
 *
 * ProductCatalogue does not need to know how each strategy sorts.
 * It only knows that every strategy provides a sort() method.
 *
 * With a large if/else implementation, ProductCatalogue would need
 * to contain the logic for every sorting type.
 *
 * Adding a new sorting behaviour would require modifying the
 * existing method and making the code more difficult to maintain.
 */


// ==========================================
// Task 2.3 — New Strategy
// ==========================================

class SortByPriceDesc implements SortStrategy {
  sort(products: Product[]): Product[] {
    return [...products].sort((a, b) =>
      b.price - a.price
    )
  }
}

catalogue.setStrategy(new SortByPriceDesc())

console.log(
  'By price desc:',
  catalogue.sort(products).map(p => p.name)
)


/*
 * Existing lines changed: 0
 *
 * We only added a new strategy class and added a test for it.
 * Existing strategy classes and ProductCatalogue were not changed.
 *
 * With a large if/else inside sort(), we would have to modify
 * the existing sort() method by adding another condition and
 * another sorting implementation.
 */


// ==========================================
// Task 2.4 — Strategy as a Function
// ==========================================

type SortFn = (products: Product[]) => Product[]

const sortByName: SortFn = p =>
  [...p].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

const sortByPrice: SortFn = p =>
  [...p].sort((a, b) =>
    a.price - b.price
  )

function applySort(
  products: Product[],
  fn: SortFn
): Product[] {
  return fn(products)
}

console.log('\nFunction-based strategies:')

console.log(
  'By name:',
  applySort(products, sortByName).map(p => p.name)
)

console.log(
  'By price:',
  applySort(products, sortByPrice).map(p => p.name)
)

console.log(
  'By rating inline:',
  applySort(
    products,
    p => [...p].sort((a, b) => b.rating - a.rating)
  ).map(p => p.name)
)


/*
 * Class-based Strategy vs Function-based Strategy:
 *
 * Function-based strategies are suitable when the behaviour is
 * simple and stateless.
 *
 * Class-based strategies are preferred when the strategy needs
 * its own state or configuration.
 *
 * Example:
 *
 * A SortByField strategy could store:
 *
 * - field name
 * - sorting direction
 *
 * The class can keep this configuration as properties and use it
 * every time sort() is called.
 *
 * A simple function is not as suitable when the strategy needs
 * multiple pieces of state, configuration, or additional methods.
 */