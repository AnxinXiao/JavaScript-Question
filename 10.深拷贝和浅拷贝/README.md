# JavaScript 中的浅拷贝和深拷贝是什么？

JavaScript 是一种高级、动态类型的客户端脚本语言。JavaScript 向静态 HTML 页面添加功能。与大多数其他编程语言一样，JavaScript 允许支持深拷贝和浅拷贝的概念。 

**浅拷贝：**当使用赋值运算符将引用变量复制到新的引用变量时，将创建引用对象的浅拷贝。简单来说，一个引用变量主要存储它引用的对象的地址。当一个新的引用变量被赋予旧引用变量的值时，存储在旧引用变量中的地址被复制到新变量中。这意味着新旧引用变量都指向内存中的同一个对象。因此，如果对象的状态通过任何引用变量发生变化，那么这两个变量都会反映出来。让我们举个例子来更好地理解它。

```js
var person1 = {
    color:'yellow',
    size:'big'
}

var person2 = person1

person1.color = 'black'

console.log(person1===person2) //- true
```

**说明：**从上面的例子可以看出，修改person1的颜色时，也反映给person2对象。这会导致数据不一致。这称为浅拷贝。新创建的对象与旧对象具有相同的内存地址。因此，对其中任何一个所做的任何更改都会更改两者的属性。如果其中一个从内存中删除，另一个将不复存在。在某种程度上，这两个对象是相互依赖的。

**深拷贝：与浅拷贝不同，深拷贝**复制旧对象的所有成员，为新对象分配单独的内存位置，然后将复制的成员分配给新对象。这样，两个对象彼此独立，并且在对任何一个对象进行任何修改的情况下，另一个对象都不会受到影响。此外，如果其中一个对象被删除，另一个对象仍保留在内存中。现在要在 JavaScript 中创建对象的深层副本，我们使用 JSON.parse() 和 JSON.stringify() 方法。让我们举个例子来更好地理解它。

```js
var nickname = {
    name: "Jack",
}
var newNickName= JSON.parse(JSON.stringify(nickname));
console.log(nickname); //-{name: "Jack"}
console.log( newNickName); //-{name: "Jack"}
newNickName.name = "Beck";
console.log(nickname); //-{name: "Jack"}
console.log(newNickName); //-{name: "Beck"}
```

**说明：**此处新对象是使用 JavaScript 的 JSON.parse() 和 JSON.stringify() 方法创建的。JSON.stringify() 将 JavaScript 对象作为参数，然后将其转换为 JSON 字符串。此 JSON 字符串被传递给 JSON.parse() 方法，然后该方法将其转换为 JavaScript 对象。当对象很小并且具有可序列化的属性时，此方法很有用。但如果对象非常大并且包含某些不可序列化的属性，则存在数据丢失的风险。特别是如果对象包含方法，那么 JSON.stringify() 将失败，因为方法是不可序列化的。

## 浅拷贝方法



### **1. 直接赋值**

**上述首个例子即为浅拷贝**



### **2. *Object.assign* 方法**

该方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。

```js
var stu = {
    name: 'mark'
}
var stu2 = Object.assign(stu, { age: 18 }, { gender: 'male' })
console.log(stu2); // { name: 'mark', age: 18, gender: 'male' }
```

在上面的代码中，我们有一个对象 *stu*，然后使用 *Object.assign* 方法将后面两个对象的属性值分配到 *stu* 目标对象上面。

通过这个方法，我们就可以实现一个对象的拷贝。例如：

```js
const stu = {
    name: 'mark',
    age: 18
}
const stu2 = Object.assign({}, stu)
stu2.name = 'zhangsan';
console.log(stu); // { name: 'mark', age: 18 }
console.log(stu2); // { name: 'zhangsan', age: 18 }
```

在上面的代码中，我们使用 *Object.assign* 方法来对 *stu* 方法进行拷贝，并且可以看到修改拷贝后对象的值，并没有影响原来的对象，这仿佛实现了一个深拷贝。

然而，*Object.assign* 方法事实上是一个浅拷贝。

当对象的属性值对应的是一个对象时，该方法拷贝的是对象的属性的引用，而不是对象本身。

例如：

