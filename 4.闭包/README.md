# 闭包

闭包**在 JavaScript 中经常用于**对象数据私有、事件处理程序和回调函数，以及[部分应用程序、柯里](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x)化和其他函数式编程模式。

## 什么是闭包？

闭包是将一个函数与对其周围状态（词法环境）的引用捆绑在一起（封闭）的组合。换句话说，闭包让你可以从一个内部函数访问外部函数的作用域。在JavaScript中，闭包是在每次创建函数时创建的，在函数创建时要使用闭包，需要在另一个函数中定义一个函数并将其公开。要暴露一个函数，就把它返回或传递给另一个函数。

内层函数可以访问外层函数作用域内的变量，即在外层函数返回之后。

## 使用闭包（示例）

在其他方面，闭包通常被用来赋予对象数据私有。数据私有是一个基本属性，它可以帮助我们根据接口而不是实现进行编程。这是一个重要的概念，可以帮助我们建立更强大的软件，因为实现细节比接口契约更有可能发生破坏性的变化。

在JavaScript中，闭包是用来实现数据私有的主要机制。当你使用闭包进行数据保密时，封闭的变量只在包含（外部）函数的范围内。除非通过对象的特权方法，否则你无法从外部范围获得数据。在JavaScript中，任何定义在闭包范围内的暴露方法都是有特权的。比如说。

```js
function init() {
  var name = "Mozilla"; // name 是一个被 init 创建的局部变量
  function displayName() { // displayName() 是内部函数，一个闭包
      alert(name); // 使用了父函数中声明的变量
  }
  displayName();
}
init();
```

其实要理解 *JavaScript* 中的闭包，非常容易，但是在此之前你需要先知道以下两个知识点：

- *JavaScript* 中的作用域和作用域链
- *JavaScript* 中的垃圾回收

这里我们来简单回顾一下这两个知识点：

**1. \*JavaScript\* 中的作用域和作用域链**

- 作用域就是一个独立的地盘，让变量不会外泄、暴露出去，不同作用域下同名变量不会有冲突。
- 作用域在定义时就确定，并且不会改变。
- 如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。

**2. \*JavaScript\* 中的垃圾回收**

- *Javascript* 执行环境会负责管理代码执行过程中使用的内存，其中就涉及到一个垃圾回收机制
- 垃圾收集器会定期（周期性）找出那些不再继续使用的变量，只要该变量不再使用了，就会被垃圾收集器回收，然后释放其内存。如果该变量还在使用，那么就不会被回收。

> 闭包不是一个具体的技术，而是一种现象，是指在定义函数时，周围环境中的信息可以在函数中使用。换句话说，执行函数时，只要在函数中使用了外部的数据，就创建了闭包。
>
> 而作用域链，正是实现闭包的手段。

```js
var i = 1;
function a(){
    var b = 2;
    var c = 3;
    function d(){
        var e = 4;
        var f = 5;
        function g(){
            console.log(i,b,c,e,f); //- 1,2,3,4,5
        }
        g();
    }
    d();
}
a();
```

上面代码中，函数 g 中一个变量都没有创建，却要打印出，i,b,c,e,f，这些变量分别存在于函数 a,b ，以及全局作用域中，因此创建了三个闭包，全局闭包存储了 i，闭包 a 存储了 b,c，闭包 d 存储l变量 e,f。

话说，如此多闭包，岂不是占用内存空间么？

实际上，自动形成的闭包，会被销毁。例如：

![test](C:\Users\$\Desktop\JavaScript Question\4.闭包\test.png)

上述代码中那个，在最后尝试打印变量 b，显然此时已无闭包，垃圾回收器会自动回收没有引用的变量，不会有任何内存占用的情况。

当然有时候我们需要手动制造闭包

接下来看以下例子：

```js
function eat(){
    var food = "鸡翅";
    console.log(food);
}
eat(); // 鸡翅
console.log(food); // 报错
```

在上面的例子中，我们声明了一个名为 *eat* 的函数，并对它进行调用。

*JavaScript* 引擎会创建一个 *eat* 函数的执行上下文，其中声明 *food* 变量并赋值。

当该方法执行完后，上下文被销毁，*food* 变量也会跟着消失。这是因为 *food* 变量属于 *eat* 函数的局部变量，它作用于 *eat* 函数中，会随着 *eat* 的执行上下文创建而创建，销毁而销毁。所以当我们再次打印 *food* 变量时，就会报错，告诉我们该变量不存在。

但是我们将此代码稍作修改：

```javascript
function eat(){
    var food = '鸡翅';
    return function(){
        console.log(food);
    }
}
var look = eat();
look(); // 鸡翅
look(); // 鸡翅
```

在这个例子中，*eat* 函数返回一个函数，并在这个内部函数中访问 *food* 这个局部变量。调用 *eat* 函数并将结果赋给 *look* 变量，这个 *look* 指向了 *eat* 函数中的内部函数，然后调用它，最终输出 *food* 的值。

