# 27 Click And Drag 中文指南

> 本篇作者：©[大史快跑Dashrun](https://github.com/dashrun)——Chinasoft Frontend Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 27 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-10-24   
最后更新：2017-10-229

## 挑战任务
初始文档`index-start.html`中提供了一组条幅，本次的编程任务需要实现的效果是当鼠标拖动画面移动时，条幅同步向水平方向移动。

## 实现效果
![结果展示](https://github.com/dashrun/vanilla-javascript-30/blob/master/27%20-%20Click%20and%20Drag/effect.png)

## 编程思路  
在最外层的items元素上监听鼠标的按下，移动，弹起事件并编写相应的回调函数即可，在对应的回调函数中获取到鼠标横向滑动的距离，将该距离值翻倍后赋值予条幅的scrollLeft属性可调整元素在水平方向上滚动的位置。   
>style.css中已为条幅编写好active类，当鼠标移动时只需要将此类添加给对应的类即可看到很棒的CSS特效。

## 过程指南   
1.在条幅容器上监听鼠标按下事件   
```js
  const slider = document.querySelector(".items");
  let isMouseDown = false;//记录鼠标是否按下
  let startX;//按下时位置的x坐标
  let scrollLeft;//记录视口相对于items最左侧已经滚过的距离

  slider.addEventListener('mousedown',(e) =>{
      isMouseDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;//记录鼠标按下时的相对位置
      scrollLeft = slider.scrollLeft;
  });
 ```   
2.在条幅容器上监听鼠标弹起事件   
```js
   slider.addEventListener('mouseup',(e) =>{
      isMouseDown = false; 
      slider.classList.remove('active');
  });
```
3.在条幅容器上监听鼠标移动事件   
```js
  slider.addEventListener('mousemove',(e) =>{
     if (!isMouseDown) {
          return;
      }//若鼠标未按下，则不进行操作
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //将鼠标移动距离放大后作为条幅的移动距离
    slider.scrollLeft = scrollLeft - walk;
  });

```
  
## 延伸思考  
本例中的js部分并不复杂，令人感兴趣的是`style.css`样式部分使用了较多CSS3高级用法，使得元素在滚动过程中呈现出透视效果，笔者在此对CSS的实现方法作以简单说明，感兴趣的小伙伴可以自行查找资料深入学习。   
除去颜色部分，`active`类中的动态效果其实只用到了3行代码:   
```css
/*透视距离，即视点位于垂直距离屏幕的距离，数值越大，离的越远，变形效果看起来越微小*/
.items{perspective: 500px;}
/*所有奇数序号的子元素沿X轴放大，并绕Y轴旋转（相当于人绕柱子转）*/
.item:nth-child(even) { transform: scaleX(1.31) rotateY(40deg); }
/*所有奇数序号的子元素沿X轴放大，并绕Y轴逆向旋转（相当于人绕柱子反转一定角度）*/
.item:nth-child(odd) { transform: scaleX(1.31) rotateY(-40deg); }
```   
