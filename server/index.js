const openCodeFile = require("./openCodeFile").openCodeFile;
module.exports = {
  before: function (app) {
    if (process.env.NODE_ENV === "development") {
      app.get("/code", function (req, res) {
        if (req.query.filePath) {
          // 执行vscode定位代码行命令
          openCodeFile(req.query.filePath);
        }
        res.send("successfully receive request");
      });
    }
  },
};
