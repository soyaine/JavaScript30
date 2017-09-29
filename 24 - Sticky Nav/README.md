# 24 Sticky Nav 中文指南

> 本篇作者：©[大史快跑Dashrun](https://github.com/dashrun)——Chinasoft Frontend Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 24 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-09-24   
最后更新：2017-09-27

## 挑战任务
初始文档`index-start.html`提供了一篇仿博客文章的HTML文件布局，包括标题栏，导航以及正文部分，本次的编程挑战任务为：编写代码，使得当页面向下滚动至标题栏从可视区消失时，将导航栏固定在页面顶部，并显示页面LOGO（初始文档中已提供）以便后续导航；当页面向上滚动至标题栏重新出现在可视区域时，导航栏恢复初始设置。

## 实现效果
![结果展示](https://github.com/dashrun/vanilla-javascript-30/blob/master/24%20-%20Sticky%20Nav/effects.gif)

## 编程思路
通过为指定元素设置`position:fixed`样式即可将其固定至页面指定位置。代码编写中配合监听页面滚动事件，判断页面的当前滚动位置，动态切换指定元素的`position`属性即可。

## 过程指南    
> html页面中在导航栏提供了LOGO标签，初始最大宽度被设置为0而隐藏，固定导航栏时可同时修改LOGO标签的max-width属性，将其显示出来   

1.获取导航栏相对于整个文档的位置，将其记录为切换点   
```js
  var oNav = document.getElementById('main');
  var changePoint = oNav.offsetTop;
```   
2.编写动态改变导航栏样式的函数
```js   

  function adjustNav(){
    //当滚动距离超过切换点时为导航栏添加类，CSS中后写的样式会覆盖先书写的样式
    if(window.scrollY >= changePoint){
        oNav.className = 'fixed-nav';
        oLogo.style['max-width'] = '200px';
    }else{
        //当滚动距离小于切换点时，恢复导航栏的定位样式
        oNav.className = '';
        oLogo.style['max-width'] = '0';
    }
  }
```   
3.将调整函数绑定至窗口滚动事件
```js
  window.addEventListener('scroll',adjustNav);
```   
## 延伸思考
页面内锚点滚动也是常见的功能之一，当使用哈希跳转来实现时，往往会显得很突兀(`index-finished-Dashrun.html`中已添加锚点，点击导航栏按钮即可看到效果)。我们更希望实现页面的平滑过渡(jQuery中可轻松实现，不过还是建议自己造一下试试)，实现的方法即为使用函数来平滑改变窗口滚动位置至目标位置。