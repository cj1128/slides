class: center, middle, inverse

# CSS Grid

---
class: center, middle, inserver

# grid-template-rows/columns

---
class: center, middle

## `CSS Grid`为二维栅格布局解决方案，我们的第一个问题是：**如何定义一个二维栅格？**

---
class: middle

最基本的属性肯定有：

1. 有多少行？(`grid-template-rows`)
2. 有多少列？(`grid-template-rows`)
3. 行间距是多少？(`grid-row-gap`)
3. 列间距是多少？(`grid-column-gap`)

下面我们来做一个最简单的Grid。

我们的演示项目由三个文件组成，`index.html`，`basic.css`以及`index.css`。

其中，`basic.css`定义基础CSS样式不再改动，`index.css`为我们整个讲解过程中需要修改的样式文件。

---
class: middle, code-s

### index.html

```html
<html>
    <head>
        <link rel="stylesheet" href="basic.css">
        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        <div class="container">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
        </div>
    </body>
</html>
```

---
class: middle, code-ss

### basic.css

```css
body {
    margin: 0;
    background: #ffeba4;
    font-size: 16px;
    font-family: PingFang SC;
    padding: 20px;
}
html, body {
    height: 100%;
    box-sizing: border-box;
}
.container {
    border: solid 1px #bbb;
    height: 100%;
}
.container > div {
    text-align: center;
    font-size: 2rem;
    color: #ffeba4;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.container > div:nth-child(4n+0) {
    background: #8bc7ab;
}
.container > div:nth-child(4n+1) {
    background: #ff635e;
}
.container > div:nth-child(4n+2) {
    background: #ffc552;
}
.container > div:nth-child(4n+3) {
    background: #73c96f;
}
```

---
class: code-s

### index.css

```css
.container {
    display: grid;
    grid-template-columns: 100px 100px 100px; // 三列，每列100px
    grid-template-rows: 50px 50px; // 两行，每行50px
    grid-row-gap: 5px; // 行间距
    grid-column-gap: 10px; // 列间距
}
```

![](http://ww1.sinaimg.cn/large/9b85365dgy1fn4sgbodu3j20n40cxweo)

---
class: middle, code-s

### unit/fr

上图中，每个格子占据的尺寸是固定的，为`100px * 50px`的矩形，不管父元素多大，格子只有这么大，这显然不够响应式。

那么，有没有类似`flexbox`中的`flex: 1`的选项，使得每个元素占据的尺寸可以随着父元素调整呢？有，这个新单位叫做`fr`，*fraction*的缩写。

如下的代码定义了三行两列的响应式栅格，每个格子会占据三分之一的宽度，二分之一的高度（除去行间距和列间距）。

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-row-gap: 5px;
    grid-column-gap: 10px;
}
```

---

class: middle

![](http://ww1.sinaimg.cn/large/9b85365dgy1fn5kfcqiblj20ja0aqglp)

---

class: middle

### function/repeat

可以看到，上面我们在定义栅格的时候，在重复编写`1fr`，因此CSS提供了`repeat`函数来减轻我们的负担。

`repeat`函数接收两个参数，第一个为重复的次数，第二个为重复的内容。

上面的代码可以使用`repeat`简写如下。

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 5px;
    grid-column-gap: 10px;
}
```

---

class: center, middle

# grid-row/column

---
class: middle

## 定义了栅格以后，每个元素会按顺序被放置到每个格子中，默认为从左到右，从上到下。这时候引出另外一个问题：**如何调整元素的位置？**

---
class: middle

思考这样一个问题：在一个`2x4`的栅格系统中，如何让6号元素占据三列，实现如下的效果？

```css
.container {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: 50px 100px;
    grid-row-gap: 5px;
    grid-column-gap: 10px;
}
```

