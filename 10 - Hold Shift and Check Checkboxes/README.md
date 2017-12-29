# 10 JS 实现 Checkbox 中按住 Shift 的多选功能

> 作者：©[未枝丫](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 10 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-01-07    
最后更新：2017-01-07

## 实现效果

![shift 多选效果示例](https://cl.ly/3l2V0I2P0Q0x/Screen%20recording%202017-01-08%20at%2012.03.42%20AM.gif)

初始文档中提供了一组 `checkbox` 类型的 `input` 元素，选中某个复选框时，其 `<p>` 标签中的文字会显示删除线。最终效果是，提供按下 Shift 键后进行多选操作的功能。 [在线体验请点这里](https://soyaine.github.io/JavaScript30/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index-SOYAINE.html)。

## 过程指南

1. 获取所有的 `<input>` 元素，并添加事件监听

	```js
	const boxs = document.querySelectorAll('.inbox input[type="checkbox"]');
	boxs.forEach(box => box.addEventListener('click', handleCheck));
	```
	
2. 编写 handleCheck 内部的处理逻辑（细节请看下一部分）

## 解决思路

在谈具体的代码时，先讲讲思路。首先来复现一下，当你按下 Shift 键进行多选时，发生了什么？

1. 选中 A 项
2. 按下 Shift
3. 再选中 B 项
4. A-B 之间的所有项都被选中

关键点就在于 A、B 划出了一个范围，在这个范围之内的元素状态发生了改变。A 是上一次操作选中的对象，B 是此次操作对象，之后的内容将会用这两个单词来叙述。下面的方案就依据划定范围的方法不同来进行区分。

### 方法一

Wes Bos 在文档里提供了一种解决办法：用一个变量，来标记这个范围。

变量初始值为 `false`，当按下 Shift 键且同时选中了某个元素的时候，遍历所有项，遍历过程中，若遇到 A 或 B，则将标记值取反。同时，将所有标记为 `true` 的项设置为选中。

```js
let lastChecked;

//	处理方法一：用变量 inBetween 对需要选中的元素进行标记
function handleCheck0(e) {
	let inBetween = false;
	if(e.shiftKey && this.checked){
		boxs.forEach(input => {
			console.log(input);
			if(input === lastChecked || input ===this) {
				inBetween = !inBetween;
			}
			if(inBetween) {
				console.log("on");
				input.checked = true;
			}
	});
	}
	lastChecked = this;
}
```

> 延伸思考    

上面会出现一个问题，初次加载页面时，按住 Shift 再点击某一项，此项之后的元素都会被选中。此外，对于取消选中，无法批量操作。所以我参照了 Stack Overflow 的一个答案： [How can I shift-select multiple checkboxes like GMail?](http://stackoverflow.com/a/659571/6820726) 改进得到第二种解决方案。

### 方法二

方法一中的 `inBetween` 仅仅表示此项是否在被选中的范围中，此处会赋给它更多的意义，用它来表示此项是选中还是未选中，而范围划定则由数组来解决。

首先将获取到的 `<input>` 组转化为数组，针对每次操作，获取 A 和 B，利用 `indexOf()` 来获得 A 和 B 在数组中的索引值，由此即可确定范围，并能通过 `slice()` 来直接截取 A-B 的所有 DOM 元素，并进行状态改变的操作，而变量 `onOff` 表示 A-B 范围内的状态，`true` 表示选中，`false` 表示取消选中。

1. 转换 Nodelist 为数组  

	````js
	const boxs = document.querySelectorAll('.inbox input[type="checkbox"]');
	const boxArr = Array.from(boxs);
	````
	
2. 针对按下了 Shift 键的情况，获取 A-B 范围  

	````js
	let start = boxArr.indexOf(this);
	let end = boxArr.indexOf(lastChecked);
	````
	
3. 截取该范围内的数组元素，并改变选中状态  

	```js
	boxArr.slice(Math.min(start, end), Math.max(start, end) + 1)
					   .forEach(input => input.checked = onOff);
	```
	
4. 确定选中 or 取消选中    

	````js
	onOff = lastChecked.checked ? true : false;
	````
	
5. 标记 A 值    
 
	````js
	if(!lastChecked) lastChecked = this;
	/* ... */
	lastChecked = this;
	````
	
注意，以上几点是按点抽出的分块代码，整合起来的解决办法如下：

```js
const boxArr = Array.from(boxs);
let lastChecked;
let onOff = false;

// 处理方法二：利用数组索引获取需要选中的范围
function handleCheck1(e) {
	if(!lastChecked) lastChecked = this;
	onOff = lastChecked.checked ? true : false;
	if(e.shiftKey) {
		let start = boxArr.indexOf(this);
		let end = boxArr.indexOf(lastChecked);
		boxArr.slice(Math.min(start, end), Math.max(start, end) + 1)
		           .forEach(input => input.checked = onOff);
		console.log(start + "+" + end);
	}
	lastChecked = this;
}
```

这样一来，挑战 10 就完！成！啦！恭喜走完了 1/3 的路程\(^o^)/~