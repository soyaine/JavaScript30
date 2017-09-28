# 25 Event Related 中文指南

> 本篇作者：©[大史快跑Dashrun](https://github.com/dashrun)——Chinasoft Frontend Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 25 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-09-28   
最后更新：2017-09-28

## 挑战任务
初始文档`index-start.html`提供了3个尺寸不一的`<div>`元素，本次挑战是一次学习任务，主要了解学习DOM的事件机制，包括事件捕获，事件冒泡，单次触发等。

## 结果展示
![结果展示](https://github.com/dashrun/vanilla-javascript-30/blob/master/25%20-%20Event%20Related/effects.png)

## 相关知识
[addEventListener文档](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

## 过程指南   
1.如下设置时，当点击某个`div`时，自该`div`起以及其外层的`div`也将监听到点击事件，且点击事件只触发一次，当once参数值为false时，点击事件可多次触发。   
```js
      divs.forEach(div => div.addEventListener('click', logText, {
            once: true,
            capture: false
        }));
```   
2.将`capture`参数设置为`true`后，运行程序后点击内层`div`可以看到，事件的触发顺序为由外向内，即在事件捕获阶段监听到事件。   
```js
         one.addEventListener('click', logText1, {
               capture: true
         });
        two.addEventListener('click', logText2, {
          capture: true
         });
        three.addEventListener('click', logText3, {
           capture: true
       });

        function logText1(e) {
            console.log(this.classList.value);
            // e.stopPropagation();
        }

        function logText2(e) {
            console.log(this.classList.value);
             e.stopPropagation();
        }

        function logText3(e) {
            console.log(this.classList.value);
            //e.stopPropagation();
        }
```   
3.在事件回调函数中调用`e.stopPropagation()`方法后，即可看到在该处监听到事件后不再继续传递事件、

## 延伸知识   
由于事件冒泡机制的存在，实际应用中常在父元素来监听众多同类子元素的点击事件，如在`<ul>`元素上监听多个`<li>`元素的点击事件，任何一个`<li>`元素被点击后，父元素都会监听到点击事件，更常用的方法是jQuery中的事件委托机制，感兴趣的小伙伴可以自行了解。