![](http://ww1.sinaimg.cn/large/9b85365dgy1fn5kazbhy8j20ja0asmx9)

---
class: middle

### grid line index

这时我们使用的属性为`grid-row`和`grid-column`。这两个属性定义每个元素行和列的起始地址，这个地址为**栅格线的编号，从1开始，也可以反向从-1开始**。

例如，一个`2x3`两行三列的栅格，行有三条线，分别是1，2，3，列有四条线，1，2，3，4。

如果我们指定某一个元素的`grid-row`属性为`1 / 3`表示，它所占的空间为第一条线到第三条线之间，即跨越两行，这个语法也可以写作`1 / span 2`，如果该元素默认的行起始位置就是1的话，`1 / span 2`可以进一步简写为`span 2`。

`grid-column`的使用方法是一样的。

实际上，`grid-row: 1 / 3`是一种简写，它等同于：`grid-row-start: 1`和`grid-row-end: 3`，在99%的情况下，我们都会使用简写方法。

---

栅格线如下所示，使用如下的代码，我们可以让一个元素占据红色区域。

```css
.item {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}
```

![](http://ww1.sinaimg.cn/large/9b85365dgy1fn5mufodjgj20p30gm74o)

---
class: middle

现在回到开头的问题，解决方法自然已经不言而喻。

```css
.container > div:last-child {
    grid-column: 2 / 5;
}
```

---
class: middle, center

# grid-template-areas/grid-area

---
class: middle

除了使用`grid-row`和`grid-column`来指定元素所占的区域以外，CSS Grid提供了另外一种方法`grid-template-areas`，使用这个属性，我们可以对整个栅格系统的区域进行命名，然后使用`grid-area`属性指定元素所在的栅格区域。

---
class: middle

考虑如下的经典布局，其中，`HEADER`和`FOOTER`宽度流动，高度固定。`MENU`宽度固定，高度流动，`CONTENT`高度和宽度全部流动。

![](http://ww1.sinaimg.cn/large/9b85365dgy1fn5mym3kpsj20ka0akq37)

---
class: middle

### index.html

```html
<div class="container">
    <div class="header">HEADER</div>
    <div class="menu">MENU</div>
    <div class="content">CONTENT</div>
    <div class="footer">FOOTER</div>
</div>
```

---
class: middle

### index.css

```css
.container {
    display: grid;
    grid-template-columns: 100px repeat(11, 1fr);
    grid-template-rows: 50px 1fr 50px;
    grid-row-gap: 5px;
    grid-column-gap: 5px;
}

.header {
    grid-column: 1 / -1;
}

.content {
    grid-column: 2 / -1;
}

.footer {
    grid-column: 1 / -1;
}
```

---
class: middle

上图布局使用的栅格是一个`3x12`的栅格系统，现在我们使用`grid-template-areas`属性对每一个格子所属的区域进行命名。

`grid-template-areas`属性值为多个字符串，每个字符串代表一行，每个字符串中，标识符使用空格分割，每个标识符代表格子所在的区域名称。

```css
.container {
    display: grid;
    grid-template-columns: 100px repeat(11, 1fr);
    grid-template-rows: 50px 1fr 50px;
    grid-template-areas:
      "h h h h h h h h h h h h"
      "m c c c c c c c c c c c"
      "f f f f f f f f f f f f";
    grid-row-gap: 5px;
    grid-column-gap: 5px;
}
```

---
class: middle

在上面的基础上，我们不再需要指定每个元素的`grid-row`和`grid-column`属性，只需要使用`grid-area`指定它们所在的区域即可。

代码可以简化如下。

```css
.header {
    grid-area: h;
}

.menu {
    grid-area: m;
}

.content {
    grid-area: c;
}

.footer {
    grid-area: f;
}
```

---

`grid-area`最灵活的地方在于，我们只要修改`grid-template-areas`定义，布局就会变化，调试将变得极其简单。

例如，我们想让`MENU`占据三行，而不是中间一行，只需要修改两个字母。

```css
.container {
    ...
    grid-template-areas:
      "m h h h h h h h h h h h"
      "m c c c c c c c c c c c"
      "m f f f f f f f f f f f";
}
```

<img width="70%" src="http://ww1.sinaimg.cn/large/9b85365dgy1fn5nk68er9j20jl0b8wer" />

---
class: center, middle

# auto-fit/minmax

---

## 考虑如何制作如下的画廊布局？

画廊布局的特点是：基本布局为一个栅格系统，但是元素的尺寸各异，有的是`1x1`，有的是`1x2`，有的是`2x2`等等，需要保证整体有一个流畅的排版效果，如果能做到响应式，那就更好了。

最终我们要实现的效果如下图所示：

<video controls autoplay src="/slides/css-grid/video1.mp4" width="80%" loop></video>

---
class: middle

### index.html

简单起见，这里我们使用`div`来表示图片，一共有四种类型，普通的，`class=h`的表示该图片为水平图片，比较长，`class=v`的表示该图片为竖直图片，比较宽，`class=big`的表示该图片既长又宽。

```html
<div class="container">
  <div class="h">1</div>
  <div>2</div>
  <div>3</div>
  <div class="v">4</div>
  <div>5</div>
  <div class="big">6</div>
  <div>7</div>
  <div class="h">8</div>
  <div>9</div>
  <div class="big">10</div>
  <div>11</div>
  <div class="v">12</div>
  <div>13</div>
  <div class="big">14</div>
  <div>15</div>
</div>
```

---
class: middle

### index.css

```css
.container {
  display: grid;
  grid-row-gap: 5px;
  grid-column-gap: 10px;
}

.h {
  gird-column: span 2;
}

.v {
  grid-row: span 2;
}

.big {
  grid-column: span 2;
  grid-row: span 2;
}
```

---
class: middle

### auto-fit

## 首先我们需要解决的问题是：如何让列的数目动态变化？

答案是使用`repeat`函数的特殊关键参数，`auto-fit`。这样会使得栅格系统自动根据目前的宽度计算能够容纳的列的数目。

---

```css
.container {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, 100px);
  grid-rows: 100px 100px;
}
```

<video controls autoplay src="/slides/css-grid/video2.mp4" width="80%" loop></video>

---
class: middle

上面的布局虽然实现了列数目的动态变化，但是有一个问题，在视口变小，由`n`列变成`n-1`列的过程中，直到临界点之前，右边的空间会突兀的显示在那里。

也就是说，如果每个格子宽100px，我们的视口是350像素的话，那么只会显示3个格子，同时右边多出来50像素。

这是非常不美观的效果，能不能做到说：当宽度不够4个格子的时候，多出来的平分给当前的三个格子，当宽度够4个格子的时候，显示4个格子？

---
class: middle

### minmax

很明显，这一次我们需要研究`repeat`函数的第二个参数，因为第二个参数指定栅格的大小，而我们希望栅格的大小动态变化。

CSS提供了`minmax`函数来帮助我们实现这个效果。

`minmax`表示栅格的尺寸在一个范围之间，使用`minmax(100px, 1fr)`表示栅格的最小尺寸为100px，而最大尺寸，为父元素的宽度。

---

```css
.container {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-rows: 100px 100px;
}
```

<video controls autoplay src="/slides/css-grid/video3.mp4" width="80%" loop></video>

---
class: middle

### grid-auto-rows

## 思考这样一个问题：如果我们指定栅格系统是`2x3`，但实际有7个元素怎么办？

这时，CSS会自动为我们创建第三行，这样的行叫做`implicit row`，默认情况下，`implicit row`会均分剩余的高度。

我们可以使用`grid-auto-rows`属性来指定`implicit row`的高度。上面的代码可以被改写为：

```css
.container {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 100px;
}
```

---
class: middle

还剩下最后一个问题，观察上面的布局可以发现，有些格子会出现空格的情况。这显然不是我们想要的。

出现这个情况的原因很好理解，我们可以来模拟一下布局引擎的工作原理：从第一个格子开始，尝试放置第一个元素，没问题，移动到第二个格子，放置第二个元素，不行，比如这个格子被第一个元素占据了，继续移动到第三个格子，试图放置第二个元素，以此类推。

所以，解决出现空格的问题，我们需要修改默认的布局方式，使用`grid-auto-flow: dense`属性告诉布局引擎：如果当前栅格无法放置当前元素，可以将后面适合的元素放进来，这样就不会出现任何空格了。

---
class: middle

最后，实现一个响应式自动排版的画廊系统，我们只需要几行非常简单的CSS代码。

```css
.container {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 100px;
  grid-auto-flow: dense;
}
```

<video controls autoplay src="/slides/css-grid/video1.mp4" width="70%" loop></video>

---

以上就是CSS Grid的核心内容，当然还有一些其他的属性这里没有提及，因为它们不够关键，留给大家自己去探索了。

- named lines
- justify-content
- align-content
- justify-items
- align-items

---
class: center, middle, inverse

# Thank you

