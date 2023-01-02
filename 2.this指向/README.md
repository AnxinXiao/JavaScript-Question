## this 指向

1. 如果在调用函数时使用了`new`关键字，那么函数内部的`this`对象就是一个由JavaScript引擎创建的新对象。

```js
function ConstructorExample() {
    console.log(this) // ConstructorExample {}
    this.value = 1;
    console.log(this) // ConstructorExample { value: 1 }
}
new ConstructorExample();
```



2. 如果`apply`、`call`或`bind`被用来调用一个函数，那么函数内部的`this`是作为参数传入的对象。

```js
function fn() {
    console.log(this);
}

var obj = {
    value: 5
};

var boundFn = fn.bind(obj);

console.log(boundFn())// -> { value: 5 }
console.log(fn.call(obj)); // -> { value: 5 }
console.log(fn.apply(obj)); // -> { value: 5 }
```



3. 如果一个函数作为方法被调用--也就是说，如果使用`.`符号来调用函数--`.`前面的对象就是该函数的`this`指向

```js
const obj = {
    value: 5,
    printThis: function () {
        console.log(this);
    }
};

obj.printThis(); // -> { value: 5, printThis: [Function: printThis] }
```



4. 如果一个函数是作为自由函数调用的，意味着它是在没有上述任何条件的情况下被调用的，这就是全局对象。在浏览器/node环境中，this是window/global。

```js
function test() {
    console.log(this) // browser --> window / node --> global
}
console.log(test())
```

5.  如果上述多个规则都适用，则排名较高的规则获胜，并将设置此值。

```js
const obj = {
    value: 'hi',
    printThis: function () {
        console.log(this);
    }
};

const print = obj.printThis;
obj.printThis(); // -> { value: 'hi', printThis: [Function: printThis] }
print(); // -> Object [global] {global: [Circular *1] ...},
```

`obj.printThis()`属于规则3--使用`.`符号的调用。另一方面，`print()`属于规则4，是一个自由函数的调用。对于`print()`，我们在调用它时没有使用`new`、`bind`/`call`/`apply`或`.`符号，所以我们归入规则4，这就是全局对象`window`/`global`。

这又回到了值与引用的问题上。对象上`printThis`的值是对该函数的引用。当我们把`obj.printThis`赋值给print时，print收到了该函数的引用。它没有以任何方式与obj绑定--obj只是碰巧有它的一个引用。



当我们在没有obj的情况下调用它时，它是一个FFI。实际上是（.）的使用使规则3适用。



当多条规则适用时，列表中排名靠前的规则获胜。如果规则2和3都适用，规则2优先

```js
const obj1 = {
    value: 'hi',
    print: function () {
        console.log(this);
    },
};

const obj2 = { value: 18 };

obj1.print.call(obj2); // -> { value: 18 }
```



如果规则1和3都适用，规则1优先。

```js
const obj1 = {
    value: 'hi',
    print: function () {
        console.log(this);
    },
};

new obj1.print(); // -> print {}
```

最后一个小细节，箭头函数的this是词法作用域，即一开始已绑定，为定义函数的对象。

