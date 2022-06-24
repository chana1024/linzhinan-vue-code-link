const serverConfig = {
  editor: "vscode",
};
exports.setEditor = function (editor) {
  serverConfig.editor = editor;
};
exports.getEditor = function () {
  return serverConfig.editor;
};
