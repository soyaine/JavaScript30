# 15 LocalStorage

> 作者：©[缉熙Soyaine](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 15 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-07-24    
最后更新：2017-07-27

## 实现效果
## 知识点
## 过程指南

默认情况下，在表单空间拥有焦点时按下 Enter 键或者点击提交按钮，会提交表单，提交时浏览器会在将请求发送给服务器之前触发 submit 事件，可以先添加事件监听后看看效果：
```js
function addItem(e) {
  console.log('hello');
}

addItems.addEventListener('submit', addItem);
```
结果就是 Console 中闪现 hello 后刷新整个页面，这是 submit 的默认行为，在当前的场景中不适用，先去除。
```js
function addItem(e) {
  e.preventDefault();
}
```


this 获取当前 form，是从 submit 事件获取到的。

this.querySelector('[name=item]'); 获取其中的输入框

this.reset(); 
以清空 input 中正在输入的值