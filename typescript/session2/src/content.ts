import {
  slugify,
  truncate
} from "./helpers";

const slug = slugify(
  "Hello World"
);

const shortText = truncate(
  "This is a long text",
  10
);

console.log(slug);
console.log(shortText);

export {};