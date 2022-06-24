const vueCodeLinkServer = require("./server");
const vueCodeLinkServerConfig = require("./server/config.js");
const vueCodeLinkClient = require("./client");
const vueCodeLinkLoader = require("./add-location-loader");
const vueCodeLinkLoaderConfig = require("./add-location-loader/config.js");

module.exports = {
  vueCodeLinkServer: vueCodeLinkServer,
  vueCodeLinkServerConfig: vueCodeLinkServerConfig,
  vueCodeLinkClient: vueCodeLinkClient,
  vueCodeLinkLoader: vueCodeLinkLoader,
  vueCodeLinkLoaderConfig: vueCodeLinkLoaderConfig,
};
