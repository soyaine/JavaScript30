# 13 图片随屏幕滚动而滑入滑出的效果指南

> 作者：©[缉熙Soyaine](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 12 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-07-14    
最后更新：2017-07-14

## 实现效果

页面中的文章有几张配图，随着页面上下滚动，图片位置进入可见区域时，图片从两侧滑入；图片位置离开可见区域时，图片向两侧滑出。

![pic](https://cl.ly/2c2R0q2L040c/Image%202017-07-14%20at%2010.35.43%20%E4%B8%8A%E5%8D%88.png)

上图中蓝色方框位置即是图片所占位置，初始文档中已经写好了内容及样式，需要完成 `<script>` 部分的代码来实现图片滑动的效果。

## 知识点

通过 `translateX` 来控制左右移动
`scale` 来控制缩放

## 解决思路

1. 获取页面中的所有图片元素
2. 

## 过程指南

1. 获取所有涉及到的图片
2. 滚动事件监听
    ```js
        function checkSlide(e) {
            console.log(e);
            console.count(e);
        }

        window.addEventListener('scroll', checkSlide);
    ```
    针对页面的滚动事件进行监听，可以先打出事件对象来看。
3. 