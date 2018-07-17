# 06 Fetch 结合 filter 实现快速匹配古诗

> 作者：©[未枝丫](https://github.com/soyaine)   
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 6 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

## 实现效果

![仿即时搜索诗句效果](https://cl.ly/0b360y270s0f/Screen%20recording%202016-12-31%20at%2010.05.23%20PM.gif)

在输入框中输入一个词，迅速匹配，展示含有这个词的诗句，诗句的来源 json 数据是加载页面时从网络中异步获得。[在线效果请查看。](http://soyaine.cn/JavaScript30/06%20-%20Type%20Ahead/index-SOYAINE.html)

初始文档中提供了 HTML 和 CSS，我们需要补全 JS 代码。这个挑战是 Ajax 的预热练习，在异步方面用到了一些目前还未被完全支持的新特性，但很好用。

原文档中选的内容是英文城市名，我将其换成了唐诗，构造了一个含有 70 多首唐诗的 JSON 数据，访问地址是 [https://gist.githubusercontent.com/soyaine/81399bb2b24ca1bb5313e1985533c640/raw/bdf7df2cbcf70706c4a5e51a7dfb8c933ed78878/TangPoetry.json](https://gist.githubusercontent.com/soyaine/81399bb2b24ca1bb5313e1985533c640/raw/bdf7df2cbcf70706c4a5e51a7dfb8c933ed78878/TangPoetry.json)，请自由取用。

## 涉及特性

- Promise
	- `fetch()`
	- `then()`
	- `json()`
- Array
	- `filter()`
	- `map()`
	- `push()`
	- `join()`
	- Spread syntax 扩展语句
- RegExp
	- `match()`
	- `replace()`
	
## 过程指南

1. 声明一个空数组，用于存放解析 json 后的数据
2. 运用 `fetch()` 发送 HTTP 请求
	1. 获取返回的 Promise 对象
	2. 解析 JSON 数据
	3. 存入数组
3. 获取两个主要 HTML 元素（`<input>`，`<ul>`），给 `<input>` 添加事件监听（`change`, `keyup`）
4. 编写匹配输入的函数
	1. 运用 `filter()` 过滤数组数据
	2. 创建正则表达式，构造过滤条件
5. 编写展示匹配结果的函数
	1. 获取匹配数据
	2. 替换关键词放入高亮的标签
	3. 构造 HTML 标签数据
	4. 将匹配值的 HTML 标签放入 `<ul>` 中

## 相关知识

### [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

Fetch API 这个新特性，是 XMLHttpRequest 获取资源新的替代方案，目前还是一个实验中的功能，截至到 2017.01.01 在 MDN 显示的支持情况是：Chrome 42.0、Firefox (Gecko) 39、Opera 29、Chrome for Android 42.0、Android Webview。如何使用可以看[这篇文章](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)。

####  [fetch()](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch)

Fetch API 提供一个全局的方法 `fetch()`，这个方法（至少）需要接受 `资源的路径` 作为参数，返回值是一个 Promise 对象。若请求成功，这个对象包含了（对应 Request 的）Response，但这只是一个 HTTP 响应。

语法如下：

```js
fetch(input, init).then(function(response) { ... });
```

MDN 中有个[发送基本的 fetch 请求的示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#发起_fetch_请求)如下：

```js
    var myImage = document.querySelector('img');
    
    fetch('flowers.jpg')
    .then(function(response) {
      return response.blob();
    })
    .then(function(myBlob) {
      var objectURL = URL.createObjectURL(myBlob);
      myImage.src = objectURL;
    });
```

用 ES6 的语法来写就是这样：

```js
    const myImage = document.querySelector('img');
    
    fetch('flowers.jpg')
    .then(response => response.blob())
	.then(myBlob => {
		const objectURL = URL.createObjectURL(myBlob);
		myImage.src = objectURL;
	});
```

这个示例中使用了 `blob()` 方法来获取图片的内容，这是 Body 类定义的一个方法，除此之外还有可以获取其他内容的方法，可以[在这里看](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#Body)，也可以在 Console 面板中查看： 

![Body 类的方法](https://cl.ly/143N2R1b3T1o/Image%202017-01-03%20at%209.15.37%20AM.png)

在这个挑战中，我们主要是利用 `.json()`，以使用 JSON 对象来读取 Response 流中的数据，读取之后，Body 的 body.Uesd 属性值会变为已读。另外较为常用的方法还有：`blob()`、`text()`、`arrayBuffer()`、`formData()`。

### [ES6 中的数组扩展语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

利用扩展运算符可以[替代 ES5 中的 `push` 方法添加一个数组到另一个数组末尾](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator#更好的_push_方法)，两种语法的写法如下：

```js
// 将arr2中的所有元素添加到arr1中

// ES5
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
```

### 此挑战中如何异步获取数据并解析

这一部分用到的语句很简单，但都用了 ES6 的语法，所以不熟悉 ES6 的话需要时间适应一下。

````js
    const endpoint = 'https://raw.githubusercontent.com/soyaine/FE-Practice/f438d3bdf099461f88322b1b1f20c9d58f66f1ec/TangPoetryCut.json';
    const  poetrys = [];
    fetch(endpoint)
		.then(blob => blob.json())
		.then(data => poetrys.push(...data));
````

如果把每条语句分解开来运行，得到的返回结果可以看下面的截图。

![fetch(url).then()](https://cl.ly/3P3F1F2y1510/Image%202017-01-01%20at%206.58.45%20PM.png)

### 正则表达式

获取到了数据之后，如何匹配输入值呢？就要利用正则表达式了。正则表达式的 `match()` 可以执行一个匹配操作，我们再结合 `Array.filter()` 便能筛出整个数组中，满足条件的项，再经过字符串处理即可输出到页面。

> 这篇我写了很久也写不满意，如果你能读到这里，说明你对实现的效果有兴趣，如果你觉得有什么地方我写得不清楚，或者我遗漏了什么，请告诉我。我一直在思考和调整，用什么样的方式去写会比较容易看懂，万分期待和感恩能有读者反馈 soyaine1@gmail。    


> 创建时间：2016-12-31     
> 最后更新：2017-01-03