# 01 JavaScript Drum Kit 中文指南

> 作者：©[未枝丫](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 1 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

## 实现效果

模拟一个打鼓的页面。用户在键盘上按下 ASDFGHJKL 这几个键时，页面上与字母对应的按钮变大变亮，对应的鼓点声音响起来。

[看在线效果](http://soyaine.github.io/JavaScript30/01%20-%20JavaScript%20Drum%20Kit/index-SOYAINE.html)

## 关键要点

1. 键盘事件
2. 播放声音
3. 改变样式


## 步骤分解

1. **添加键盘事件监听**。在 window 上添加键盘 `keydown` 事件。
2. **对应事件处理程序。**
    1. **获取键码**
    2. **用 `querySelector` 获取元素**
    3. **获取 `data-key` 为对应键码的元素**
    4. **处理元素**。播放音频、添加样式。
3. **为所有的 `div.key` 添加 `transitionened` 事件**。
    1. **获取所有样式为 `key` 的元素**
    2. **为其添加事件监听**
4. **去除样式的事件处理程序**

## 基础语法

### 一些 ES6 语法

1.  ``const`` ：声明一个只读的常量，标识符的值只能赋值一次。

2.  \`字符串 ${ 变量、属性名 } \`：模板字面量（Template literals）中用于表示模板字符串的标识。特点是字符串首尾用反引号（\`），内部的模板部分用 ${ } 括起来表示，具体请看[MDN文档]( https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)。简单例子如下：

    ````javascript
          var a = 1;
          var b = 2;
          //不用模板的写法
          console.log("三是" + (a + b) + "不是" + (2 * a + b)); //"三是3不是4"
          //使用模板字符串的写法
          console.log(`三是${a + b}不是${2 * a + b}`); //"三是3不是4"
    ````

### ``forEach`` 与箭头函数

使用 ``document.querySelector`` 获取一组符合 CSS 选择符的元素快照，类型为 NodeList（此对象是对于文档的实时运行的动态查询），对其进行遍历时可采用 ``forEach`` 方法。

```javascript
// Code from http://es6-features.org/#StatementBodies

// ES6
nums.forEach(v => {
	if (v % 5 === 0)
		fives.push(v);
})

// ES5
nums.forEach(function (v) {
	if (v % 5 === 0)
		five.push(v);
})
```


## 解决难点

### 如何将键盘按键与页面按钮对应起来？

连接的帮手是 ``keydown`` 事件中的 `keyCode` 属性，`keyCode` 属性的值和 ASCII 编码值相同（对应小写字母）。在[这个网站]( http://keycode.info/ )可以用按键盘来查看对应的键码。

我们能获取到的初始页面中，按钮 `div` 和音频 `audio` 标签中都添加了一个属性 `data-key` 用于存储对应的键码，这样做的目的是，添加键盘事件监听后，触发键盘事件时即可获取事件的 `keyCode` 属性值，以此为线索，操作对应的按钮及音频。

````javascript
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
````

### 如何保证按键被按住不放时，可以马上响起连续鼓点声？

每次播放音频之前，设置播放时间戳为 0：

````javascript
var audio = document.getElementById("video"); 
audio.currentTime = 0;
audio.play();
````

### 如何使页面按钮恢复原状？

利用一个叫 [`transitionened`](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend) 的事件，它在 CSS transition 结束后会被触发。我们就可以利用这个事件，在每次打鼓的效果（尺寸变大、颜色变化）完成之后，去除相应样式。

在这个页面中，发生 `transition` 的样式属性不止一个（`box-shadow`, `transform`, `border-color`），所以需要添加一个判断语句，使每发生一次按键事件时，只去除一次样式。

````javascript
funciton remove(event) {
  if (event.propertyName !== 'border-left-color') return;
  this.classList.remove('playing');
  // event.target.classList.remove('playing');
}
````
