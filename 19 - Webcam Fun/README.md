# 19 Webcam Fun 中文指南

> 本篇作者：©[大史快跑Dashrun](https://github.com/dashrun)——Chinasoft Frontend Developer

> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 19 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-08-31    
最后更新：2017-09-02

## 挑战任务
在`index-start.html`中提供了一个名为**Take Photo**的按钮，该按钮的点击事件会触发`takePhoto()`函数，并提供了一组标有RGBmin/max标记的`range`类型`input`元素，一个`canvas`元素，一个`video`元素，以及带有`strip`类名的空`div`元素。   
本次的编程任务：   
1.通过编写javascript代码，请求调用用户的网络摄像头;   
2.在页面上展示来自webcam的数据流信息;   
3.并允许用户保存展示的照片;   
4.及使用滑块来改变图像的色彩。   

## 实现效果
![结果展示](https://github.com/dashrun/vanilla-javascript-30/blob/master/19%20-%20Webcam%20Fun/effects.png)

## 相关知识
1.`window.navigator`对象   
`window.navigator`对象上有很多有趣的属性和方法，通过调用相应的方法可以查看到有关当前脚本运行环境(多为浏览器)的相关信息，并使用一些扩展功能。对此不熟悉的开发者可以浏览[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator)中相关API的介绍，例如使用`getBattery()`可以获取电池状态。   
2.`navigator.getUserMedia`方法   
`getUserMedia`方法为我们提供了访问网络摄像头或麦克风的权限，该方法接受一个对象作为参数，通过该对象即可获得来自多媒体设备的数据。   
3.`canvas`标签   
HTML5强大的扩展功能之一，提供了丰富的图像绘制方法，也是HTML可以作为游戏开发工具的原因之一，本次开发中使用`canvas.getContext('2d')`提供的图像操作方法.   
4.像素数组   
使用`canvas`绘图上下文中的`getImageData()`获得的像素信息为一个定型数组，每个像素点的rgba色彩信息分别存放在数组中，故数据的格式为：[第一像素r值，第一像素g值，第一像素b值，第一像素a值，第二像素r值，第二像素g值......]，通过各类函数公式对像素数据进行处理即可获得各类不同的滤镜效果。   

## 基本思路

1.调用`navigator.getUserMedia()`方法，若调用成功则返回数据流，若调用失败则在控制台打印相关信息;   
2.成功调用网络摄像头后，将返回的数据对象绑定至video标签的srcObject属性(注意此处getUserMedia()方法成功调用时触发的回调函数中会传递一个`stream`对象,该对象直接赋值给video.src是没有作用的)，并当流数据开始传递时，视频自动播放;   
3.点击`takePhoto()`函数时调用`canvas`绘图上下文中的`drawImage()`方法将视频中当前帧的图像绘制在canvas上，该方法第一个参数可以为图像或视频，其余参数与绘图区域尺寸相关(该方法有多种调用模式，感兴趣的读者可自行学习);   
4.滤色：在全局中保存滤色范围的上下限，每次滑块数据发生改变后，使用`canvas`绘图上下文中的`getImageData()`获得画布上指定区域内各像素点的颜色数据，数据被保存在返回对象的data属性中，通过遍历修改像素色彩数组中的数据改变图像的表现，修改后调用`putImageData()`方法将像素点重新绘制在`canvas`上。   
5.点击`savePhoto()`函数时调用`canvas`的`toDataUrl()`方法即可获得canvas中的图像数据，默认格式为png，也可修改为其他格式，生成的图像数据指定给`img.src`时即可预览图片;   
6.在`img`标签外添加`a`标签，并为其添加`download`属性，当点击链接时，即可将生成的图片保存至本地。   

## 过程指南
1.申请调用WebCam   
```js
function askWebcam() {
     navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            audio: false,
            video: {
                width: 300,
                height: 200
            }
        }, function(stream) {
            //若成功
            video.srcObject = stream;
            video.onloadedmetadata = function(e) {
                video.play();
            }
        }, function(err) {
            console.log('Error occured:' + err.name);
        });
    } else {
        console.log('this navigator doesn\'t support webcam!');
    }
}
```   
2.截图函数 `takePhoto()`，此处将原始图像数据保留一份，否则使用滤色函数处理后，被滤掉的颜色无法恢复，保存了原始图像数据后，只需要重新绘制在canvas上即可。   
```js
function takePhoto() {
    ctx.drawImage(video, 0, 0, 300, 200);
    //将原始截图保存,
    origindata = ctx.getImageData(0,0,300,200);
}
```   
3.色彩过滤   
在所有滑块的父元素上监听`change`事件，当滑块的值发生改变时，先通过e.target.name确定是哪个颜色的范围要求发生了变化，再访问e.target.value获得变化值，通过与全局变量`filter`作比较来获得滤色值的上下限要求。
重点难点解释如下：   
```js
        /*startPos表示操作像素点数据时的起点，从canvas获取到的像素数据每四个值表示一个像素点例如滑块为红色，则只需要改变像素数组中第0,4,8......个元素的值。通过target.value的首字母即可判断滤色过程应该检查的颜色*/
        const startPos = {'r':0,'g':1,'b':2}[target.name[0]];
        /*filterMin和filterMax表示相应的滤色范围上下限，若修改了红色滤色范围则取红色范围值。若修改蓝色的滤色范围，则取蓝色。checkFilter()函数将改变后的值与滤色标准`filter`进行比较，将更改滤色标准后需要调整的颜色类别(r,g,b)对应的上下限返回给结果。*/
        var tempFilter = checkFilter(target.name, target.value);
        const filterMin = tempFilter.min;
        const filterMax = tempFilter.max;
```   
4.保存图片   
使用`canvas.toDataUrl()`方法将`canvas`画布保存为图片，默认为png格式，该数据可作为`img.src`的值，也可利用`a`标签将其下载.   
```js
//保存图片
function savePhoto() {
    img.src = canvas.toDataURL();
    a.href = canvas.toDataURL();
    a.setAttribute('download', 'handsome');
}
```   
## 延伸思考   
####如何制作一个简易的钢铁侠面板   
1.本次的编程任务中我们已经可以调用网络摄像头获得视频数据;   
2.将webcam获取到的数据绘制在canvas中时，同时将可视化面板的UI绘制在canvas中;   
3.视频的本质是连续播放的图片，当图片播放的速度超过每秒24张时，我们将看到连续的动画，当我们以相应的频率重绘canvas上的图像时，即可看到合成后的视频;   
4.如果要获得更加逼真的效果，可以做更多的图像识别方面的扩展延伸，本篇只做抛砖引玉，不再做更深入的探究。   
伪代码片段：   
```js
setInterval(drawImg(),1000/24);
function drawImg(){
    //获得来自webcam的数据并将其绘制在canvas上

}
```

