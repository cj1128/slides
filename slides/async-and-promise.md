class: center, middle, inverse

# Async && Promise

---
class: center, middle, inverse

# Async

---
layout: true

### Async

---

# What's Async?

我们都知道JS是一个*异步*的语言，那么问题来了：什么是异步？

--

理解异步，我们需要首先理解另一个概念：*同步*。

同步指的是**前面的代码执行完毕以后，后面的代码才会执行**。而异步与之相对，**前面的代码没有执行完毕，后面的代码就开始执行**。

```javascript
sendMessage() // 这是一个同步调用
g() // g函数调用时，我们可以确认：message已经发出

sendMessageAsync() // 这是一个异步调用
m() // m函数调用时，我们无法确定消息是否发出了，可能发出了，可能没发出，没有任何保证
```

---

# Why Async?

异步解决了什么问题？

--

考虑如下代码。

```javascript
var content = readBigFile()
// 上面的代码读取一个大文件，是一个费时的IO操作，
// 同步情况下，只有在文件读取完毕以后，后面的代码才会执行
// 这段时间内，CPU为闲置状态
var val = calcSomething()
```

异步解决的是计算机中一个十分普遍的问题：**充分利用CPU，减少CPU闲置时间**。

```javascript
readBigFileAsync(function(err, content) {
  doSomethingAboutContent(content)
})
// 如果是异步调用，那么上面的函数会立即返回，
// 下面的函数将得到执行，CPU在等IO数据的时间段内没有闲置，
// 继续执行别的代码
var val = calcSomething()
```

---
class: code-s

# Problem with Async

异步又引入了什么问题？

--

**编程复杂度**。

对机器来说，异步是一个高效的方案，但对人来说，异步却不吻合人类的思考模型。人类的思维是线性的，即按顺序思考问题，但异步却不是线性的。举个简单的例子，我们要完成`a`，`b`，`c`三件事，彼此无关，等三件事都做完了以后，打印"ok!"。

```javascript
// 先来看同步代码，非常简单
a() 
b()
c()
console.log("ok!")
// 在来看异步代码
var doneCount = 0
var callback = function() {
  doneCount++
  if(doneCount === 3) {
    console.log("ok!")
  }
}
a(callback)
b(callback)
c(callback)
```


---

# Async in JS

在JS中，主要有以下几个异步API:

- AJAX(XMLHTTPRequest)
- setTimeout / setInterval

我们可以利用`setTimeout`来构造自己的异步函数。

```javascript
function myAsyncFunc(callback) {
  setTimeout(cb, 0)
}
```

思考如下问题：直接调用`callback`和调用`myAsyncFunc`有什么区别？

---
name: callback

# Callback Hell

异步函数因为立即返回，因此自然需要一种机制来让我们在函数执行完毕以后采取操作，最自然的做法就是回调。但是在复杂的异步情况下，回调会带来问题。

考虑如下问题：睡眠1000, 2000, 3000, 4000ms以后执行函数f1, f2, f3, f4。

```javascript
setTimeout(function() {
  f1()
  setTimeout(function() {
    f2()
    setTimeout(function() {
      f3()
      setTimeout(function() {
        f4()
      }, 4000);
    }, 3000);
  }, 2000)
}, 1000)
```

可以看到，当我们需要对多个异步进行管理时，很容易会产生一种情况：**回调地狱**。

---
class: center, middle, inverse
layout: false

# Promise

---

layout: true

### Promise

---

# Concept

Promise也叫*Future*，中文含义为*承诺*，顾名思义，Promise使用一个对象来封装异步状态，这个对象承诺在未来给你一个值。

一个Promise有三种状态：

- Resolved: 成功
- Rejected: 失败
- Pending: 待定

---

# Construct Promise

我们可以使用ES6提供的`Promise`构造函数来构造Promise。

```javascript
// p1为一个在1000ms以后以 "ok" 值Resolve的Promise
var p1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve("ok")
  }, 1000)
})

// p2为一个在1000ms后以 "error" 值Reject的Promise
var p2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    reject("error")
  }, 1000)
})
```

---

# Core Methods

对于Promise对象，我们有两个核心方法来操作它，每个方法都接收一个函数作为参数。

- then: 当Promise Resolve时，执行传入的函数
- catch: 当Promise Reject时，执行传入的函数

```javascript
var p = getPromise() // this is a promise
p.then(val => {
  console.log("resolved!")
}).catch(err => {
  console.log("rejected!")
})
```

---

# Catch is a syntax sugar

实际上，`catch`只是一个语法糖，Promise只有一个核心方法`then`，`then`方法接收两个函数，第一个参数为Resolve时执行的函数，第二个参数为Reject时执行的函数。

`catch(func)`等于`then(null, func)`

```javascript
var p = getPromise()
p2.then(val => {
  console.log("resolved", val)
}, err => {
  console.log("rejected", err)
})
```

---

# Thenable

