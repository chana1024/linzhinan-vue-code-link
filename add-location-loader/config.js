const pathUtil = require("../utils/pathUtil.js")
const path = require('path')

function resolve(dir) {
  return path.join(pathUtil.projectBasePath, dir)
}
module.exports = {
  addVueCodeLinkLoader: function(config) {
    //vue-code-link
    if (process.env.NODE_ENV === 'development') {
      // 本地开发环境
      config.module
        .rule('vue-code-link')
        .test(/\.vue/).pre()
        .include.add(resolve('src')).end()
        .use('@lzn1024/vue-code-link/add-location-loader')
        .loader('@lzn1024/vue-code-link/add-location-loader')
        .end()
    }
  }
}
