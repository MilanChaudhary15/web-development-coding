let a = [5,6,7,8,9 , 1,2,3,4]
const b = [1,2,3,4,5,6,7,8,9]

console.log(typeof a); 
console.log(typeof b); 

//for each loop 
a.forEach((element) => {
    console.log(element);
});
console.log("************");

a.forEach(function(element) {
    console.log(element);
});


//we can also use any one of the following(value , index , array)
// a.forEach((value , index , array) => {
//     console.log(value , index , array);
// })

console.log("************");
console.log("************");
console.log("************");
console.log("************");

//map function
//it creates a new array with the results of calling a provided function on every element in the calling array
// it performs a operation on each element of the array and returns the new array

const c = a.map((element) => {  //we can also include the following(value , index , array)
    return element * 2;
});
console.log(c);

const d = a.map(function(element){
    return element * 2;
})
console.log(d);

console.log();
console.log();

//filter function
//it creates a new array with all elements that pass the test implemented by the provided function
//it create a new array of the elements which satisfy the condition(here we give cond )

const e = a.filter((element) => {
    return element > 5;    
})
console.log(e);

const f = a.filter(function(element){
    return element > 5;
})
console.log(f);

console.log();
console.log();

//reduce function
//it reduces the array to a single value
//means it perform the operation on the array and returns the single value

const h = a.reduce((accumulator , element) => {
    return accumulator += element;
});
console.log(h);

const g = a.reduce(function(a , ele){
    return a += ele;
})
console.log(g);
console.log();
console.log();

//Array from
//it creates a new, shallow-copied Array instance from an array-like or iterable object.
//it creates a new array from the given array or object
const i = Array.from("saurabh");
console.log(i);