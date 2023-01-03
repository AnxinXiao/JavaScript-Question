// function odd(n) {
//     if (n % 2 !== 0) {
//         return n
//     }
// }

// var arr = [2, 22, 3, 33, 6, 7, 8]
// console.log(arr.filter(res => odd(res))) //- [ 3, 33, 7 ]


const sayHello = function () {
    return function () {
        console.log("Hello!");
    }
}
const myFunc = sayHello()();
console.log(myFunc) //- Hello!