# 02 纯 JS、CSS 时钟 中文指南

> 作者：©[未枝丫](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 2 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2016-12-21    
最后更新：2017-01-06

## 实现效果

![实现效果 by soyaine](https://cl.ly/0y1C2T1z3p2R/Screen%20recording%202016-12-23%20at%2012.30.25%20PM.gif)

文档中已经给出了 HTML 结构，表盘内有三个 `div` 对应三个指针。只需要添加一些 CSS 效果，然后用 JavaScript 动态更新指针的状态即可。

[看在线效果](http://soyaine.github.io/JavaScript30/02%20-%20JS%20%2B%20CSS%20Clock/index-SOYAINE.html)

## 关键要点

1. 表盘上指针的样式：旋转的效果
2. 获取实时的时间
3. 每一秒改变一次指针状态

**涉及到的特性：**
- `transform-oragin`
- `transform: rotate()`
- `transition`
- `transition-timing-function: cubic-bezier(x, x, x, x)`
- `setInterval(callback, time)`
- `new Date()`

## 过程指南

### CSS 部分

1. 调整指针的初始位置以及旋转的轴点
    [transform-oragin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
    
    ```css
    transform-oragin: 100%; // 或者可以用 right
    ```

2. 调整时钟指针跳动时的过渡效果
    ```css
    transition: all .5s;
    ```

3. 设置指针成为回弹的形式
	设置 `transition-time-function` 的值，以实现秒针“滴答滴答”的效果。此外注意 `transform` 中的 `rotate` （旋转）属性由角度来控制，可以试着在页面上修改这个参数来查看效果。
	
    ![图片示例](https://cl.ly/33260X2a0K41/Screen%20recording%202016-12-21%20at%2010.35.13%20AM.gif)
	
	**Chrome 调试技巧**：
	- 对于角度这样的数值，点击后按住 `Shift` 或者 `Ctrl` 不放，按上下箭头可以快速调值。
	- 点击上图中图标可以图形化调整 cubic-bezier 的值。

4. 用伪元素给表盘添加一个中心点
    ```css
        .clock-face:after {
            width: .8em;
            height: .8em;
            left: 50%;
            top: 50%;
            position: absolute;
            display: block;
            transform: translate(-50%, -50%);
            content: '';
            background-color: #a8c5d1;
            border-radius: 50%;
            box-shadow:
                    0 0 0 2px rgba(0,0,0,0.1),
                    0 0 10px rgba(0,0,0,0.2);
        }
    ```
	
	这里有一个小细节，指针旋转轴与表盘中心并不重合。解决办法是将指针设置为垂直居中，我采用的办法是给指针设置 `margin-top: -height/2` ，由于每个指针高度不同，所以需要给每个指针指定。
	
### JS 部分

这个部分的指南我没有写太多的代码，主要是便于你自己思考操作，如果实在需要看代码是怎么写的，请看 index-SOYAINE.html 文件。

1. 利用定时器自动更新时间
	定时器 `setInterval` 可以每隔一段固定的时间将操作放入执行队列，利用这个特性，加入页面后每秒更新一次时间，以实现秒针转动的效果。
	
	```javascript
	 setInterval(setDate, 1000);
	 // setDate 为每 1000 毫秒触发的 function
	 ```
	
2. 获取三个指针对应的 HTML 元素，留待后续操作
	
3. 编写 setDate 方法
	1. 创建 Date 对象
	2. 获取当前时间的小时、分钟、秒
	3. 利用此刻的数据，计算每个指针对应的角度
		```javascript
		const secondDeg = 90 + (second / 60) * 360;
		```
		以秒针为例，由于此页面初始状态中秒针为水平的，所以零点时（时间起始位置）应用到元素上的 `rotate` 旋转角度值应该为 90°。秒针转一圈为 60s，所以每一秒对应表盘上的角度值即为 (...s / 60s) * 360°。
		
		Wes Bos 给出的解决方案中，时针是和秒针一样每一小时跳动一次，若要模拟更加真实的时钟，要使时针在一小时内缓慢的移动到下一个时间点。所以可以利用上分钟，计算每一分钟对时针的角度影响，将加到时针角度上即可。
		
		```javascript
		const hourDeg = (90 + (hour / 12) * 360 + (min / 12 / 60) * 360);
		```
		
	4. 将角度值赋值给 HTML 元素的 `style` 中的 `transform` 属性

## 延伸思考

> 2017-01-06 更新完善，感谢 [@cody1991 提的 issue](https://github.com/soyaine/JavaScript30/issues/1) 

此处存在一个小瑕疵，当秒针旋转一圈之后回到初始位置，开始第二圈旋转，角度值的变化时 444° → 90° → 96° .... 这个过程中，指针会先逆时针从 444° 旋转至 90°，再继续我们期望的顺时针旋转，由于秒针变换时间只有 0.05s，所以呈现的效果就是秒针闪了一下，如果想要观察细节，可以将 `.second` 设为 `transition: all 1s`。要解决这个问题，目前找到了两种解决办法：

#### 方法一

在这个特殊点将指针的 `transition` 属性去掉，由于距离短、时间短，将逆时针回旋的过程瞬间完成。

```js
if (secondDeg === 90) secHand.style.transition = 'all 0s';
else secHand.style.transition = 'all 0.05s';

if (minDeg === 90) minHand.style.transition = 'all 0s';
else minHand.style.transition = 'all 0.1s';
```

#### 方法二

既然引发问题的是角度的大小变化，那就可以对这个值进行处理。此前的代码中，每秒都会重新 new 一个 Date 对象，用来计算角度值，但如果让这个角度值一直保持增长，也就不会出现逆时针回旋的问题了。

这是 @cody1991 提供的思路。只在页面第一次加载时 new 一次 Date 对象，此后每秒直接更新角度值。

```js
let secondDeg = 0,
minDeg = 0,
hourDeg = 0;

function initDate() {
	const date = new Date();
	const second = date.getSeconds();
	secondDeg = 90 + (second / 60) * 360;
	const min = date.getMinutes();
	minDeg = 90 + (min / 60) * 360 + ((second / 60) / 60) * 360;
	const hour = date.getHours();
	hourDeg = 90 + (hour / 12) * 360 + ((min / 60) / 12) * 360 + (((second / 60) / 60) / 12) * 360;
}

function updateDate() {
	secondDeg += (1 / 60) * 360;
	minDeg += ((1 / 60) / 60) * 360;
	hourDeg += (((1 / 60) / 60) / 12);
	
	secHand.style.transform = `rotate(${ secondDeg}deg)`;
	minHand.style.transform = `rotate(${ minDeg }deg)`;
	hourHand.style.transform = `rotate(${ hourDeg }deg)`;
}

initDate();
setInterval(updateDate, 1000);
```

问题解决。大功告成！