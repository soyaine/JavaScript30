# 14 JS中的引用与复制

> 作者：©[未枝丫](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 14 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-07-19    
最后更新：2017-07-21

## 实现效果

这个部分主要是帮助你通过不同的语句来感受在 JavaScript 中对不同类型数据的引用（Reference）和复制（Copy）的区别。由于操作在 Console 中进行，所以请直接运行页面后打开 Console，边编辑代码，边查看结果。

## 过程指南

1. 首先从 String、Number、Boolean 类型的值开始。
    ```js
    let age = 100;
    let age2 = age;
    console.log(age, age2); // 100 100
    age = 200;
    console.log(age, age2); // 200 100
    ```
    先声明了一个 Number 型的变量 `age`，并将此变量赋值给另一个变量 `age2`，这时两个变量的值都是 100。
    然后赋给 `age` 新的值，可见对 `age` 的修改并不会对 `age2` 造成影响。
2. 那对于数组来说，情况是否一样呢？下面我们来看看数组。
    ```js
    const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
    const team = players;
    console.log(players, team);
    ```
    延续上面的思路，先声明一个数组 `players`，并将其赋值给 `team`。试想一下，如果需要修改 `team` 中的值，我们可以如何操作？或许可以这样？
    ```js
    team[3] = 'Lux';
    ```
    来看看发生了什么。
    ```js
    console.log(players, team); 
    // ["Wes", "Sarah", "Ryan", "Lux"] ["Wes", "Sarah", "Ryan", "Lux"]
    ```
    WOW 原数组 `plaryers` 也被修改了。为什么会这样？因为 `team` 只是这个数组的引用，并不是它的复制。`team` 和 `players` 这两个变量指向的是同一个数组。  
    所以如何解决这个问题？接下来我们开始真正的复制吧！
     - **方法一 [`Array.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)** 
        
        由于运行 `slice` 得到的结果是一个对原数组的浅拷贝，原数组不会被修改。所以如果修改这两个数组中任意 一个，另一个都不会受到影响。
        ```js
        const team2 = players.slice();
        team2[3] = 'Lux2';
        console.log(players, team2); 
        ```
     - **方法二 [`Array.prototype.concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)**
        
        `concat()` 方法是用来合并数组的，它也不会更改原有的数组，而是返回一个新数组，所以可以将 `players` 数组与一个空数组合并，得到的结果就符合预期了。
        ```js
        const team3 = [].concat(players);
        team3[3] = 'Lux3';
        console.log(players, team3); 
        ```
     - **方法三 ES6 [扩展语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)**
     
        扩展语法可以像扩展参数列表一样来扩展数组，效果与上述方法类似，但比较简洁。
        ```js
        const team4 = [...players];
        team4[3] = 'Lux4';
        console.log(players, team4);
        ```
     - **方法四 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)**
     
        此外使用 Array 创建新的数组实例的方法也是可行的。
        ```js
        const team5 = Array.from(players);
        team5[3] = 'Lux5';
        console.log(players, team5);
        ```    
    
   除此之外，还可以用 `push` 这样的方法。数组部分已经介绍完毕，下面我们进入 Object 类型数据的试验吧~
   
3. 对于 Object 数据，我们用一个 `person` 对象来试试。
   
   先声明对象：
   ```js
   const person = {
      name: 'Wes Bos',
      age: 80
    };
   ```
   
   然后思考一下如何可以取得它的复制，试试想当然的做法：
   ```js
   const captain = person;
   captain.number = 99;
   console.log(person, captain);
   // Object {name: "Wes Bos", age: 80, number: 99} 
   // Object {name: "Wes Bos", age: 80, number: 99}
   ```
   这样好像行不通，`person` 的值也被更改了，那该如何才能真正复制呢？

   - **方法一 [`Object.assign()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)**
   
     使用 `Object.assign(target, ...sources)` 时，后来的源对象的属性值，将会覆盖它之前的对象的属性。所以可以先复制 `person` 之后，再赋给属性新的值。

     ```js
     const cap2 = Object.assign({}, person, { number: 99, age: 12 });
     console.log(cap2); // Object {name: "Wes Bos", age: 12, number: 99}
     ```
   - **方法二 JSON 转换**
   
     利用 JSON 可以先将对象转成字符串的格式，然后再把它转成 JSON，从而实现复制。
     
     ```js
     const wes = {
       name: 'Wes',
       age: 100,
       social: {
         twitter: '@wesbos',
         facebook: 'wesbos.developer'
       }
     };

     const dev = Object.assign({}, wes);
     const dev2 = JSON.parse(JSON.stringify(wes));
     console.log(wes);
     console.log(dev);
     console.log(dev2);
     ```
  
  最后需要注意的是：在前面的例子里面，我们用的数组和对象都只是一层嵌套，Lodash 有一个深度复制的方法，但你使用之前需要多考虑一下。
  
OVER~\(^o^)/~

















