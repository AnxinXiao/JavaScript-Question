# 高阶函数

> 高阶函数（Higher-order function）是至少满足下列一个条件的函数：
> 
> 接受一个或多个函数作为输入
> 
> 输出一个函数

JavaScript中的函数可以被当作参数传递给其他函数，可以作为另一个函数的返回值，还可以被赋值给一个变量。

JS中数组的.map()和.filter()的例子。它们都以一个函数作为参数。它们都是高阶函数。

示例一

```js
function odd(n) {
    if (n % 2 !== 0) {
        return n
    }
}

var arr = [2, 22, 3, 33, 6, 7, 8]
console.log(arr.filter(res => odd(res))) //- [ 3, 33, 7 ]
```

示例二

```js
const sayHello = function () {
    return function () {
        console.log("Hello!");
    }
}
const myFunc = sayHello()();
console.log(myFunc) //- Hello!
```

