const sum = require("./sum");
const multiply = require("./multiplication");
const subtract = require("./subtraction");
const divide = require("./division");

const [,, operation, arg1, arg2] = process.argv;
const a = parseFloat(arg1);
const b = parseFloat(arg2);

switch (operation) {
    case "sum":
        console.log("Sum:", sum(a, b));
        break;
    case "multiply":
        console.log("Multiplication:", multiply(a, b));
        break;
    case "subtract":
        console.log("Subtraction:", subtract(a, b));
        break;
    case "divide":
        console.log("Division:", divide(a, b));
        break;
    default:
        console.log("Unknown operation. Use sum, multiply, subtract, or divide.");
}
