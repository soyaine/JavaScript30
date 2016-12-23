# JavaScript30 - 一个月纯 JS 挑战中文指南

最后更新：2016-12-21

> 中文指南作者：©[缉熙Soyaine](https://github.com/soyaine)  
> [JavaScript30](https://javascript30.com) 教程作者：[Wes Bos](https://github.com/wesbos)    
> 完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

## JavaScript30 是什么？

JavaScirpt30 是 Wes Bos 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

官网的 slogan 如下：
> Build 30 things in 30 days with 30  tutorial
> No Frameworks × No Compilers × No Libraries × No Boilerplate

## 关于《 JavaScript30 中文指南》

英文中描述纯 JavaScript 使用的单词是 vanilla JavaScript，vanilla 有平凡普通的意味，同时也有香草的释义，这个词很美，可惜我找不到适当的汉语来翻译它。我从入门前端时就在用纯 JavaScript 来写东西、写博客，看到这个挑战时很开心，觉得在前端社区各种框架热热闹闹的时候，有人回到最本真的地方，是很难得的一件事。

当然不可否认的是，新的工具可以帮助我们提高生产率，但最原始的 JavaScript 想必是很多人的知识结构里所缺失的部分，如果你也想探探究竟，欢迎跟着这份指南，一起逛逛 JavaScript 的原始世界。

写这份中文指南的另一个原因是看了 Nitish Dayal 写的 Guides，我决定效仿他，在记录笔记的同时梳理思路，整理形成指南。我相信 Learn by Use 的同时也深信教是最好的学。希望这份指南能够帮助到想要进行练习的人们，特别是那些想要入门的前端小白们。

目前这份指南还在更新之中，欢迎监督我，如果你想要及时获取新的文章，可以[在简书关注这个系列](http://www.jianshu.com/notebooks/8509835/latest)，或是[在 GitHub Star/Fork 我的 Repository](https://github.com/soyaine/JavaScript30)。

## 如何参加挑战

下面是完成 Wes Bos 的 JavaScript30 挑战所能借鉴的文档，每个文档的具体使用建议如下：

- [JavaScript30 官网](https://javascript30.com)：进入官网注册后可以观看和下载所有教程视频。
- [Nitish Dayal 写的英文指南](https://github.com/nitishdayal/JavaScript30/tree/master/exercises)：这是一份非官方的文字版指南，也是激励我写这一系列文章的主要因素。
- [挑战初始文档](https://github.com/wesbos/JavaScript30)：这是 Wes Bos 这份教程涉及的代码，你可以直接 Clone 或者下载到本地，然后开始你 30 天的挑战之旅。文档共有 30 个文件夹，每个文件夹中至少有两个文件。
	- **index-START.html**：是提供给我们的初始文档，方便我们专注于 JavaScript 的编写，这个文档已经将基础的 HTML 和 CSS 部分写好，我们只需要在这个基础上编写 JavaScript 代码，实现特定的功能即可。
	- **index-FINISHED.html**：已经实现了最终效果的文档，可以查看效果和实现思路。
- [我写的中文指南源码](https://github.com/soyaine/JavaScript30)：文档结构和 Wes Bos 提供的相同，进入每个文件夹都可查看当前挑战的指南（README.md），我完成挑战时建立的文件是 **index-SOYAINE.html**，里面有核心代码的中文注释。如果阅读过程中发现问题，请[在这里提 issue](https://github.com/soyaine/JavaScript30/issues)。  如果喜欢记得 Star 哟~♪(^∇^*)，鼓励我写出更好的文章。
- ~~[在线 GitBook]（写完之后会有）~~
- [在简书发布的 JavaScript30 中文指南](http://www.jianshu.com/p/23c4be7973d7)：点击下方目录中的链接即可跳转到练习对应的指南。   


## 目录

1. [x] JavaScript Drum Kit  [指南](https://github.com/soyaine/JavaScript30/tree/master/01%20-%20JavaScript%20Drum%20Kit) |  [纯 JS 模拟敲鼓效果](http://soyaine.github.io/JavaScript30/01 - JavaScript Drum Kit/index-SOYAINE.html)
2. [x] JS + CSS Clock [指南](https://github.com/soyaine/JavaScript30/tree/master/02%20-%20JS%20%2B%20CSS%20Clock) |  [纯 JavaScript+CSS 时钟效果](http://soyaine.github.io/JavaScript30/02 - JS %2B CSS Clock/index-SOYAINE.html)
3. [x] CSS Variables [指南](https://github.com/soyaine/JavaScript30/tree/master/03%20-%20CSS%20%Variables) |  [用 CSS 变量实现拖动控制参数效果](http://soyaine.github.io/JavaScript30/03%20-%20CSS%20Variables/index-SOYAINE.html)
4. [x] Array Cardio, Day 1 [指南](https://github.com/soyaine/JavaScript30/tree/master/04%20-%20Array%20Cardio%20Day%201) | [数组基本操作方法示例](http://soyaine.github.io/JavaScript30/04%20-%20Array%20Cardio%20Day%201/index-SOYAINE.html)
5. [ ] Flex Panel Gallery
6. [ ] Type Ahead
7. [ ] Array Cardio, Day 2
8. [ ] Fun with HTML5 Canvas
9. [ ] Dev Tools Domination
10. [ ] Hold Shift and Check Checkboxes
11. [ ] Custom Video Player
12. [ ] Key Sequence Detection
13. [ ] Slide in on Scroll
14. [ ] JavaScript References vs. Copying
15. [ ] LocalStorage
16. [ ] Mouse Move Shadow
17. [ ] Sort Without Articles
18. [ ] Adding Up Times with Reduce
19. [ ] Webcam Fun
20. [ ] Speech Detection
21. [ ] Geolocation
22. [ ] Follow Along Link Highlighter
23. [ ] Speech Synthesis
24. [ ] Sticky Nav
25. [ ] Event Capture, Propagation, Bubbling, and Once
26. [ ] Stripe Follow Along Nav
27. [ ] Click and Drag
28. [ ] Video Speed Controller
29. [ ] Countdown Timer
30. [ ] Whack A Mole

参加挑战并不需要你缴纳费用或是加入什么组织，也不会有人催着你去做什么，你只需要打开电脑，然后开始思考、敲击键盘。相信内在动机的力量，我在这里给出的一些建议，最适合你的方法需要你自己去摸索。