# 05 Flex 实现可伸缩的图片墙 中文指南

> 作者：©[未枝丫](https://github.com/soyaine)   
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 5 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

## 实现效果

![可伸缩的图片墙演示](https://cl.ly/1X1A320o0x1T/Screen%20recording%202016-12-31%20at%2010.06.10%20AM.gif)

点击任意一张图片，图片展开，同时从图片上下两方分别移入文字。点击已经展开的图片后，图片被压缩，同时该图片上下两端的文字被挤走。若图片加载不出来，[请点链接看更完整的演示图片](https://d17oy1vhnax1f7.cloudfront.net/items/3J2r2G0p0C0h0q2c3R3p/Screen%20recording%202016-12-30%20at%2005.33.01%20PM.gif)，在线效果[请点这里。](http://soyaine.cn/JavaScript30/05%20-%20Flex%20Panel%20Gallery/index-SOYAINE2.html)

初始文档的 DOM 结构：以 `.panels` 为父 `div` 之下，有 5 个类名为 `.panel` 的 `div`，这 5 个各含有 3 个子 `p` 标签。而相应的 CSS 样式中，动画时间等特性已经设定好，只需要完成不同状态下的页面布局以及事件监听即可。

## 涉及特性

- display: flex
   - flex-direction
   - justify-content
   - align-items
- transform: translateX/translateY
- element.classList.toggle()
- transitionend 事件
	
## 过程指南

### CSS 部分

CSS 在这个过程中占了重点，运用 `flex` 可以使各个元素按一定比例占据页面。在调试的时候，可以把边框显示出来方便查看效果。（`border: 1px solid #f00;`）

1. 将 `.panels` 设置为 `display:flex`
2. 设定每个子 panel 的 `flex` 值为 1
3. 针对每个子 panel，设为 `display:flex`，设置其 flex 主轴方向
4. 控制 `.panle` 的子元素 `<p>` 中的文字垂直、水平居中（单独看每个 panel，其中的文字也可以用 flex 的思路来使其三等分后居中）
	1. 设置为 `display:flex`
	2. 设置 `flex` 值
	2. 设置其子元素的布局方式：垂直水平居中（沿主轴、侧轴居中）
4. 设定点击图片后文字移动的样式
5. 设定点击图片展开后的图片的 `flex` 值

### JS 部分

1. 获取所有类名为 `panel` 的元素
2. 为其添加 `click` 事件监听，编写触发事件调用的函数（给触发的 DOM 元素添加/去掉样式，实现拉伸/压缩的效果）
3. 为其添加 `transitionend` 事件监听，编写调用的函数（添加/去掉样式，实现文字的飞入/飞出效果）

## 相关知识

### [Flexbox](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

![MDN flexbox 图示](https://mdn.mozillademos.org/files/12998/flexbox.png)

这一个挑战的关键部分就在于理解如何使用 Flexbox，挑战的文档里嵌套了三个 flex 容器，作为弹性盒子，它们各自的作用是：

- `.panels`：使其中的 `.panel` 按横向的 flex 等分排布（此处为五等分）
- `.panel`：使其中的 `<p>` 按纵向的 flex 等分排布（此处为三等分）
- `p` ：借用 flex 相对于主轴及侧轴的对齐方式，使其中的文字垂直水平居中

这里容易混淆的是不同 CSS 属性的应用对象，想区分很简单，只需记住针对容器内子元素的特性较少（只有 5 个），可以这样联想：针对某一个具体的小元素进行设置，可供发挥的空间比较少，而针对 Flex 容器本身，有统筹大局的责任，故特性多一些。下面简单介绍一些基本的特性（没有完全列出）。

#### 针对 Flex items 的特性（Children）

- `flex-growth`：伸展值
- `flex-shrink`：可接受的压缩值
- `flex-basis`：元素默认的尺寸值
- `flex`：以上三个值按顺序的缩写

#### 针对 Flex container 的特性（Parent）

- `display: flex`：将这个元素设置成弹性盒子
- `flex-direction`：主轴方向
	- `row`：横向
	- `column`：纵向
- `justify-content`：沿主轴的的对齐方式
- `align-items`：沿侧轴的对齐方式
- `align-content`：子元素中文本沿侧轴的对齐方式（只有一行时无效）

可以在下面几个地方试一下 Flex 的各种特性：

- [http://demo.agektmr.com/flexbox/](http://demo.agektmr.com/flexbox/)
- [http://the-echoplex.net/flexyboxes/](http://the-echoplex.net/flexyboxes/)
- [http://codepen.io/justd/pen/yydezN](http://codepen.io/justd/pen/yydezN)

## 延伸思考

在 index-FINISHED.html 的解决方案中，用了两种 `class` 值来分别控制 `div` 元素和 `p` 元素的动画，这就会造成一个问题，当快速点击两下时，会出现相反的组合（图片缩小 + 上下文字出现）。

那为什么还要将文字的移动动画用 `.open-actived` 这个类来控制，同时还多加上了一个 `transitionend` 的事件监听，而不是直接用 `.open` 控制文字的移动，并且只采用一个 `click` 事件监听呢？

我试了一下，发现如果将要触发的文字移动（`transform`）用 `.open` 来控制，那么会出现有点不协调的状况。

要找到问题所在，可以先研究一下动画效果，由于录 GIF 很容易掉帧，最好打开网页来看细节。

当拉伸图片时，首先往里压缩（阶段①），然后再展开（阶段②），而文字是阶段②出现的；而当压缩图片时，也是同样的道理，先微微拉开一点（阶段①），然后再往里缩（阶段②），文字也是在阶段②才往上移动的，这样就形成了一种被 pia 飞的效果。

这样也就可以回答我最开始的疑问，为何要多添加一个 [`transitioned` 的事件监听](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend)，这个事件会在 `transition` 结束之后被触发，所以目的是先让图片的压缩拉伸完成，再移动文字。

也就是说，如果除去字体大小的变化，具体的动画细节其实是这样的：
- 图片展开：微微压缩一段距离 -> 展开图片 -> 文字向中心移动
- 图片压缩：微微展开一段距离 -> 压缩图片 -> 文字向上下移动

这就解释了为什么我改动之后出现了不协调，此时看到的动画，像是文字主导了图片的压缩伸展，原因就是文字动画的时机不太对，找到了这个原因，就很好解决了。（见 [index-SOYAINE2.html](https://github.com/soyaine/JavaScript30/blob/master/05%20-%20Flex%20Panel%20Gallery/index-SOYAINE2.html)）

```css
.panel > * {
	/* ... */
	transition:transform 0.5s 0.7s;
}

/* 修改 .open-actived -> .open*/
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
// 去掉对于 transitionend 的事件监听
```

解决思路是让 `p` 标签的文字动画效果延迟一下，添加 `transition` 属性的 `delay` 值，使其到图片变换的阶段②再发生，此处我选用了图片的动画最长时间 0.7s，圆满解决。

**挑战 5 Pass ~\(≧▽≦)/~**