```js
const stu = {
    name: 'mark',
    age: 18,
    stuInfo: {
        No: 1,
        score: 100
    }
}
const stu2 = Object.assign({}, stu)
stu2.name = 'zhangsan';
stu2.stuInfo.score = 90;
console.log(stu); // { name: 'mark', age: 18, stuInfo: { No: 1, score: 90 } }
console.log(stu2); // { name: 'zhangsan', age: 18, stuInfo: { No: 1, score: 90 } }
```

### **3. *ES6* 扩展运算符**

首先我们还是来回顾一下 *ES6* 扩展运算符的基本用法。

ES6 扩展运算符可以将数组表达式或者 *string* 在语法层面展开，还可以在构造字面量对象时，将对象表达式按 *key-value* 的方式展开。

例如：

```js
var arr = [1, 2, 3];
var arr2 = [3, 5, 8, 1, ...arr]; // 展开数组
console.log(arr2); // [3, 5, 8, 1, 1, 2, 3]

var stu = {
    name: 'mark',
    age: 18
}
var stu2 = { ...stu, score: 100 }; // 展开对象
console.log(stu2); // { name: 'mark', age: 18, score: 100 }
```

接下来我们来使用扩展运算符来实现对象的拷贝，如下：

```js
var arr = [1, 2, 3];
var arr2 = [3, 5, 8, 1, ...arr]; // 展开数组
const stu = {
    name: 'mark',
    age: 18
}
const stu2 = {...stu}
stu2.name = 'zhangsan';
console.log(stu); // { name: 'mark', age: 18 }
console.log(stu2); // { name: 'zhangsan', age: 18 }
```

但是和 *Object.assign* 方法一样，如果对象中某个属性对应的值为引用类型，那么直接拷贝的是引用地址。如下：

```js
const stu = {
    name: 'mark',
    age: 18,
    stuInfo: {
        No: 1,
        score: 100
    }
}
const stu2 = {...stu}
stu2.name = 'zhangsan';
stu2.stuInfo.score = 90;
console.log(stu); // { name: 'mark', age: 18, stuInfo: { No: 1, score: 90 } }
console.log(stu2); // { name: 'zhangsan', age: 18, stuInfo: { No: 1, score: 90 } }
```

## **4. 数组的 *slice* 和 *concat* 方法**

在 *javascript* 中，数组也是一种对象，所以也会涉及到深浅拷贝的问题。

