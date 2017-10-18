# 26 Strip Follow Along Nav 中文指南

> 本篇作者：©[大史快跑Dashrun](https://github.com/dashrun)——Chinasoft Frontend Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 26 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-10-16   
最后更新：2017-10-17

## 挑战任务
初始文档`index-start.html`中提供了一组导航按钮，本次的编程任务需要实现的效果是当鼠标悬停于导航按钮时，显示对应下拉菜单的内容。（说明：下拉菜单内容及白色背景已写好，只需要根据需要改变其CSS属性使元素显示出来或改变其位置即可）。

## 实现效果
![结果展示](https://github.com/dashrun/vanilla-javascript-30/blob/master/26%20-%20Strip%20Follow%20Along%20Nav/effect.png)

## 编程思路  
监听每一个导航栏按钮绑定鼠标移入和移出的事件，在对应的回调函数中为相应的元素增加已经编写好的类名即可。

## 过程指南   
1.监听每一个导航栏按钮的鼠标移入移出事件
```js
var mainUl = document.querySelectorAll('.cool > li >a');
var navArr = Array.from(mainUl);
var bg = document.querySelector('.dropdownBackground');

navArr.map(function(item,index){
  item.onmouseover = function (){
        item.parentNode.classList.add('trigger-enter');
        item.parentNode.classList.add('trigger-enter-active');
        toggleBackground(index+1);
  }

  item.onmouseout = function (){
      item.parentNode.classList.remove('trigger-enter');
      item.parentNode.classList.remove('trigger-enter-active');
      toggleBackground();
  }
});
```
2.toggleBackground()函数为自定义函数，当传入整数参数时，根据对应的下拉菜单序号获取下拉菜单的尺寸，将绝对定位的白色背景衬底改编为对应大小，并移动至相应位置；当不传入任何参数时，表示鼠标没有悬停于任何按钮上，此时需要将下拉菜单的背景置为透明。        
```js
function toggleBackground(item){
    var itemPos;
    if(item === 1 || item === 2 || item ===3){
      //计算位置
    itemPos = document.querySelector('.dropdown'+item).getBoundingClientRect();
      bg.style.left = `${itemPos.left}px`;
      bg.style.top = `${itemPos.top-60}px`;
      bg.classList.add('open');
      bg.style.width = `${itemPos.width}px`;
      bg.style.height = `${itemPos.height}px`;
    }else{
      bg.style.height = 0;
      bg.style.width = 0;
      bg.classList.remove('open');
    }
}
```
  
## 延伸思考  
1.本例中将相应的样式编写在一个css类中，通过添加和移出类来实现需要的效果，js编程实践中非常推荐这种将DOM操作集中化的做法。      
2.除了使用js脚本来实现交互效果外，也可以使用下面的css来实现鼠标悬浮在按钮上时显示下拉菜单的效果（代码中`~`表示同级的元素,由于`index-start.html`中给定的结构中下拉菜单的白色沉底为独立元素，需要动态获取其对应尺寸，故使用js脚本更容易实现）   
```css
 .cool>li>a:hover ~.dropdown{
    display:block;
    opacity:1;
 }
```
