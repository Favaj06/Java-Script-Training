const dayjs = require("dayjs");

// require("dayjs") loads the dayjs package from the node_modules folder
// so that we can use its date and time functions.

console.log("Today:", dayjs().format("DD MMM YYYY"));
console.log("Day of week:", dayjs().format("dddd"));
console.log("Next week:", dayjs().add(7, "day").format("DD MMM YYYY"));
console.log("Is before 2030?", dayjs().isBefore("2030-01-01"));