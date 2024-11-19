# ChatGPT Next Web 优化版
> 原项目：[ChatGPTNextWeb](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)
## 新特性
* 优化了主题配色，与企业版颜色一致。
* 添加hitokoto一言，点击可刷新。
* 可修改标题和标题右侧图标。
* 添加公告功能，可解析markdown，更新公告需重启docker容器。
* 以上功能通过环境变量即可需改
## 环境变量
### (可选) 侧边栏主标题，默认是原标题
`SIDEBAR_TITLE`

### (可选) 一言接口地址
`HITOKOTO_URL`

默认是https://v1.hitokoto.cn/

### (可选) 侧边栏logo地址，默认是原图标
`HEADER_LOGO_URL`

### (可选) 公告，
`ANNOUNCEMENT`

支持markdown语法，注意用双引号包裹，避免一些转义问题。后续可能会加读取文本文档实现公告功能，但是现在这样也够用。有新公告会在公告按钮显示红点，点击后即可消除。公告通知原理是将远程公告和本地公告对比，不一样则显示圆点，点击公告按钮后存储远程公告到本地。
### 相关项目
- [ChatGPTNextWeb](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)
- [one-api](https://github.com/songquanpeng/one-api): 一站式大模型额度管理平台，支持市面上所有主流大语言模型
- [new-api](https://github.com/Calcium-Ion/new-api):在One API的基础上进行二次开发.
## 开源协议

[MIT](https://opensource.org/license/mit/)
