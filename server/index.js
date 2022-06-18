const child_process = require('child_process')
const pathUtil = require("../utils/pathUtil.js")

function openCodeFile(path) {
  let filePath = pathUtil.projectBasePath + path
  child_process.exec(`code -r -g ${filePath}`)
}
module.exports = {
  before: function(app) {
    app.get('/code', function(req, res) {
      if (req.query.filePath) {
        // 执行vscode定位代码行命令
        openCodeFile(req.query.filePath)
      }
    })
  }
}
