# Ajax

[AJAX](https://zh.wikipedia.org/wiki/AJAX)，网页程序设计的一种技术。

- [Ajax framework](https://zh.wikipedia.org/w/index.php?title=Ajax_framework&action=edit&redlink=1)，AJAX 技术的一种架构。
- [AJAX Development Platforms](https://zh.wikipedia.org/w/index.php?title=AJAX_Development_Platforms&action=edit&redlink=1)，AJAX的开发平台。
- [AjaxWindows](https://zh.wikipedia.org/w/index.php?title=AjaxWindows&action=edit&redlink=1)，以网站为基础的操作系统。
- [AjaxLibraries](https://zh.wikipedia.org/w/index.php?title=AjaxLibraries&action=edit&redlink=1)，开发 AJAX 应用程序的库。

以上来自维基百科（为补充内容）

---

> Ajax就是浏览器赋予 JS 的一套 API,通过 API 能够使 JS 具备网络通信的能力

无论是`XHR`（XMLHttpRequest）还是`Fetch`，它们都是实现Ajax的技术手段，只是 API 不同

## XHR

```js
const xhr = new XMLHttpRequest(); //- 创建发送请求对象
xhr.onreadystatechange = function () {
    //- 当请求状态发生改变时运行的函数
    //- xhr.readyState: 一个数字，用于判断请求到了哪个阶段
    //- 0，刚刚创建好了请求对象，但还未配置请求（未调用open方法）
    //- 1，open方法已被调用
    //- 2，send方法已被调用
    //- 3，正在接收服务器的响应消息体
    //- 4，服务器响应的所有内容均已接收完毕

    //- xhr.responseText: 获取服务器响应的消息体文本
    //- xhr.getResponseHeader("Content-Type") 获取响应头 Content-type
}

xhr.setRequestHeader("Content-Type", "application/json") //- 设置请求头
xhr.open("请求方法", "url地址"); //- 配置请求
xhr.send("请求体内容"); //- 构建请求体，发送到服务器，如果没有请求体，传递null
```
具体使用可见MDN:https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
## Fetch

```js
const resp = await fetch('url地址', {
    //- 请求配置对象，可省略，省略则所有配置为默认值
    method: '请求方法', //- 默认 GET
    headers: {
        //- 请求头配置
        'Content-Type': 'application/json',
        'love': 'you'
    },
    body: '请求体内容' //- 请求体
}) //- fetch 会发送一个Promise，，会在接收完响应头后变为fulfilled

resp.headers; //- 获取响应头对象
resp.status; //- 获取响应状态码,例如 200
resp.statusText; //- 获取响应状态码文本，例如 ok
resp.json(); //- 用 json格式解析即将接收到的响应体，返回 Promise ，解析完成后得到一个对象
resp.text(); //- 用纯文本格式解析即将到来的响应体，返回 Promise，解析完成后得到一个字符串
```

具体可参见 https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html 详细了解 Fetch API