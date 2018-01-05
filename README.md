# JavaScript30 - 一个月纯 JS 挑战中文指南

创建日期：2016-12-20  
最后更新：2017-10-29

> Repo by: [未枝丫](https://github.com/soyaine)  
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

目前这份指南还在更新之中，欢迎监督我，如果你想要及时获取新的文章，可以[在 GitHub Star/Fork 我的 Repo](https://github.com/soyaine/JavaScript30)。

## 如何参加挑战

下面是完成 Wes Bos 的 JavaScript30 挑战所能借鉴的文档，每个文档的具体使用建议如下：

- [JavaScript30 官网](https://javascript30.com)：进入官网注册后可以观看和下载所有教程视频。Wes Bos 还把视频传到了百度云，进入官网直接拉到页面底部就能找到链接。
- [Nitish Dayal 写的英文指南](https://github.com/nitishdayal/JavaScript30/tree/master/exercises)：这是一份非官方的文字版指南，也是激励我写这一系列文章的主要因素。
- [挑战初始文档](https://github.com/wesbos/JavaScript30)：这是 Wes Bos 这份教程涉及的代码，你可以直接 Clone 或者下载到本地，然后开始你 30 天的挑战之旅。文档共有 30 个文件夹，每个文件夹中至少有两个文件。
	- **index-START.html**：是提供给我们的初始文档，方便我们专注于 JavaScript 的编写，这个文档已经将基础的 HTML 和 CSS 部分写好，我们只需要在这个基础上编写 JavaScript 代码，实现特定的功能即可。
	- **index-FINISHED.html**：已经实现了最终效果的文档，可以查看效果和实现思路。
- [我写的中文指南源码](https://github.com/soyaine/JavaScript30)：文档结构和 Wes Bos 提供的相同，进入每个文件夹都可查看当前挑战的指南（README.md），我完成挑战时建立的文件是 **index-SOYAINE.html**，里面有核心代码的中文注释。如果阅读过程中发现问题，请[在这里提 issue](https://github.com/soyaine/JavaScript30/issues)。  如果喜欢记得 Star 哟~♪(^∇^*)，鼓励我写出更好的文章。

## 目录

No | Guide | Demo
--- | --- | ---
1 | [JavaScript Drum Kit  指南](https://github.com/soyaine/JavaScript30/tree/master/01%20-%20JavaScript%20Drum%20Kit) |  [纯 JS 模拟敲鼓效果](http://soyaine.github.io/JavaScript30/01%20-%20JavaScript%20Drum%20Kit/index-SOYAINE.html)
2 | [JS + CSS Clock 指南](https://github.com/soyaine/JavaScript30/tree/master/02%20-%20JS%20%2B%20CSS%20Clock) |  [纯 JavaScript+CSS 时钟效果](http://soyaine.github.io/JavaScript30/02%20-%20JS%20%2B%20CSS%20Clock/index-SOYAINE.html)
3 | [CSS Variables 指南](https://github.com/soyaine/JavaScript30/tree/master/03%20-%20CSS%20%Variables) |  [用 CSS 变量实现拖动控制参数效果](http://soyaine.github.io/JavaScript30/03%20-%20CSS%20Variables/index-SOYAINE.html)
4 | [Array Cardio, Day 1 指南](https://github.com/soyaine/JavaScript30/tree/master/04%20-%20Array%20Cardio%20Day%201) | [数组基本操作方法示例一](http://soyaine.github.io/JavaScript30/04%20-%20Array%20Cardio%20Day%201/index-SOYAINE.html)
5 | [Flex Panel Gallery 指南](https://github.com/soyaine/JavaScript30/blob/master/05%20-%20Flex%20Panel%20Gallery/README.md) | [可伸缩的图片墙在线效果](https://soyaine.github.io/JavaScript30/05%20-%20Flex%20Panel%20Gallery/index-SOYAINE2.html)
6 | [Type Ahead 指南](https://github.com/soyaine/JavaScript30/blob/master/06%20-%20Type%20Ahead/README.md) |  [根据关键词快速匹配诗句在线效果](https://soyaine.github.io/JavaScript30/06%20-%20Type%20Ahead/index-SOYAINE.html)
7 | [Array Cardio, Day 2 指南](https://github.com/soyaine/JavaScript30/tree/master/07%20-%20Array%20Cardio%20Day%202) | [数组基本操作方法示例二](http://soyaine.github.io/JavaScript30/07%20-%20Array%20Cardio%20Day%202/index-SOYAINE.html)
8 | [Fun with HTML5 Canvas 指南](https://github.com/soyaine/JavaScript30/tree/master/08%20-%20Fun%20with%20HTML5%20Canvas) | [彩虹画笔绘画板在线效果](https://soyaine.github.io/JavaScript30/08%20-%20Fun%20with%20HTML5%20Canvas/index-SOYAINE.html)
9 | [Dev Tools Domination 指南](https://github.com/soyaine/JavaScript30/blob/master/09%20-%20Dev%20Tools%20Domination/README.md) | [Console 调试技巧在线示例](https://soyaine.github.io/JavaScript30/09%20-%20Dev%20Tools%20Domination/index-SOYAINE.html)
10 | [Hold Shift and Check Checkboxes 指南](https://github.com/soyaine/JavaScript30/blob/master/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/README.md) | [Shift 批量选中在线效果](https://soyaine.github.io/JavaScript30/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/index-SOYAINE.html)
11 | [Custom Video Player 指南](https://github.com/soyaine/JavaScript30/blob/master/11%20-%20Custom%20Video%20Player/README.md) | -  
12 | [Key Sequence Detection 指南](https://github.com/soyaine/JavaScript30/tree/master/12%20-%20Key%20Sequence%20Detection/README.md) | [在线效果](https://soyaine.github.io/JavaScript30/12%20-%20Key%20Sequence%20Detection/index-FINISHED.html)
13 | [Slide in on Scroll 指南](https://github.com/soyaine/JavaScript30/blob/master/13%20-%20Slide%20in%20on%20Scroll/README.md) | [图片随屏幕滚动而滑入滑出的在线效果](https://soyaine.github.io/JavaScript30/13%20-%20Slide%20in%20on%20Scroll/index-SOYAINE.html)
14 | [JavaScript References vs. Copying 指南](https://github.com/soyaine/JavaScript30/tree/master/14%20-%20JavaScript%20References%20VS%20Copying) | -
15 | LocalStorage | -   
16 | [Mouse Move Shadow 指南](https://github.com/dashrun/JavaScript30/blob/master/16%20-%20Mouse%20Move%20Shadow/README.md) | [文字阴影随鼠标移动在线效果](https://soyaine.github.io/JavaScript30/16%20-%20Mouse%20Move%20Shadow/index-finished-es5.html)
17 | [Sort Without Articles 指南](https://github.com/soyaine/JavaScript30/blob/master/17%20-%20Sort%20Without%20Articles/README.md) | [去前缀排序在线效果](https://soyaine.github.io/JavaScript30/17%20-%20Sort%20Without%20Articles/index-finished-Dashrun-es5.html)  
18 | [Adding Up Times with Reduce 指南](https://github.com/soyaine/JavaScript30/tree/master/18%20-%20AddingUpTimesWithReduce) | [使用 Reduce 进行时间叠加效果](https://soyaine.github.io/JavaScript30/18%20-%20AddingUpTimesWithReduce/index-finished-Dashrun-es6.html)    
19 | [Webcam Fun 指南](https://github.com/soyaine/JavaScript30/blob/master/19%20-%20Webcam%20Fun/README.md) | [网络摄像头及图片处理在线效果](https://soyaine.github.io/JavaScript30/19%20-%20Webcam%20Fun/index-finished-Dashrun.html)  
20 | [Speech Detection指南](https://github.com/soyaine/JavaScript30/blob/master/20%20-%20Speech%20Detection/README.md) | [Speech Detection效果](https://soyaine.github.io/JavaScript30/20%20-%20Speech%20Detection/index-finished-Dashrun.html)   
21 | [Geolocation指南](https://github.com/soyaine/JavaScript30/blob/master/21%20-%20Geolocation/README.md) | [Geolocation效果](https://soyaine.github.io/JavaScript30/21%20-%20Geolocation/index-finished-Dashrun.html)  
22 | [Follow Along Link Highlighter指南](https://github.com/soyaine/JavaScript30/blob/master/22%20-%20Follow%20Along%20Link%20Highlighter/README.md) | [Follow Along Link Highlighter效果](https://soyaine.github.io/JavaScript30/22%20-%20Follow%20Along%20Link%20Highlighter/index-finished-Dashrun.html) 
23 | [Speech Synthesis指南](https://github.com/soyaine/JavaScript30/blob/master/23%20-%20Speech%20Synthesis/README.md) | [Speech Synthesis效果](https://soyaine.github.io/JavaScript30/23%20-%20Speech%20Synthesis/index-finished-Dashrun.html)  
24 | [Sticky Nav指南](https://github.com/soyaine/JavaScript30/blob/master/24%20-%20Sticky%20Nav/README.md) | [Sticky Nav效果](https://soyaine.github.io/JavaScript30/24%20-%20Sticky%20Nav/index-finished-Dashrun.html)  
25 | [Event Related指南](https://github.com/soyaine/JavaScript30/blob/master/25%20-%20Event%20Related/README.md) | [Event Related效果](https://soyaine.github.io/JavaScript30/25%20-%20Event%20Related/index-finished-Dashrun.html)   
26 | [Stripe Follow Along Nav指南](https://github.com/soyaine/JavaScript30/blob/master/26%20-%20Stripe%20Follow%20Along%20Nav/README.md) | [Strip Follow Along Nav效果](https://soyaine.github.io/JavaScript30/26%20-%20Stripe%20Follow%20Along%20Nav/index-finished-Dashrun.html)   
27 | [Click and Drag指南](https://github.com/soyaine/JavaScript30/blob/master/27%20-%20Click%20and%20Drag/README.md) | [Click and Drag效果](https://soyaine.github.io/JavaScript30/27%20-%20Click%20and%20Drag/index-finished-Dashrun.html)   
28 | [Video Speed Controller指南](https://github.com/soyaine/JavaScript30/blob/master/28%20-%20Video%20Speed%20Controller/README.md) | [Video Speed Controller效果](https://soyaine.github.io/JavaScript30/28%20-%20Video%20Speed%20Controller/index-finished-Dashrun.html)  
29 | Countdown Timer |  -  
30 | Whack A Mole | -   

参加挑战并不需要你缴纳费用或是加入什么组织，也不会有人催着你去做什么，你只需要打开电脑，然后开始思考、敲击键盘。相信内在动机的力量，我在这里给出了一些建议和心得，最适合你的方法还需要你自己去摸索。

## 本中文指南贡献者名单
 
Name | Contribution
--- | ---
[@DrakeXiang](https://github.com/DrakeXiang) |  No.[11](https://github.com/soyaine/JavaScript30/tree/master/11%20-%20Custom%20Video%20Player)
[@zzh466](http://github.com/zzh466) | Review
[@Xing Liu](https://github.com/S1ngS1ng) | Review
[@大史快跑Dashrun](https://github.com/dashrun) |  No.[16](https://github.com/soyaine/JavaScript30/tree/master/16%20-%20Mouse%20Move%20Shadow).[17](https://github.com/soyaine/JavaScript30/tree/master/17%20-%20Sort%20Without%20Articles).[18](https://github.com/soyaine/JavaScript30/tree/master/18%20-%20AddingUpTimesWithReduce).[19](https://github.com/soyaine/JavaScript30/blob/master/19%20-%20Webcam%20Fun).[20](https://github.com/soyaine/JavaScript30/tree/master/20%20-%20Speech%20Detection).[21](https://github.com/soyaine/JavaScript30/tree/master/21%20-%20Geolocation).[22](https://github.com/soyaine/JavaScript30/tree/master/22%20-%20Follow%20Along%20Link%20Highlighter).[23](https://github.com/soyaine/JavaScript30/tree/master/23%20-%20Speech%20Synthesis).[24](https://github.com/soyaine/JavaScript30/tree/master/24%20-%20Sticky%20Nav).[25](https://github.com/soyaine/JavaScript30/tree/master/25%20-%20Event%20Related).[26](https://github.com/soyaine/JavaScript30/tree/master/26%20-%20Strip%20Follow%20Along%20Nav).[27](https://github.com/soyaine/JavaScript30/tree/master/27%20-%20Click%20and%20Drag).[28](https://github.com/soyaine/JavaScript30/tree/master/28%20-%20Video%20Speed%20Controller)
[@未枝丫](https://github.com/soyaine) | No.[1](https://github.com/soyaine/JavaScript30/tree/master/01%20-%20JavaScript%20Drum%20Kit).[2](https://github.com/soyaine/JavaScript30/tree/master/02%20-%20JS%20%2B%20CSS%20Clock).[3](https://github.com/soyaine/JavaScript30/tree/master/03%20-%20CSS%20%Variables).[4](https://github.com/soyaine/JavaScript30/tree/master/04%20-%20Array%20Cardio%20Day%201).[5](https://github.com/soyaine/JavaScript30/blob/master/05%20-%20Flex%20Panel%20Gallery).[6](https://github.com/soyaine/JavaScript30/blob/master/06%20-%20Type%20Ahead).[7](https://github.com/soyaine/JavaScript30/tree/master/07%20-%20Array%20Cardio%20Day%202).[8](https://github.com/soyaine/JavaScript30/tree/master/08%20-%20Fun%20with%20HTML5%20Canvas).[9](https://github.com/soyaine/JavaScript30/blob/master/09%20-%20Dev%20Tools%20Domination).[10](https://github.com/soyaine/JavaScript30/blob/master/10%20-%20Hold%20Shift%20and%20Check%20Checkboxes/README.md).[12](https://github.com/soyaine/JavaScript30/tree/master/12%20-%20Key%20Sequence%20Detection/README.md).[13](https://github.com/soyaine/JavaScript30/blob/master/13%20-%20Slide%20in%20on%20Scroll/README.md).[14](https://github.com/soyaine/JavaScript30/tree/master/14%20-%20JavaScript%20References%20VS%20Copying)

## JOIN US
如果对这个系列的指南有什么改进的想法，欢迎[提 issue](https://github.com/soyaine/JavaScript30/issues)，如果你也想参与写作，请看 [wiki](https://github.com/soyaine/JavaScript30/wiki/%E6%8C%87%E5%8D%97%E7%BB%93%E6%9E%84%E8%AF%B4%E6%98%8E)，并联系 Soyaine。

