# 18 使用reduce进行时间累加

> 本篇作者：©[大史快跑Dashrun](https://github.com/dashrun)——Chinasoft Frontend Web Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 18 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-08-25    
最后更新：2017-08-29

## 挑战任务
   初始文件`index-start.html`中提供了一个包含多个列表项的无序列表元素，每一个列表项均添加了`data-time`属性，该属性用**分**和**秒**表示了时间。要求将所有的时间累加在一起，并用`时:分:秒`来表示计算的结果。

## 实现效果
![结果展示](https://github.com/dashrun/vanilla-javascript-30/blob/master/day18-AddingUpTimesWithReduce/effects.png)

## 基本思路
1.取得所有`li`中`data-time`属性的值，将时间换算为秒并累加求得总时间（单位：秒）;<br>
2.手动计算将总时间转化为新的格式“XX小时XX分XX秒”;<br>
3.将结果显示在页面上。

## 过程指南(以非ES6版本为例)
1.取得所有`li`标签
```js
var oLi = document.getElementsByTagName('li');
```
2.遍历`li`元素节点，取得每个`data-time`的值并以：为界将其分解为含有两个元素的数组,每个数组中含有两项，第一项为表示分钟的字符串，第二项为表示秒的字符串，将两者进行运算转化为表示秒的数字，并添加进新的数组。
```js
    for( var i = 0, len = oLi.length; i < len; i++){
      var timeItem = oLi[i].dataset['time'].split(':');
      //将时间转换为秒
      times.push(parseInt(timeItem[0],10)*60+parseInt(timeItem[1],10));
    }
```
3.将新数组`times`中各项累加
```js
//方法1.因为times为数组类型，故可以直接使用reduce函数进行累加
    return times.reduce(function(a,b){
      return a+b;
    },0);
//方法2.不熟悉reduce函数的也可通过for循环遍历数组各项进行结果累加
```
4.总时间格式转换
```js
    //总时间对60取余即为不足1分钟的秒数
    var sec = seconds % 60;
    //总时间除以3600并向下取整为小时数
    var hour = Math.floor(seconds/3600);
    //总时间减去前两项即可获得分钟数
    var min = (seconds - 3600*hour - sec)/60;
```
5.将结果打印在界面上即可