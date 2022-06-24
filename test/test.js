const openCodeFile = require("../server/openCodeFile").openCodeFile;
const vueCodeLink = require("../index.js");
vueCodeLink.vueCodeLinkServerConfig.setEditor("webstorm");
console.info(vueCodeLink.vueCodeLinkServerConfig.getEditor());

openCodeFile("./package.json:22");
