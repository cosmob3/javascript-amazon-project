import { formatCurrency } from "../scripts/utils/money.js";

console.log("Test Suite: formatCurrency");

// TESTING - give tests a name/identifier
//2 types of tests:
// 1. basic test cases
// 2. Edge cases

console.log("Converting cents to dollars...");

// 1. basic test cases
if (formatCurrency(2095) === "20.95") {
  console.log("Test passed: formatCurrency(2095) returns '20.95'");
} else {
  console.log("Test failed: formatCurrency(2095) does not return '20.95'");
}

console.log("Works with 0");
// 2. Edge cases
if (formatCurrency(0) === "0.00") {
  console.log("Test passed");
} else {
  console.log("Test failed");
}

console.log("Rounds up to the nearest cent");
if (formatCurrency(2000.5) === "20.01") {
  console.log("Test passed");
} else {
  console.log("Test failed");
}

if (formatCurrency(2000.4) === "20.00") {
  console.log("Test passed");
} else {
  console.log("Test failed");
}
