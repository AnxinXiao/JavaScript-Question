# Promise

一个promise是一个对象，它可能在未来的某个时候产生一个单一的值：可能是一个resolved 的值，或者rejected的原因（例如，发生了一个网络错误）。一个promise可以处于3种可能的状态之一：**Fulfilled**、**Rejected**或**Pending**。promise用户可以附加回调来处理已完成的值或拒绝的原因。

ES6带来了一个符合[`规范的Promise`](https://promisesaplus.com/)全局，一些非常重要的API被建立在新标准的Promise支持之上：特别是WHATWG Fetch规范和Async Functions标准

- **Fulfilled:** `onFulfilled()` 将被调用 (例如, `resolve()` 被调用)
- **Rejected:** `onRejected()` 将被调用 (例如, `reject()` 被调用)
- **Pending:** 尚未 fulfilled 或 rejected

## Promise A+ 规定：

1. 所有的异步场景，都可以看作是一个异步任务，每个异步任务，在JS中应该表现为一个**对象**，该对象称之为**Promise对象**，也叫做任务对象

![promise](C:\Users\$\Desktop\JavaScript Question\9.Promise\promise.png)

2. 每个任务对象，都应该有两个阶段、三个状态

![promise1](C:\Users\$\Desktop\JavaScript Question\9.Promise\promise1.png)

根据常理，它们之间存在以下逻辑：

- 任务总是从未决阶段变到已决阶段，无法逆行
- 任务总是从挂起状态变到完成或失败状态，无法逆行
- 时间不能倒流，历史不可改写，任务一旦完成或失败，状态就固定下来，永远无法改变

3. `挂起->完成`，称之为`resolve`；`挂起->失败`称之为`reject`。任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因。

   ![promise2](C:\Users\$\Desktop\JavaScript Question\9.Promise\promise2.png)

可以针对任务进行后续处理，针对完成状态的后续处理称之为onFulfilled，针对失败的后续处理称之为onRejected

![promise3](C:\Users\$\Desktop\JavaScript Question\9.Promise\promise3.png)

## Promise API

### 静态方法

[`Promise.all(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

这个方法返回一个新的 promise 对象，等到所有的 promise 对象都成功或有任意一个 promise 失败。

如果所有的 promise 都成功了，它会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。

一旦有任意一个 iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。

[`Promise.allSettled(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

等到所有 promise 都已敲定（每个 promise 都已兑现或已拒绝）。

返回一个 promise，该 promise 在所有 promise 都敲定后完成，并兑现一个对象数组，其中的对象对应每个 promise 的结果。

[`Promise.any(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

接收一个 promise 对象的集合，当其中的任意一个 promise 成功，就返回那个成功的 promise 的值。

[`Promise.race(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

等到任意一个 promise 的状态变为已敲定。

当 iterable 参数里的任意一个子 promise 成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应处理函数，并返回该 promise 对象。

[`Promise.reject(reason)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

返回一个状态为已拒绝的 `Promise` 对象，并将给定的失败信息传递给对应的处理函数。

[`Promise.resolve(value)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

返回一个状态由给定 value 决定的 `Promise` 对象。如果该值是 thenable（即，带有 `then` 方法的对象），返回的 Promise 对象的最终状态由 then 方法执行结果决定；否则，返回的 Promise 对象状态为已兑现，并且将该 value 传递给对应的 then 方法。

通常而言，如果你不知道一个值是否是 promise 对象，使用 [`Promise.resolve(value)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) 来返回一个 Promise 对象，这样就能将该 value 以 promise 对象形式使用。

### 实例方法

[`Promise.prototype.catch()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

为 promise 添加一个被拒绝状态的回调函数，并返回一个新的 promise，若回调函数被调用，则兑现其返回值，否则兑现原来的 promise 兑现的值。

[`Promise.prototype.then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

为 promise 添加被兑现和被拒绝状态的回调函数，其以回调函数的返回值兑现 promise。若不处理已兑现或者已拒绝状态（例如，`onFulfilled` 或 `onRejected` 不是一个函数），则返回 promise 被敲定时的值。

[`Promise.prototype.finally()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

为 promise 添加一个回调函数，并返回一个新的 promise。这个新的 promise 将在原 promise 被兑现时兑现。而传入的回调函数将在原 promise 被敲定（无论被兑现还是被拒绝）时被调用。

## 链式调用

![链式调用](C:\Users\$\Desktop\JavaScript Question\9.Promise\链式调用.png)

1. then方法必定会返回一个新的Promise

   可理解为`后续处理也是一个任务`

2. 新任务的状态取决于后续处理：

   - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据
   - 若有后续处理但还未执行，新任务挂起。
   - 若后续处理执行了，则根据后续处理的情况确定新任务的状态
     - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
     - 后续处理执行有错，新任务的状态为失败，数据为异常对象
     - 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致

由于链式任务的存在，异步代码拥有了更强的表达力

```js
// 常见任务处理代码

/*
 * 任务成功后，执行处理1，失败则执行处理2
 */
pro.then(处理1).catch(处理2)

/*
 * 任务成功后，依次执行处理1、处理2
 */
pro.then(处理1).then(处理2)

/*
 * 任务成功后，依次执行处理1、处理2，若任务失败或前面的处理有错，执行处理3
 */
pro.then(处理1).then(处理2).catch(处理3)
```

## async/await

### async

async关键字用于修饰函数，被它修饰的函数，一定返回Promise

```js
async function method1(){
  return 1; // 该函数的返回值是Promise完成后的数据
}

method1(); // Promise { 1 }

async function method2(){
  return Promise.resolve(1); // 若返回的是Promise，则method得到的Promise状态和其一致
}

method2(); // Promise { 1 }

async function method3(){
  throw new Error(1); // 若执行过程报错，则任务是rejected
}

method3(); // Promise { <rejected> Error(1) }
```

## await

`await`关键字表示等待某个Promise完成，**它必须用于`async`函数中**

```js
async function method(){
  const n = await Promise.resolve(1);
  console.log(n); // 1
}

// 上面的函数等同于
function method(){
  return new Promise((resolve, reject)=>{
    Promise.resolve(1).then(n=>{
      console.log(n);
      resolve(1)
    })
  })
}
```

`await`也可以等待其他数据

```js
async function method(){
  const n = await 1; // 等同于 await Promise.resolve(1)
}
```

如果需要针对失败的任务进行处理，可以使用`try-catch`语法

```js
async function method(){
  try{
    const n = await Promise.reject(123); // 这句代码将抛出异常
    console.log('成功', n)
  }
  catch(err){
    console.log('失败', err)
  }
}

method(); // 输出： 失败 123
```