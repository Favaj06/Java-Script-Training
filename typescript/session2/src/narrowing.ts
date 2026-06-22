function describe(
  value:
    | string
    | number
    | boolean
    | null
): string {
  if (value === null) {
    return "No value provided";
  }

  if (typeof value === "string") {
    return `String of length ${value.length}: ${value}`;
  }

  if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  }

  return `Boolean: ${value}`;
}

interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function makeSound(
  animal: Cat | Dog
): void {
  if ("meow" in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}

function summarise(
  input:
    | string
    | number[]
    | { label: string }
): string {

  if (typeof input === "string") {
    return `String: ${input}`;
  }

  if (Array.isArray(input)) {
    return `Array length: ${input.length}`;
  }

  return `Label: ${input.label}`;
}
export {};
/*
Discriminated Union Example

interface Cat {
  kind: "cat";
  meow(): void;
}

interface Dog {
  kind: "dog";
  bark(): void;
}

type Animal = Cat | Dog;

function makeSound(animal: Animal) {
  if (animal.kind === "cat") {
    animal.meow();
  } else {
    animal.bark();
  }
}

This is safer because TypeScript
can narrow precisely using the
kind property.
*/