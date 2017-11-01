# 28 Video Speed Controller 中文指南

> 本篇作者：©[大史快跑Dashrun](https://github.com/dashrun)——Chinasoft Frontend Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 28 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-10-31   
最后更新：2017-11-1

## 挑战任务
初始文档`index-start.html`中提供了一个视频播放区域（使用的是H5原生的控制器）以及一个表示播放速度的滑块区域，本次的编程任务需要实现的效果是当鼠标拖动滑块时，实时改变视频播放的速度。

## 实现效果
![结果展示](https://github.com/dashrun/vanilla-javascript-30/blob/master/28%20-%20Video%20Speed%20Controller/effect.png)

## 编程思路  
本次的编程任务难度系数较低，在右侧速度条上监听鼠标点击事件，调整滑块的高度来表示不同的填充百分比，即不同的播放速度，将速度赋值给video对象的`playbackRate`属性即可实时改变播放速度。难点在于高度的百分比转换。

## 过程指南   
本篇实现较为简单，不再分步骤讲解，示例代码如下：
```js
  const speed = document.querySelector(".speed");
  const speedBar = speed.querySelector(".speed-bar");
  const video = document.querySelector(".flex");
  
  function changeSpeed(e) {
    const height = e.offsetY;//获取滑块的高度
    const percentage = e.offsetY / speed.offsetHeight;
    const min = 0.5;
    const max = 5;
    //依据自定义播放速度范围和滑块高度百分比确定播放速率
    const playbackRate = percentage * (max - min) + min; 
    speedBar.style.height = Math.round(percentage*100) + '%';
    speedBar.textContent = playbackRate.toFixed(2) + '×';
    video.playbackRate = playbackRate;
  }

  speed.addEventListener('click',changeSpeed);
```

