const vueCodeLinkServer = require('./server')
const vueCodeLinkClient = require('./client')
const vueCodeLinkLoader = require('./add-location-loader')
const vueCodeLinkLoaderConfig = require('./add-location-loader/config.js')
module.exports = {
  vueCodeLinkServer: vueCodeLinkServer,
  vueCodeLinkClient: vueCodeLinkClient,
  vueCodeLinkLoader: vueCodeLinkLoader,
  vueCodeLinkLoaderConfig: vueCodeLinkLoaderConfig,
}
