# 13 图片随屏幕滚动而滑入滑出的效果指南

> 作者：©[未枝丫](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 13 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-07-14    
最后更新：2017-07-18

## 实现效果

页面中的文章有几张配图，随着页面上下滚动，图片位置划过图片一半时，图片从两侧滑入；图片位置离开可见区域时，图片向两侧滑出。

![Scroll 效果演示](https://cl.ly/2k2e2H0b1U0J/Screen%20Recording%202017-07-18%20at%2010.04%20%E4%B8%8A%E5%8D%88.gif)（图片太大，可点击[外链](https://cl.ly/2k2e2H0b1U0J)查看，或查看[在线效果](http://soyaine.cn/JavaScript30/13%20-%20Slide%20in%20on%20Scroll/index-SOYAINE.html)。）

下图中蓝色方框位置即是图片所占位置，初始文档中已经写好了内容及样式，需要完成控制图片显示部分的代码来实现图片滑动的效果。

![pic](https://cl.ly/2c2R0q2L040c/Image%202017-07-14%20at%2010.35.43%20%E4%B8%8A%E5%8D%88.png)

## 知识点

涉及控制图片的 CSS 属性：
- `translateX` 来控制左右移动
- `scale` 来控制缩放

涉及页面尺寸的属性：

- `window.scrollY` 文档从顶部开始滚动过的像素值
- `window.innerHeight viewport` 部分的高度
- `ele.height` 元素的高度
- `ele.offsetTop` 当前元素顶部相对于其 offsetParent 元素的顶部的距离。

`debounce` 的作用：
降低事件监听的频率，使用了 Lodash 中的 debounce 方法。

## 解决思路

1. 获取页面中的所有图片元素
2. 滚动事件监听
3. 尺寸获取及处理
4. 滚动至指定区域的条件判断

## 过程指南

1. 获取所有涉及到的图片
    ```js
    const slideImages = document.querySelectorAll('.slide-in');
    ```
2. 滚动事件监听
    ```js
        function checkSlide(e) {
            console.log(e);
            console.count(e);
        }

        window.addEventListener('scroll', debounce(checkSlide));
    ```
    针对页面的滚动事件进行监听，可以先打出事件对象来看看。同时在接下来的调试过程中也能利用这打出各个尺寸的值，来帮助我们感受每个尺寸的含义。
    此外由于每次滚动都触发监听事件，会降低 JavaScript 运行性能，所以用 `debounce` 函数来降低触发的次数。
3. 针对每次监听到的滚动事件，遍历所有图片元素，判断是否显示或隐藏图片。由于图片的显示控制只需通过增减 `.active` 类，此处的重点在于判断的条件如何确认，为便于形象地感受页面滚动时，各个尺寸的变化，我画了一张示意图，如下：
    ![尺寸示意图](https://cl.ly/0w3p1v1y3q14/Image%202017-07-18%20at%2010.24.10%20%E4%B8%8A%E5%8D%88.png)
    其中<label style="color: rgba(255, 153, 0, 0.5);">橙色半透明</label>部分指可滚动页面整体，<label style="color: #f90">橙色标注</label>部分是指会随着页面滚动而变化的尺寸，黑色标注的尺寸是固定不变的。
    页面的滑动过程经过了两个临界点，一个是下滑到图片的一半处，另一个是完全滑过图片使图片已不再视窗之内，分别决定了图片的显示和隐藏。
    ```js
    // 滑动页面的底部距离扣除图片一半的高
    const slideInAt = (window.scrollY + window.innerHeight) - img.height / 2;
    // 图片底部距离顶端的距离
    const imgBottom = img.offsetTop + img.height;
    ```
    需要利用两个临界点来判断图片是否处在需要显示的区域内，故利用两个值来存取此条件的结果（以保证每次事件监听的结果赋值给常亮后，不会随 `window` 的属性值变化）。
    ```js
    // 已滑过了图片的一半
    const isHalfShow = slideInAt > img.offsetTop;
    // 未完全滑过图片
    const isNotScrollPast = window.scrollY < imgBottom;
    ```
4. 对于满足显示条件的，给此图片添加 `.active` 类，不满足的则去掉。
    ```js
    if (isHalfShow && isNotScrollPast) {
        img.classList.add('active');
    } else {
        img.classList.remove('active');
    }
    ```
    至此，图片控制逻辑已全部完成。
    亲手滑动感受一下吧o(*≧▽≦)ツ