# Bitcoin && Blockchain

## Scenario

# 怎样转账给对方？

- 下载客户端

比特币的整套协议都是开源的，因此任何人都可以根据协议制作相关的比特币软件（比如钱包），这里我们下载比特币的官方实现，Bitcoin Core。

- 转账，Send

选择Send标签，填写对方的比特币地址，转账的比特币金额，点击发送即可。

# Introduction

## History

2008年，论文： *Bitcoin: A Peer-to-Peer Electronic Cash System*，作者，Satoshi Nakamoto

2009年，Bitcoin网络建立，Satoshi发布了参考实现，Bitcoin Core

## Features

去中心化，分布式，P2P系统

全世界流通

匿名交易

由算法控制，不受外部影响

总量固定

# Questions?

- 比特币是怎么产生的？

- 怎样证明比特币的所有权？

- 怎样知道我的余额？

- 怎样防止他人盗窃我的比特币？

- 会不会弄丢比特币？

# How Bitcoin Works?

## Keys, Addresses and Signatures

# 原理

ECDSA(Elliptic Curve Digital Signature Algorithm)电子签名系统

签名的特点：

- 只有自己可以签
- 任何人都可以验证
- 和特定的文件绑定

SK -> PK -> Address

sign := Sign(message, SK)

Verify(PK, message, sign) == true

PK可以作为一种身份系统来用。

# 示例

拥有SK是证明对地址为Address的比特币所有权的唯一途径。

SK是一个256位（bit, 32 byte）的整数，可以使用软件随意生成。2^256大约为10^77，整个宇宙的所有原子为10^80。

SK: f46b86f8d9b7d7008b6a7f940ba782663e2f06eccea272a375ee49d74ec1e9f8

PK(Uncompressed): 04ab20170e07d7f701ce7c4e5fa30bac0841c0aab6a448c7ee848af3b1a7e1cb7f355f06e18968252727fcf45170066d41652545d966494c0a22d362cca848ed28 
PK(Compressed): 02ab20170e07d7f701ce7c4e5fa30bac0841c0aab6a448c7ee848af3b1a7e1cb7f

65 bytes, 1 byte 0x04, 32 bytes corresponding to X coordinate, 32 bytes corresponding to Y coordinate

Address(Compressed): 18SGifBJgDWnARXaHUmM8E3FJAHnLcxZhW
Address(Uncompressed): 13RaGhaUbi6Y5A8iRUTyURjPsc6fJGWo9s

[How to generate public keys](https://github.com/libbitcoin/libbitcoin-explorer/wiki/Payment-Address-Deconstruction)

```bash
```

# Answer of questions

- 怎么证明比特币的所有权？

拥有比特币地址对应的SK。

- 怎样防止他人盗窃我的比特币？

不要让他人获取到你的SK即可。

- 会不会弄丢比特币？

当然会，如果你弄丢了你的SK。

## Transactions

交易的核心是UTXO, Unspent Transaction output。

交易的核心是输入和输出，将输入地址的钱转移到输出地址，每一笔交易必须要“平衡”，即所有输入账户的钱都必须转移走，比特币没有余额的概念。

## Mining and Consensus

## Blockchain

