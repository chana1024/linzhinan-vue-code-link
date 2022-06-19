![Animation](https://user-images.githubusercontent.com/62974111/174468768-dcacbfaa-3565-4608-bbb3-9a1b81da4ff0.gif)
#通过shift+右键点击页面元素,快速在vscode中定位代码位置
---
#安装
```
    //1、install package
    npm install -s @linzhinan/vue-code-link
    //2、vue.config.js
    const { vueCodeLinkServer, vueCodeLinkLoaderConfig } = require('@linzhinan/vue-code-link')
    module.exports = {
        ...
        devServer: {
          ...
          //添加监听服务
          before: vueCodeLinkServer.before
        },
        ...
        chainWebpack(config) {
          //添加vue-code-link处理器
          vueCodeLinkLoaderConfig.addVueCodeLinkLoader(config)
          ...
        }
    }
    //3、main.js
    import { vueCodeLinkClient } from '@linzhinan/vue-code-link'
    vueCodeLinkClient.init()
```
#使用
shift+鼠标右键点击页面元素即可
#注意事项 
 * 插件会自动根据生成与开发环境决定是否启用,不会对生产环境造成任何影响
 * 插件启用时,会禁用默认的鼠标右键菜单
 * 暂时只支持vue + webpack + vscode
 * 代码定位精确到行，但定位只限于项目src目录下的代码,后续会考虑添加可定位目录的配置
 * 该项目借鉴了一位前端大佬的文章，[文章链接](https://mp.weixin.qq.com/s/AZQTK_lk8BxxWZCDU5P_Yg)。文章里有详细的设计思路和代码片段。
   本来打算直接用大佬的项目，但是对方说暂时只在他们公司内部使用，故本人自己写了一个简单版的。
