# 什么是 "严格使用"；？使用它的优点和缺点是什么？

如果你在代码（或函数）的顶部加上 "use strict";，那么JS将以严格模式进行评估。严格模式会抛出更多的错误，并禁用一些功能，以使你的代码更加可读和准确。

## 优点

严格模式在几个方面有帮助。

它可以捕捉到一些常见的编码错误，抛出异常。

当采取相对 "不安全 "的行动时（如获得对全局对象的访问），它可以防止或抛出错误。
它禁用那些令人困惑或考虑不周的功能。

## 缺点

我比较难找到为什么人们不喜欢严格模式。我发现最好的解释是当代码混合了严格和 "正常 "模式时。如果一个开发者使用了一个严格模式的库，但这个开发者习惯于在正常模式下工作，他们可能会在库上调用一些动作，而这些动作不会像预期的那样工作。更糟糕的是，由于开发者是在正常模式下，他们没有被抛出额外错误的优势，所以错误可能会无声地失败。

另外，如上所述，严格模式阻止你做某些事情。人们一般认为，你首先不应该使用那些东西，但有些开发者不喜欢这种约束，想使用语言的所有功能。

## 例子

```js
// 整个脚本都开启严格模式的语法
"use strict";
var v = "Hi!  I'm a strict mode script!";
```

```js
function strict() {
  // 函数级别严格模式语法
  'use strict';
  function nested() {
    return "And so am I!";
  }
  return "Hi!  I'm a strict mode function!  " + nested();
}

function notStrict() {
  return "I'm not strict.";
}
```

具体可见：

MDN:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode

沅一峰网道：https://wangdoc.com/javascript/oop/strict