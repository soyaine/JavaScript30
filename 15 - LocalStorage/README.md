# 15 LocalStorage

> 作者：©[未枝丫](https://github.com/soyaine)  
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。现在你看到的是这系列指南的第 15 篇。完整指南在 [GitHub](https://github.com/soyaine/JavaScript30)，喜欢请 Star 哦♪(^∇^*)

> 创建时间：2017-07-24    
最后更新：2017-08-10

## 实现效果
我们的目的是使网页模拟菜单的效果，在页面中添加新的菜品，而且在页面刷新之后也不清空。

现在的初始页面中，点击提交按钮（Add Item）时页面默认触发 `submit` 事件，并重新加载页面，这导致重新加载之后的页面中，已丢失刚提交的内容。页面所用到的 CSS 文件已经完成了，我们需要做的是完成 JavaScript 部分的内容，以实现目标效果。

这一个挑战所用时间可能比之前的稍稍长一些，但理解了 localStorage 的机制，想明白菜单的实现之后，就会一目了然了，带上耐心我们开始吧~

## 知识点
- Event
    - [event.preventDefault](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)
    - [eventTarget.addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
- [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/LocalStorage)
    - `localStorage.setItem()`
    - `localStorage.getItem()`
- [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)
    - `JSON.stringify()`
    - `JSON.parse()`

## 过程指南

1. 默认情况下，在表单空间拥有焦点时按下 `Enter` 键或者点击提交按钮，会提交表单，提交时，浏览器会在发送请求给服务器之前触发 `submit` 事件，为了验证这个行为，我们可以添加事件监听后看看效果，此处先写一个处理函数：
    ```js
    function addItem(e) {
      console.log('hello');
    }

    addItems.addEventListener('submit', addItem);
    ```
    点击按钮后发现 `submit` 事件触发后的结果是， Console 中闪现 hello 后刷新整个页面，这是 `submit` 的默认行为，在当前的场景中不适用，所以我们需要先去除此事件的默认行为。
    ```js
    function addItem(e) {
      e.preventDefault();
    }
    ```

2. 下面我们开始改造 `addItem` 方法，以实现我们的功能。  
   首先在事件监听中，`this` 可以获取当前 form 即我们为其添加事件监听的 `addItem` 元素，所以可以借此方便的获取输入框中的值。在 `addItem()` 方法中获取输入，并构造一个对象 `item` 来存储这个信息，：
    ```js
    /* function addItem(){} 中 */
    const text = this.querySelector('[name=item]').value;
      const item = {
          text, // ES6中对 text: text, 的简写
          done: false // 为后续的勾选做准备
      }
    ```
3. 把对象放入此前声明好的数组 `items`，同时更新数据，包括页面中的 HTML 内容、LocalStorage。
    ```js
    /* function addItem(){} 中 */
    items.push(item);
    this.reset();// 以清空 input 中正在输入的值
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    ```
    - **HTML 内容更新**  
        声明一个 `populateList` 方法来更新页面的内容。接收需要更新的数组作为参数，根据数组里的内容构造一组 `<li>` 组成的列表，并且加上一些标识信息，以助于之后需要实现的选中功能。
        ```js
        function populateList(plates = [], plateslist) {
            plateslist.innerHTML = plates.map((plate, i) => {
                return `
                  <li>
                      <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} >
                      <label for="item${i}">${plate.text}</label>
                  </li>
                `;
            }).join('');
        }
        ```
    - **LocalStorage 更新**  
        我们利用 LocalStorage 把信息存到本地，从而可以保证刷新后内容不变。但使用 `localStorage` 的时候，直接把 `items` 传入得到的值是 [object Object]，所以需要在把数据传进去之前就把内容转换成 String 类型的数据，之后读取时也使用 `JSON.parse()` 来将数据转换成 JSON 格式。