// 引入fs模块
var fs = require('fs');

module.exports = function(source) {
  const {
    resourcePath
  } = this;
  return sourceCodeChange(source, resourcePath);
};

function sourceCodeChange(source, resourcePath) {
  return codeLineTrack(source, resourcePath);
}

function codeLineTrack(str, resourcePath) {
  let lineList = str.split("\n");
  let newList = [];
  //template标识，用于判断代码是否在template内，限制只处理tempalte下的代码
  let templateIndex = {
    index: 0
  };
  lineList.forEach((item, index) => {
    newList.push(addLineAttr(item, index + 1, resourcePath, templateIndex)); // 添加位置属性，index+1为具体的代码行号
  });
  return newList.join("\n");
}

function addLineAttr(lineStr, line, resourcePath, templateIndex) {
  let reg = /(<[\w-]+)|(<\/template)/g;
  let leftTagList = lineStr.match(reg);
  if (leftTagList) {
    leftTagList = Array.from(new Set(leftTagList));
    leftTagList.forEach((item) => {
      if (item && item.indexOf("<template") !== -1) {
        templateIndex.index += 1;
      }
      if (item && item.indexOf("</template") !== -1) {
        templateIndex.index -= 1;
      }

      if (templateIndex.index > 0 && item && item.indexOf("template") == -1 && item.indexOf("<script") == -1 && item.indexOf("<style") == -1) {
        let regx = new RegExp(`${item}`, "g");
        let location = `${item} codelocation="${resourcePath}:${line}"`;
        lineStr = lineStr.replace(regx, location);
      }
    });
  }
  return lineStr;
}
