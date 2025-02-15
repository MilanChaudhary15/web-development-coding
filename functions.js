function fun(name){
    console.log("Hii" ,name , "Welcome to the javascript!");
    console.log("Hii " ,name , " whats up");
    console.log("Hii " +name + "why are you here");
    console.log("Hii " +name + " ok thanks alot");
    console.log("Hii " +name + " Welcome to the javascript!");
}

function add(a,b , c = 1){
    return a+b + c;
}

const func1 = (x) => {
    console.log("i am a arrow function " , x);
}

func1(4);

result = add(4,5,6);
console.log(result);

result = add(4,5);
console.log(result);


fun("Amit");