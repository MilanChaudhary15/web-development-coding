const prompt = require("prompt-sync")();

function Calculator() {
    console.log("Welcome to the calculator!");
    const operation = prompt("Please enter the operation you want to perform: add:0, multiply:1, subtract:2 or divide:3 ");
    const num1 = Number(prompt("Please enter the first number:"));
    const num2 = Number(prompt("Please enter the second number:"));

    if (operation == 0) {
        return (num1 + num2);
    } else if (operation == 1) {
        return (num1 * num2);
    } else if (operation == 2) {
        return (num1 - num2);
    } else if (operation == 3) {
        return (num1 / num2);
    } else {
        return "Invalid operation!";
    }
}

function faultyCalculator() {
    console.log("Welcome to the calculator!");
    const operation = prompt("Please enter the operation you want to perform: add:0, multiply:1, subtract:2 or divide:3 ");
    const num1 = Number(prompt("Please enter the first number:"));
    const num2 = Number(prompt("Please enter the second number:"));

    if (operation == 0) {
        return (num1 - num2);
    } else if (operation == 1) {
        return (num1 - num2);
    } else if (operation == 2) {
        return (num1 / num2);
    } else if (operation == 3) {
        return (num1 ** num2);
    } else {
        return "Invalid operation!";
    }
}   



let b = Math.floor(Math.random() * 100) + 1;
console.log(b);

let a;

if(b > 10){
    a = Calculator();
}

else{
    a = faultyCalculator();
}

console.log(a);


// console.log("Welcome to the calculator!");
// let user = prompt("Please enter the operation you want to perform: add, multiply, subtract or divide");
// var num1 = Number(prompt("Please enter the first number:"));
// var num2 = Number(prompt("Please enter the second number:"));



