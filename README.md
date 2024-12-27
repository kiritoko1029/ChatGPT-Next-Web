# ChatGPT Next Web 优化版
> 原项目：[ChatGPTNextWeb](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)
## 新特性
* 优化了主题配色，与企业版颜色一致。
* 添加hitokoto一言，点击可刷新,可复制。
* 可修改标题和标题右侧图标。
* 添加公告功能，可解析markdown。
* 添加websocket，需自行启动`websocket-server`，运行命令：`docker run -itd -p 13001:13001 195658/nextweb-ws-server:1.0`可实时显示在线人数。
* 以上功能通过环境变量即可需改
## 环境变量
### (可选) `SIDEBAR_TITLE`
侧边栏主标题，默认是原标题
### `HITOKOTO_URL`
(可选) 一言接口地址
默认是https://v1.hitokoto.cn/
### `HEADER_LOGO_URL`
(可选) 侧边栏logo地址，默认是原图标
### `ANNOUNCEMENT_PATH`
(可选) 公告地址，可为服务器或容器挂载的本地文件(docker允许添加`-v /path/to/local/file:/data:ro`)，也可填http地址，公告通知原理是将远程公告和本地公告对比，不一样则显示圆点，点击公告按钮后存储远程公告到本地。
### `NEXT_PUBLIC_WS_URL`
(可选) websocket地址，默认是`ws://0.0.0.0:3001/ws`
### 相关项目
- [ChatGPTNextWeb](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web)
- [one-api](https://github.com/songquanpeng/one-api): 一站式大模型额度管理平台，支持市面上所有主流大语言模型
- [new-api](https://github.com/Calcium-Ion/new-api):在One API的基础上进行二次开发.
## 开源协议
[MIT](https://opensource.org/license/mit/)
