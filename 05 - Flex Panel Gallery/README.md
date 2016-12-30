# 05 Flex 实现可伸缩的图片墙 中文指南

> 作者：©[缉熙Soyaine](https://github.com/soyaine)   
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 5 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

## 实现效果

![可伸缩的图片墙演示](https://cl.ly/0o191E0S1S2X/Screen%20recording%202016-12-30%20at%2006.17.47%20PM.gif)

点击五张图片中的任意一张时，图片展开，同时图片中心的文字上下分别移入文字。点击已经展开的图片，图片被压缩，同时图片中上下两端的文字被挤走。若图片加载不出来[请点链接](https://d17oy1vhnax1f7.cloudfront.net/items/3J2r2G0p0C0h0q2c3R3p/Screen%20recording%202016-12-30%20at%2005.33.01%20PM.gif)，查看在线效果[请看这里。](http://soyaine.cn/JavaScript30/05%20-%20Flex%20Panel%20Gallery/index-SOYAINE2.html)

## 初始文档

首先描述一下文档的 DOM 结构：以 `.panels` 为父 `div` 之下，有 5 个类名为 `.panel` 的 `div`，这 5 个各含有 3 个子 `p` 标签。

```
.panels div
├── .panel, .panel1 div
|   ├── p
|   ├── p
|   └── p
├── .panel, .panel2 div
|   ├── p
|   ├── p
|   └── p
├── .panel, .panel3 div
|   ├── p
|   ├── p
|   └── p
├── .panel, .panel4 div
|   ├── p
|   ├── p
|   └── p
└── .panel, .panel5 div
    ├── p
    ├── p
    └── p
```

display: flex;

	border: 1px solid #f00;
	
## 延伸思考

在 index-FINISHED.html 的解决方案中，用了两种 `class` 值来分别控制 `div` 元素和 `p` 元素的动画，这就会造成一个问题，当快速点击两下时，会出现相反的组合（图片缩小 + 上下文字出现）。

那为什么还要将文字的移动动画用 `.open-actived` 这个类来控制，同时还多加上了一个 `transitionend` 的事件监听，而不是直接用 `.open` 控制文字的移动，并且只采用一个 `click` 事件监听呢？

我试了一下，发现如果将要触发的文字移动（`transform`）用 `.open` 来控制，那么会出现有点不协调的状况。

要找到问题所在，可以先研究一下动画效果，由于录 GIF 很容易掉帧，最好打开网页来看细节。

当拉伸图片时，首先往里压缩（阶段①），然后再展开（阶段②），而文字是阶段②出现的；而当压缩图片时，也是同样的道理，先微微拉开一点（阶段①），然后再往里缩（阶段②），文字也是在阶段②才往上移动的，这样就形成了一种被 pia 飞的效果。

这就解释了为什么我改动之后出现了不协调，此时看到的动画，像是文字主导了图片的压缩伸展，原因就是文字动画的时机不太对，找到了这个原因，就很好解决了。（见 [index-SOYAINE2.html]()）

```css
.panel > * {
	/* ... */
	transition:transform 0.5s 0.7s;
}

.panel.open p:first-child {
	transform: translateY(0);
}

.panel.open p:last-child {
	transform: translateY(0);
}
```

```js
const panels = document.querySelectorAll('.panel');

function toggleOpen(e) {
    this.classList.toggle('open');
}

panels.forEach( panel => panel.addEventListener('click', toggleOpen, false));
```

让 `p` 标签的文字动画效果延迟一下，添加 `transition` 属性的 `delay` 值，使其到图片变换的阶段②再发生，此处我选用了图片的动画最长时间 0.7s，圆满解决。

这样也就可以回答我最开始的疑问，为何要多添加一个 [`transitioned` 的事件监听](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend)，这个事件会在 `transition` 结束之后被触发，所以目的是先让图片的压缩拉伸完成，再移动文字。

也就是说，如果出去字体大小的变化，具体的动画细节其实是这样的：
- 图片展开：微微压缩一段距离 -> 展开图片 -> 文字向中心移动
- 图片压缩：微微展开一段距离 -> 压缩图片 -> 文字向上下移动

##### 挑战 5 Pass ~\(≧▽≦)/~