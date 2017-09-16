# 22 Follow Along Link Highliter 中文指南

> 本篇作者：©[大史快跑Dashrun](https://github.com/dashrun)——Chinasoft Frontend Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 22 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-09-12    
最后更新：2017-09-16

## 挑战任务
初始文档`index-start.html`提供了一组使用`<ul>`及`<li>`标签包裹的导航标签。本次的编程挑战任务是完成如下动画效果：当鼠标移动至某个对应标签上时，为标签添加一个白色的背景框，高亮表示该标签被选中，当鼠标移动至其他标签后，白色背景框不消失，而是直接跟随鼠标平移至新的标签，实现效果见下图展示。

## 实现效果
![结果展示](https://github.com/dashrun/vanilla-javascript-30/blob/master/22%20-%20Follow%20Along%20Link%20Highlighter/effects.gif)


## 相关知识
`Element.getBoundingClientRect()`   
Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。   
返回值是一个`DOMRect`对象，这个对象是由该元素的`getClientRects()`方法返回的一组矩形的集合, 即：是与该元素相关的CSS边框集合。`DOMRect` 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。   
DOMRect相关属性: 

Attribute | Type | Description
 --- | --- | ---
bottom | float | Y 轴，相对于视口原点（viewport origin）矩形盒子的底部。只读。 
height | float | 矩形盒子的高度（等同于 bottom 减 top）。只读。
left | float | X 轴，相对于视口原点（viewport origin）矩形盒子的左侧。只读。 
right | float | X 轴，相对于视口原点（viewport origin）矩形盒子的右侧。只读。 
top | float | Y 轴，相对于视口原点（viewport origin）矩形盒子的顶部。只读。
width | float | 矩形盒子的宽度（等同于 right 减 left）。只读。 
x | float | X轴横坐标，矩形盒子左边相对于视口原点（viewport origin）的距离。只读。 
y | float | Y轴纵坐标，矩形盒子顶部相对于视口原点（viewport origin）的距离。只读。

## 编程思路
1.生成一个绝对定位的块元素，在后续改变其`top`及`left`坐标值移动至对应标签处，来呈现不同标签被激活的效果;    
2.鼠标移动至`<li>`标签后，使用`Element.getBoundingClientRect()方法`获得该标签的位置信息;    
3.将获得的`<li>`的`top`及`left`值赋给绝对定位块元素，使其移动至被激活的标签，位于标签文字下方。   

## 过程指南
1.生成绝对定位块元素
```js
  var activeBackground = document.createElement('span');
  activeBackground.setAttribute('class','highlight');
  document.body.appendChild(activeBackground);

  //避免第一次激活时跳动,如果没有此句，可以看到第一次标签被激活时，块元素会从左上角移动至对应标签处。
  activeBackground.style.display = 'none';
```
2.使用`Element.getBoundingClientRect()方法`获得对应标签的位置信息
```js
 function lightOn(e){
    var activeLink = e.target.getBoundingClientRect();
    var coords = {
      height:activeLink.height,
      width:activeLink.width,
      left:window.pageXOffset + activeLink.left,
      top: window.pageYOffset + activeLink.top
    }
   activeBackground.style.height = `${coords.height}px`;
   activeBackground.style.width = `${coords.width}px`;
   activeBackground.style.left = `${coords.left}px`;
   activeBackground.style.top = `${coords.top}px`;
   activeBackground.style.display = 'inline';
}
```
3.将点亮函数与标签的鼠标移入事件绑定
```js
      //监听鼠标移入事件及鼠标移出事件
      for(var i = 0; i < len; i++){
        oLi[i].onmouseenter = lightOn;
      }
```