每一个Promise调用`then`以后，都会返回一个新的Promise，从而实现链式调用。

至于新的Promise是怎样的一个Promise，这里面设计到一个复杂的规则，具体见[Promise A+标准](https://promisesaplus.com/)。

我们只要记住两个原则：

- 函数返回一个值(Primitive，数组， 对象)，那么Then会返回一个新的Promise，这个Promise以这个值Resolve。
- 函数返回一个Promise，Then也就返回这个Promise

```javascript
p.then(val => {
  console.log(val)
  return 123
}) // then返回一个以123 resolve的Promise
  .then(val => {
    console.log(val) // 123
    const p = Promsie.resolve("hello world")
    return p
  }) // then返回的Promise就是p
  .then(val => {
    console.log(val) // hello world
  })
```

---

# Common Utils

下面我们来看一些常用的Promise辅助函数。

```javascript
// 构建一个以val立即Resolve的Promise
Promise.resolve(val) 

// 构建一个以val立即Reject的Promise
Promise.reject(val) 

// 构建一个Promise，在所有Promise Resolve以后Resolve
// 在任一Promise Reject以后Reject
Promise.all([p1, p2, p3]) 
```

---
class: code-s

# Promise Made Easy

现在，我们来用Promise来解决之前的[回调地狱](#callback)问题。

```javascript
function makePromise(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(null) // 这里的值并不重要
    }, duration)
  })
}
makePromise(1000)
  .then(() => {
    f1()
    return makePromise(2000)
  })
  .then(() => {
    f2()
    return makePromise(2000)
  })
  .then(() => {
    f2()
    return makePromise(3000)
  })
  .then(() => {
    f2()
    return makePromise(4000)
  })
```

---

# Better Way

上面的Promise解法虽然看起来比回调的更清楚，因为使用扁平的方法调用替代了嵌套的回调，但是似乎并没有多么的*高级*，其实Promise的威力不止于此，我们来看一个更加高级的解法。

```javascript
[
  [1000, f1], 
  [2000, f2], 
  [3000, f3], 
  [4000, f4],
].reduce((acc, config) => {
  return acc.then(() => {
    return makePromise(config[0]).then(() => {
      config[1]()
    })
  })
}, Promise.resolve())
```

---
class: code-s

# Promise Flow

Promise通过简洁的方法调用(`then`和`catch`)来管理异步状态，从而使得复杂的异步调用关系变得十分清晰。

思考下面代码的执行流程，即：每一个函数成功或者失败(Resolved / Rejected)时，代码的执行流是怎样的。

```javascript
asyncThing1()
  .then(function() {
    return asyncThing2();
  })
  .then(function() {
    return asyncThing3();
  })
  .catch(function(err) {
    return asyncRecovery1();
  })
  .then(function() {
    return asyncThing4();
  }, function(err) {
    return asyncRecovery2();
  })
  .catch(function(err) {
    console.log("Don't worry about it");
  })
  .then(function() {
    console.log("All done!");
  })
```

---

![](http://ww1.sinaimg.cn/large/9b85365dgy1fiv1fg6spaj20pm0mwgpg)

---
# Quiz: how to render a story?

思考如下问题：

>我们要渲染一段故事，getStory()接口返回一个story对象，包含标题（heading）和每个章节的URL（charpterURLs），如何做到最优化渲染？

试试看用Callback和Promise两种方法来编写，感受一下Promise的优点😎。

---
class: center, middle, inverse
layout: false

# Async & Await

---
layout: true

### async && await

---
# We love syntax sugar

ES7借鉴`C#`，引入了`async`和`await`关键字，用来进一步简化Promise的编写，用法非常简单。

`async`用于声明一个异步函数，函数被调用时返回一个Promise，Promise以函数的返回值Resolve，如果函数throw error的话，那么Promise以那个Error Reject。

**`await`只能在异步函数内才可以使用**，用于等待另一个异步函数调用完毕，如果该异步函数对应的Promise Resolve，那么`await`返回值，如果该Promise Reject，那么`await`会丢错。

```javascript
// 声明一个异步函数
async a() {
  reutrn 123
}

// 调用一个异步函数返回一个Promise
a().then(val => console.log(val)) // 输出：123

async b() {
  const v = await a() // v的值为123
  console.log(v)
}

b() // 输出：123
```

---
# Better and cleaner code

考虑下面的Promise代码，下载数据，如果出错，下载备份数据，然后处理数据，返回。

```javascript
function getData() {
  return downloadData
    .then(val => processData(val))
    .catch(err => {
      return downloadFallbackData.then(val => processData(val))
    })
}
```

使用`async`和`await`重构以后，更加清楚，和同步代码看起来一模一样了~

```javascript
async function getData() {
  let v;
  try {
    v = await downloadData()
  } catch {
    v = await downloadFallbackData()
  }
  return processData(v)
}
```

---
class: center, middle, inverse
layout: false

# Thank you😜
