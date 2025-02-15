const prompt = require('prompt-sync')();

// by recursion
function factorial(n) {
    if(n == 0 || n == 1){
        return 1;
    }
    else{
        return n * factorial(n-1);
    }
}

// by reduce method
// function fact_reduce(n){
//     let arr = [];
//     for(let i = 1; i <= n; i++){
//         arr.push(i);
//     }
//     return arr.reduce((a, b) => a * b);
// }

function factreduce(number){
    let arr = Array.from(Array(number+1).keys());  //it will start the array from 0 to n
    //console.log(arr.slice(1,));
    // let c = arr.slice(1,).reduce((a, b) => {
    //     return a * b
    // });  //it will remove the 0 from the array
    //console.log(c);
    
    return arr.slice(1,).reduce((a, b) => a * b);
    
}


console.log("Enter the number to find the factorial: ");
let number = Number(prompt());
// console.log(number);
factreduce(number);
console.log(`The factorial of ${number} is ${factorial(number)}`);
console.log(`The factorial of ${number} is ${factreduce(number)}`);







