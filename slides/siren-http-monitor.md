class: middle center inverse

# Siren

## Service Monitor System

---
class: center middle

# What?

---
class: center middle bigfont

Siren是一套服务监测系统，用于**监测服务运行状态**，收集**错误信息**并**及时报警**。

---
class: center middle

# Why?

---
class: middle center middlefont 

- 所有的对外服务都需要进行监测，这是**保证可用性的唯一方法**
- 目前微服务架构的流行会导致需要监测的服务大大增加
- 如果有一套系统能够定义需要被监测的服务，查看服务的运行状态，并及时报警的话，将大大减轻运维难度

---
class: center middle

# Features

---
class: center middle middlefont

- one single binary, no dependency
- material design
- live update based on web socket
- layered design

---
class: center middle

# How?

---
class: middle center

# Architecture

---
layout: true

### Architecture

---
class: middlefont
# Module

系统由如下四部分组成：

- 检查器(Checker)
- 调度器(Scheduler)
- 收集器(Collector)
- 报警器(Alarmer)

---
class: middlefont
# Model

系统有如下数据模型：

- Module：用于将Checker组织到一起，不重要
- Checker：用于定义服务监测内容
- Event: 代表系统中发生的事件

---
layout: false
class: center middle

# Implementation

---
layout: true

### Implementation

---
# Checker

检查器用于定义被监测的服务，目前只实现了对HTTP服务的监测。检查器是一个小的状态机，在三种状态之间进行切换。

- `ok`: 一切正常
- `error_unnoticed`: 出现错误，并且维护人员没有注意到
- `error_noticed`: 出现错误，并且维护人员已经注意到（稍后会解释为什么要区分两种错误状态）

---

# Scheduler

调度器负责检查器的运行的和管理，目前的模型为1:1，一个Goroutine运行一个检查器。

---

# Collector

收集器收集所有的事件，针对事件采取特定的动作，例如，记录事件日志，实时推送事件等。

PS: 在逻辑上，收集器应该是一个独立的层，但是由于时间原因，目前和调度器耦合在一起实现。

- 某个检查器发现服务出错了
- 某个检查器发现服务恢复正常了
- 某个检查器被用户关闭了
- 某个检查器被用户重新激活了

---

# Alarmer

报警器负责向用户报警，收集器在收集到事件以后，分析是否需要报警，如果需要，将事件丢给报警器。

报警器可以采取任何方式进行报警，十分灵活。

PS: 目前报警器只打印一条简单日志。

---
layout: false
class: middle center

# Alarm Overwhelming 💔

---
layout: true

### Alarm Overwhelming

---
# 过度报警

报警系统很容易就会出现过度报警，即维护人员注意到的时候，系统已经产生了大量的报警信息。

我们当然可以采用一定的算法来Throttle报警发送，但是这个算法无法做到准确。

---
# 四种基本情况

考虑如下四种基本情况。

1. *维护人员在线，注意到了报警*

  这是理想情况，系统报警，维护人员处理，系统恢复正常。

2. *维护人员在线，没注意到报警*

  维护人员没有注意到报警，这个时候唯一的正确的做法是继续发送报警信息，直到维护人员注意到，如果Throttle报警信息，只会导致问题不被处理。

3. *维护人员不在线，注意到了报警*

  这种情况下维护人员已经知道系统出了故障，但是此时没有条件修复，但是不希望报警系统继续报警了。

4. *维护人员不在线，也没有注意到报警*

  和情况2类似，系统应该不停进行报警。

---
# 是否报警的依据

通过以上分析，我们可以得知，系统是否报警的唯一根据是：**维护人员是否已经注意到错误**。

这一点无法通过软件进行识别，因此我们选择的做法是：提供UI给维护人员操作。

通过手动点击按钮，维护人员告诉系统他已经注意到了错误。这就是为什么错误分为`error_unnoticed`和`error_noticed`两种的原因。

---
layout: false
class: middle center

# Resources

---
layout: true

### Resources

---

# Front End

- Vue.js
- Vue Router
- Vuex
- Vuetify

---

# Back End

- Go
- fasthttp
- fasthttp-chi
- boltdb
- storm
- logrus

---
layout: false
class: middle center inverse

# 谢谢~😜
