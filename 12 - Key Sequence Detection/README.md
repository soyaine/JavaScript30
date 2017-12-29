# 12 键盘输入序列的验证指南

> 作者：©[未枝丫](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 12 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-02-27    
最后更新：2017-07-18

## 实现效果

初始文档里仅仅提供了一个 `script` 标签，供我们从 [Cornify.com](https://www.cornify.com/) 加载一个 JS 文件，调用其中的 `cornify_add()` 方法时，会在页面中追加 `p` 标签，并在 DOM 中插入一个图标。Cornify 的具体效果可以到官网首页去体验。

而这个挑战要实现的效果是，当在此页面完整输入了“暗号”（一串事先定义好的字符串）时，生成新的 Cornify 特效。

## 解决思路

1. 指定可激发特效的字符串
2. 监听并获取输入的字符
3. 处理输入，在符合条件时，调用 cornify

## 过程指南

1. 声明一个空数组，用于存放的输入字符，同时声明“暗号”

	````js
	const pressed = [],
		  secretCode = 'helloworld'
	````

2. 添加键盘的 `keyup` 事件监听，用箭头函数的参数来接收事件。注意此处的 `keyup` 事件是针对页面的，所以在调试时单击页面后时焦点在页面中才生效，在 Console 面板中是不会触发的。
	```js
	 window.addEventListener('keyup', (e) => { })
	```

3. 验证输入的字符。此处方法是将每一个输入的字符存入 `pressed` 数组，然后处理数组，使其呈现队列的性质，也就是输入一个字符时，会挤出原有的的字符，保证其最大长度始终为 `secretCode` 的长度。这样做的目的是为了便于验证暗号，只有完整无误的输入一次暗号时，才会触发相应的效果。当然这只是其中一种处理办法，也还有其他办法。
	```js
    window.addEventListener('keyup', (e) => {
	  console.log(e.key);
	  pressed.push(e.key);
	  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length); //截取数组
	  if (pressed.join('').includes(secretCode)) { //判断是否符合暗号
		console.log('DING DING!');
		cornify_add();
    }
    ```

Bingo，输入暗号后触发特效的页面也就完成了，你可以自由在代码里设置需要的暗号。