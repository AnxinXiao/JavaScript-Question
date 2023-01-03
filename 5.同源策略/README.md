# 同源策略

**同源策略**是指在Web浏览器中，允许某个网页脚本访问另一个网页的数据，但前提是这两个网页必须有相同的URI、主机名和端口号，一旦两个网站满足上述条件，这两个网站就被认定为具有相同来源。此策略可防止某个网页上的恶意脚本通过该页面的文档对象模型访问另一网页上的敏感数据。

同源策略对Web应用程序具有特殊意义，因为Web应用程序广泛依赖于HTTP cookie[1]来维持用户会话，所以必须将不相关网站严格分隔，以防止丢失数据泄露。

值得注意的是同源策略仅适用于脚本，这意味着某网站可以通过相应的HTML标签[2]访问不同来源网站上的图像、CSS和动态加载脚本等资源。而跨站请求伪造就是利用同源策略不适用于HTML标签的缺陷。

下表列出哪些[URL](https://zh.wikipedia.org/wiki/统一资源定位符)与[URL](https://zh.wikipedia.org/wiki/统一资源定位符) **http://www.example.com/dir/page.html** 属于相同来源：

| URL                                                          | 结果 | 原因                                                         |
| ------------------------------------------------------------ | ---- | ------------------------------------------------------------ |
| **http://www.example.com**/dir/page2.html                    | 是   | 只有[路径](https://zh.wikipedia.org/wiki/路径_(计算机科学))不同 |
| **http://www.example.com**/dir2/other.html                   | 是   | 只有[路径](https://zh.wikipedia.org/wiki/路径_(计算机科学))不同 |
| **http://**username:password@**www.example.com**/dir2/other.html | 是   | 只有[路径](https://zh.wikipedia.org/wiki/路径_(计算机科学))不同 |
| http://www.example.com:**81**/dir/other.html                 | 否   | 不同端口（若未标明，http:// 默认端口号为80）                 |
| **https**://www.example.com/dir/other.html[[失效链接](https://zh.wikipedia.org/wiki/Wikipedia:失效链接)] | 否   | 不同[协议](https://zh.wikipedia.org/wiki/网络传输协议)（[https](https://zh.wikipedia.org/wiki/Https)和[http](https://zh.wikipedia.org/wiki/Http)） |
| http://**en.example.com**/dir/other.html                     | 否   | 不同[域名](https://zh.wikipedia.org/wiki/域名)               |
| http://**example.com**/dir/other.html                        | 否   | http://**example.com**/dir/other.html                        |
| http://**v2.www.example.com**/dir/other.html                 | 否   | http://**v2.www.example.com**/dir/other.html                 |

最后总结一下：同源策略可防止 JavaScript 发起跨域请求。源被定义为 URI、主机名和端口号的组合。此策略可防止页面上的恶意脚本通过该页面的文档对象模型，访问另一个网页上的敏感数据。