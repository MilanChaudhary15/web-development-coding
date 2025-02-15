console.log("Hey Mialn");   //this is for display output

var a = 5;  //var is global scope(means if we assign var in any block then it cannot define locally, it define globally)
// a = a + 1
let b = 6;      //let is block scope element(means if we assign let in any block then it define locally, it cannot define globally)
let c = "Harry";
let _a = "Shubham";
// var 55a = "Rohan"; // Not Allowed

// console.log(a +  b + 8);
// console.log(typeof a, typeof b, typeof c);
{
    // let a = 66;
    console.log(a)
}
console.log(a)
const a1 = 6; // const is a fix element which cannot be changed in future 
// a1 = a1 + 1; // Not Allowed because a1 is constant


let x = "Harry bhai";
let y = 22;
let z = 3.55;
const p = true;
let q = undefined;
let r = null;

console.log(x, y, z, p, q, r)
console.log(typeof x, typeof y, typeof z, typeof p, typeof q, typeof r)


let o = {   //object is a collection of key value pair
    name: "Harry",
    "job code": 5600,   //if we use the key with space then we use the key in double quotes
    "is_handsome": true  
}   

console.log(o);
o.salary = "100crores";
console.log(o);
o.salary = "500crores";
console.log(o);

