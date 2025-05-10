const crypto = require("crypto");

const args = process.argv.slice(2); 

const operation = args[0];
const num1 = parseFloat(args[1]);
const num2 = parseFloat(args[2]);

function calculate(op, a, b) {
  switch (op) {
    case "add":
      console.log("Result:", a + b);
      break;

    case "sub":
      console.log("Result:", a - b);
      break;

    case "mult":
      console.log("Result:", a * b);
      break;

    case "divide":
      if (b === 0) {
        console.log("Error: Division by zero!");
      } else {
        console.log("Result:", a / b);
      }
      break;

    case "sin":
      console.log("Result:", Math.sin(a));
      break;

    case "cos":
      console.log("Result:", Math.cos(a));
      break;

    case "tan":
      console.log("Result:", Math.tan(a));
      break;

    case "random":
      if (!args[1]) {
        console.log("Provide length for random number generation.");
      } else {
        const length = parseInt(args[1]);
        const random = crypto.randomBytes(length).toString("hex"); 
        console.log("Random Number:", random);
      }
      break;

    default:
      console.log("Invalid operation");
  }
}

calculate(operation, num1, num2);
