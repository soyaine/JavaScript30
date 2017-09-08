# 20 Speech Detection 中文指南

> 本篇作者：©[大史快跑Dashrun](https://github.com/dashrun)——Chinasoft Frontend Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 20 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-09-04    
最后更新：2017-09-07

## 挑战任务
本次的挑战任务，是利用浏览器内置`Web speech API`,将自己所说的话输出在页面上,仅chrome浏览器支持。   
说明：由于只有chrome浏览器实现了该接口，而语音识别需要将捕捉到的信息发送至google服务器进行处理，故本文档只提供解决思路和参考代码。

## 实现效果
![结果展示](https://github.com/dashrun/vanilla-javascript-30/blob/master/20%20-%20Speech%20Detection/effects.png)

## 相关知识
有关语音识别接口`SpeechRecognition`的说明，可查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechRecognition)中的相关解释。

## 基本思路   
1.新建语音识别对象;   
2.开启语音识别服务;   
3.通过监听`result`事件，实时获取捕获到的语音信息;   
4.通过监听`end`事件，当一次语音捕获结束后，重新开启该功能，实现持续的语音监听功能。   

## 过程指南
1.由于目前只有chrome浏览器实现了此功能，故直接使用带有前缀的构造函数来构建一个语音识别对象。   
```js
var speech = new webkitSpeechRecognition();
```   
2.设置语音识别对象的基本属性，并开启该功能。
```js
  speech.interimResults = true;
  //返回即时语音，即时语音是指SpeechRecognitionResult.isFinal 为false时捕获到的信息。
  speech.lang = 'en-US';//设置语音识别类别为英语
  speech.start();//开启功能
```   
3.监听收到结果事件，将语音识别结果输出在DOM元素上。   
```js
  speech.addEventListener('result', (e) => {
      const results = Array.from(e.results) 
      // e.results中保存的是识别的结果，本来并不是数组，需要将其转换为数组，方便使用其map、join等方法。
        .map(result => result[0])
        .map(result => result.transcript) // 获取到每一段话，是一个数组类型
        .join(''); // 将每一段话连接成字符串
       //将结果输出在页面上
        words.innerHTML = results;
      }
```

## 延伸思考
由于国内网络原因，可考虑使用[科大讯飞的语音识别sdk](http://www.xfyun.cn/)，感兴趣的同学可自行尝试实现。