为什么能访问到 *food*，原因很简单，上面我们说过，垃圾回收器只会回收没有被引用到的变量，但是一旦一个变量还被引用着的，垃圾回收器就不会回收此变量。在上面的示例中，照理说 *eat* 调用完毕 *food* 就应该被销毁掉，但是我们向外部返回了 *eat* 内部的匿名函数，而这个匿名函数有引用了 *food*，所以垃圾回收器是不会对其进行回收的，这也是为什么在外面调用这个匿名函数时，仍然能够打印出 *food* 变量的值。

至此，闭包的一个优点或者特点也就体现出来了，那就是：

- 通过闭包可以让外部环境访问到函数内部的局部变量。
- 通过闭包可以让局部变量持续保存下来，不随着它的上下文环境一起销毁。

通过此特性，我们可以解决一个全局变量污染的问题。早期在 *JavaScript* 还无法进行模块化的时候，在多人协作时，如果定义过多的全局变量 有可能造成全局变量命名冲突，使用闭包来解决功能对变量的调用将变量写到一个独立的空间里面，从而能够一定程度上解决全局变量污染的问题。

例如：

```javascript
var name = "GlobalName";
// 全局变量
var init = (function () {
    var name = "initName";
    function callName() {
        console.log(name);
        // 打印 name
    }
    return function () {
        callName();
        // 形成接口
    }
}());
init(); // initName
var initSuper = (function () {
    var name = "initSuperName";
    function callName() {
        console.log(name);
        // 打印 name
    }
    return function () {
        callName();
        // 形成接口
    }
}());
initSuper(); // initSuperName
```

好了，在此小节的最后，我们来对闭包做一个小小的总结：

- 闭包是一个封闭的空间，里面存储了在其他地方会引用到的该作用域的值，在 *JavaScript* 中是通过作用域链来实现的闭包。
- 只要在函数中使用了外部的数据，就创建了闭包，这种情况下所创建的闭包，我们在编码时是不需要去关心的。
- 我们还可以通过一些手段手动创建闭包，从而让外部环境访问到函数内部的局部变量，让局部变量持续保存下来，不随着它的上下文环境一起销毁。

## 闭包经典问题

```js
for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log(i); //- 4，4，4
    }, 1000);
}
```

在上面的代码中，我们预期的结果是过 *1* 秒后分别输出 *i* 变量的值为 *1，2，3*。但是，执行的结果是：*4，4，4*。

实际上，问题就出在闭包身上。你看，循环中的 *setTimeout* 访问了它的外部变量 *i*，形成闭包。

而 *i* 变量只有 *1* 个，所以循环 *3* 次的 *setTimeout* 中都访问的是同一个变量。循环到第 *4* 次，*i* 变量增加到 *4*，不满足循环条件，循环结束，代码执行完后上下文结束。但是，那 *3* 个 *setTimeout* 等 *1* 秒钟后才执行，由于闭包的原因，所以它们仍然能访问到变量 *i*，不过此时 *i* 变量值已经是 *4* 了。

要解决这个问题，我们可以让 *setTimeout* 中的匿名函数不再访问外部变量，而是访问自己内部的变量，如下：

```js
for (var i = 1; i <= 3; i++) {
    (function (index) {
        setTimeout(function () {
            console.log(index); //- 1，2，3
        }, 1000);
    })(i)
}
```

这样 *setTimeout* 中就可以不用访问 *for* 循环声明的变量 *i* 了。而是采用调用函数传参的方式把变量 *i* 的值传给了 *setTimeout*，这样它们就不再创建闭包，因为在我自己的作用域里面能够找到 *i* 这个变量。

当然，解决这个问题还有个更简单的方法，就是使用 *ES6* 中的 *let* 关键字。

它声明的变量有块作用域，如果将它放在循环中，那么每次循环都会有一个新的变量 *i*，这样即使有闭包也没问题，因为每个闭包保存的都是不同的 *i* 变量，那么刚才的问题也就迎刃而解。

```js
for (let i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
```

最后，总结一下，闭包是什么？闭包的应用场景有哪些？怎么销毁闭包？

> 闭包是一个封闭的空间，里面存储了在其他地方会引用到的该作用域的值，在 *JavaScript* 中是通过作用域链来实现的闭包。
>
> 只要在函数中使用了外部的数据，就创建了闭包，这种情况下所创建的闭包，我们在编码时是不需要去关心的。
>
> 我们还可以通过一些手段手动创建闭包，从而让外部环境访问到函数内部的局部变量，让局部变量持续保存下来，不随着它的上下文环境一起销毁。
>
> 使用闭包可以解决一个全局变量污染的问题。
>
> 如果是自动产生的闭包，我们无需操心闭包的销毁，而如果是手动创建的闭包，可以把被引用的变量设置为 *null*，即手动清除变量，这样下次 *JavaScript* 垃圾回收器在进行垃圾回收时，发现此变量已经没有任何引用了，就会把设为 *null* 的量给回收了。