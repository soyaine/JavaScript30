# 06 Fetch 结合 filter 实现快速匹配古诗

> 作者：©[缉熙Soyaine](https://github.com/soyaine)   
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 6 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

## 实现效果

![仿即时搜索诗句效果](https://cl.ly/0b360y270s0f/Screen%20recording%202016-12-31%20at%2010.05.23%20PM.gif)

在输入框中输入一个词，迅速匹配，展示含有这个词的诗句，诗句的来源 json 数据是加载页面时从网络中异步获得。（原课程中选的内容是英文城市名，我将其换成了唐诗，地址可在我的页面中获取）

初始文档中提供了 HTML 和 CSS，我们需要补全 JS 代码。这个挑战是 Ajax 的预热练习，在异步方面用到了一些目前还未被完全支持的新特性，但很好用。

## 涉及特性

- `promise`
	- `fetch()`
	- `then()`
	- `json()`
- Array
	- `filter()`
	- `push()`
	- `join()`
- `RegExp`
	- `match()`
	- `replace()`
	
## 过程指南

1. 声明一个空数组，用于存放解析 json 后的数据
2. 运用 `fetch()` 获取 json 文件
	1. 获取 json 响应
	2. 解析数据
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

Fetch API 提供一个全局的方法 `fetch()`，这个方法（至少）需要接受 `资源的路径` 作为参数，返回值是一个 Promise 对象。若请求成功，这个对象包含了 Request 对应的 Response，但这只是一个 HTTP 相应。

语法如下：

```js
fetch(input, init).then(function(response) { ... });
```

#### 

在这个挑战的示例中，使用此方法的截图如下：

![fetch(url).then()](https://cl.ly/3P3F1F2y1510/Image%202017-01-01%20at%206.58.45%20PM.png)






> 10:45 - 