在 *Array* 中的 [`slice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)和 [`concat`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) 方法，不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。

例如：

```js
// slice 拷贝数组
var arr1 = [1, true, 'Hello'];
var arr2 = arr1.slice();
console.log(arr1); // [ 1, true, 'Hello' ]
console.log(arr2); // [ 1, true, 'Hello' ]

arr2[0] = 2;
console.log(arr1); // [ 1, true, 'Hello' ]
console.log(arr2); // [ 2, true, 'Hello' ]
```



```js
// concat 拷贝数组
var arr1 = [1, true, 'Hello'];
var arr2 = arr1.concat();
console.log(arr1); // [ 1, true, 'Hello' ]
console.log(arr2); // [ 1, true, 'Hello' ]

arr2[0] = 2;
console.log(arr1); // [ 1, true, 'Hello' ]
console.log(arr2); // [ 2, true, 'Hello' ]
```

但是，这两个方法仍然是浅拷贝。如果一旦涉及到数组里面的元素是引用类型，那么这两个方法是直接拷贝的引用地址。如下：

```js
// concat 拷贝数组
var arr1 = [1, true, 'Hello', { name: 'mark', age: 18 }];
var arr2 = arr1.concat();
console.log(arr1); // [ 1, true, 'Hello', { name: 'mark', age: 18 } ]
console.log(arr2); // [ 1, true, 'Hello', { name: 'mark', age: 18 } ]

arr2[0] = 2;
arr2[3].age = 19;
console.log(arr1); // [ 1, true, 'Hello', { name: 'mark', age: 19 } ]
console.log(arr2); // [ 2, true, 'Hello', { name: 'mark', age: 19 } ]
```

```js
// concat 拷贝数组
var arr1 = [1, true, 'Hello', { name: 'mark', age: 18 }];
var arr2 = arr1.slice();
console.log(arr1); // [ 1, true, 'Hello', { name: 'mark', age: 18 } ]
console.log(arr2); // [ 1, true, 'Hello', { name: 'mark', age: 18 } ]

arr2[0] = 2;
arr2[3].age = 19;
console.log(arr1); // [ 1, true, 'Hello', { name: 'mark', age: 19 } ]
console.log(arr2); // [ 2, true, 'Hello', { name: 'mark', age: 19 } ]
```

## 深拷贝方法

说完了浅拷贝，接下来我们来看如何实现深拷贝。

总结一下，大致有如下的方式。

## **1. *JSON.parse(JSON.stringify)***

这是一个广为流传的深拷贝方式，用 *JSON.stringify* 将对象转成 *JSON* 字符串，再用 *JSON.parse* 方法把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。

本章第二个例子就是讲的这个

这种方式看似能够解决问题，但是这种方法也有一个缺点，那就是不能处理函数。

这是因为 *JSON.stringify* 方法是将一个 *javascript* 值（对象或者数组）转换为一个 *JSON* 字符串，而 *JSON* 字符串是不能够接受函数的。同样，正则对象也一样，在 *JSON.parse* 解析时会发生错误。

例如：

```js
const stu = {
    name: 'mark',
    age: 18,
    stuInfo: {
        No: 1,
        score: 100,
        saySth: function () {
            console.log('我是一个学生');
        }
    }
}
const stu2 = JSON.parse(JSON.stringify(stu));
stu2.name = 'zhangsan';
stu2.stuInfo.score = 90;
console.log(stu); // { name: 'mark', age: 18, stuInfo: { No: 1, score: 100, saySth: [Function: saySth] }}
console.log(stu2); // { name: 'zhangsan', age: 18, stuInfo: { No: 1, score: 90 } }
```

可以看到，在原对象中有方法，拷贝之后，新对象中没有方法了。

## **2. 手写递归方法**

最终，还是只有靠我们自己手写递归方法来实现深拷贝。

示例如下：

```js
function deepClone(target) {
    var result;
    // 判断是否是对象类型
    if (typeof target === 'object') {
        // 判断是否是数组类型
        if (Array.isArray(target)) {
            result = []; // 如果是数组,创建一个空数组
            // 遍历数组的键
            for (var i in target) {
                // 递归调用
                result.push(deepClone(target[i]))
            }
        } else if (target === null) {
            // 再判断是否是 null
            // 如果是，直接等于 null
            result = null;
        } else if (target.constructor === RegExp) {
            // 判断是否是正则对象
            // 如果是,直接赋值拷贝
            result = target;
        } else if (target.constructor === Date) {
            // 判断是否是日期对象
            // 如果是,直接赋值拷贝
            result = target;
        } else {
            // 则是对象
            // 创建一个空对象
            result = {};
            // 遍历该对象的每一个键
            for (var i in target) {
                // 递归调用
                result[i] = deepClone(target[i]);
            }
        }
    } else {
        // 表示不是对象类型，则是简单数据类型  直接赋值
        result = target;
    }
    // 返回结果
    return result;
}
```

在上面的代码中，我们封装了一个名为 *deepClone* 的方法，在该方法中，通过递归调用的形式来深度拷贝一个对象。

下面是 *2* 段测试代码：

```js
// 测试1
const stu = {
    name: 'mark',
    age: 18,
    stuInfo: {
        No: 1,
        score: 100,
        saySth: function () {
            console.log('我是一个学生');
        }
    }
}
const stu2 = deepClone(stu)
stu2.name = 'zhangsan';
stu2.stuInfo.score = 90;
console.log(stu); // { name: 'mark', age: 18, stuInfo: { No: 1, score: 100, saySth: [Function: saySth] }}
console.log(stu2); // { name: 'mark', age: 18, stuInfo: { No: 1, score: 90, saySth: [Function: saySth] }}
```

```js
// 测试2
var arr1 = [1, true, 'Hello', { name: 'xiejie', age: 18 }];
var arr2 = deepClone(arr1)
console.log(arr1); // [ 1, true, 'Hello', { name: 'xiejie', age: 18 } ]
console.log(arr2); // [ 1, true, 'Hello', { name: 'xiejie', age: 18 } ]

arr2[0] = 2;
arr2[3].age = 19;
console.log(arr1); // [ 1, true, 'Hello', { name: 'xiejie', age: 18 } ]
console.log(arr2); // [ 2, true, 'Hello', { name: 'xiejie', age: 19 } ]
```

