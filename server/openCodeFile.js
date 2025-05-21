const child_process = require("child_process");
const pathUtil = require("../utils/pathUtil.js");
const serverConfig = require("./config.js");

function openCodeFileInWebStorm(path) {
  let filePath = path.split(":")[0];
  let linePath = path.split(":")[1];
  filePath = pathUtil.projectBasePath + filePath;
  child_process.exec(`webstorm64.exe  ${filePath}:${linePath} `, {
  env: process.env,
});
}
function openCodeFileInVscode(path) {
  let filePath = pathUtil.projectBasePath + path;
  child_process.exec(`code -r -g ${filePath}`, {
    env: process.env,
  });
}
function openCodeFileInCursor(path) {
  let filePath = pathUtil.projectBasePath + path;
  child_process.exec(`cursor -r -g ${filePath}`, {
    env: process.env,
  });
}
function os() {
  "use strict";
  const os = require("os");
  const platform = os.platform();
  switch (platform) {
    case "darwin":
      return "MacOSX";
      break;
    case "linux":
      return "Linux";
      break;
    case "win32":
      return "Windows";
      break;
    default:
      return "无法确定操作系统!";
  }
}
exports.openCodeFile = function (path) {
  if (serverConfig.getEditor() === "vscode") {
    openCodeFileInVscode(path);
  }else if (serverConfig.getEditor() === "cursor") {
    openCodeFileInCursor(path);
  } else if (serverConfig.getEditor() === "webstorm") {
    openCodeFileInWebStorm(path);
  } else {
    openCodeFileInVscode(path);
  }
};
