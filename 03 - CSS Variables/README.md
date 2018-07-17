# 03 CSS Variable

> 作者：©[未枝丫](https://github.com/soyaine)   
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 3 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

## 实现效果

![实现 by Soyaine](https://cl.ly/2Z1x1N0M2u2D/Screen%20recording%202016-12-22%20at%2002.03.35%20PM.gif)
若加载不出来，[请看链接。](https://cl.ly/2Z1x1N0M2u2D/Screen%20recording%202016-12-22%20at%2002.03.35%20PM.gif)

用 JavaScript 和 CSS3 实现拖动滑块时，实时调整图片的内边距、模糊度、背景颜色，同时标题中 JS 两字的颜色也随图片背景颜色而变化。

## 涉及特性

- [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)
- `var(--xxx)`：CSS 变量（[CSS Variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)）
- `filter: blur()`
- 事件 `change`、`mousemove`

## 过程指南

### CSS 部分准备

1. 声明全局（`:root`）的 CSS 变量
2. 将变量应用到页面中对应元素 `<img>` 
3. 处理标题的 CSS 值

### JS 实时更新 CSS 值
1. 获取页面中 `input` 元素
2. 给每个 `input` 添加监听事件，使其在值变动，触发更新操作
3. 同 2 ，添加鼠标滑过时的事件监听
4. 编写处理更新操作的方法
	1.  获取参数值后缀
	- 获取参数名（blur、spacing、color）
	- 获取参数值（12px、#efefef）
	- 赋值给对应的 CSS 变量

## 基础知识

1. NodeList 和 Array 的区别

	可以打开 __proto__ 查看它的方法，其中有 `forEach()`、`item()`、`keys()` 等。而 Array 的 prototype 中有 `map()`、`pop()` 等数组才有的方法。
	
3. HTML5 中的自定义数据属性 `dataset`

	HTML5 中可以为元素添加非标准的自定义属性，只需要加上 `data-` 前缀，可以随便添加和命名。添加之后，可以通过元素的 `dataset` 属性来访问这些值，`dataset` 的值是 DOMStringMap 的一个实例化对象，其中包含之前所设定的自定义属性的“名-值”对。
	
4. [CSS variable](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)

	这是一个 CSS3 的新特性，[IE 和 Edge 目前都还不支持](http://caniuse.com/#feat=css-variables)。命名写法是 `--变量名`，在引用这个变量时写法是 `var(--变量名)`。具体实例见下一条代码。
	
5. `:root` 伪类

	这个伪元素匹配的是文档的根元素，也就是 `<html>` 标签。
	
	所以常用于声明全局的 CSS 变量：
	
	```css
	:root {
	  --color: #fff;
	}
	```
	
	在使用时：
	
	```css
	img {
	  background: var(--base);
	}
	```
	
5. CSS 滤镜 [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)

	CSS 的滤镜提供了一些图形特效，比如高斯模糊、锐化、变色等。它带有一些预设的函数，在使用时加上参数调用这些函数即可。[在 Chrome、Firefox 中都支持。](http://caniuse.com/#search=filter)

## 解决难点

1. **如何处理参数值（一个有 px 、另一个没有）**

	运用 `dataset` 储存后缀，有 px 后缀的标签中设置 `<input data-sizing: px>`：
	
	```html
	<input type="range" name="blur" min="0" max="25" value="10" data-sizing="px">
    <input type="color" name="base" value="#8aa8af">
	```
	
	JS 中通过 `dataset.sizing` 来获取后缀值：

	```javascript
	const suffix = this.dataset.sizing || ''; 
	```
	
	此时 suffix 获取到的值，针对颜色为空，而针对长度类的则为 'px'。
	
2. 	**如何用 JavaScript 改变 CSS 属性值？**

	在 JavaScript 中 `document.documentElement` 即代表文档根元素。所以要改变全局的 CSS 变量，可以这样写：
	
	```js
	document.documentElement.style.setProperty('--base', '#fff');
	```