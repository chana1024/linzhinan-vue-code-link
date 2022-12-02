// 引入fs模块
var fs = require("fs");
const pathUtil = require("../utils/pathUtil.js");

module.exports = function (source) {
  const { resourcePath } = this;
  return sourceCodeChange(source, resourcePath);
};

function sourceCodeChange(source, resourcePath) {
  resourcePath = resourcePath.substring(pathUtil.projectBasePath.length); // vue代码相对路径
  return codeLineTrack(source, resourcePath);
}

function codeLineTrack(str, resourcePath) {
  let lineList = str.split("\n");
  let newList = [];
  //template标识，用于判断代码是否在template内，限制只处理tempalte下的代码
  let templateIndex = {
    index: 0,
    vhtml: 0
  };
  lineList.forEach((item, index) => {
    newList.push(addLineAttr(item, index + 1, resourcePath, templateIndex)); // 添加位置属性，index+1为具体的代码行号
  });
  return newList.join("\n");
}

function addLineAttr(lineStr, line, resourcePath, templateIndex) {
    let vhtmlReg = /v-html=\s?"/g;
    if (vhtmlReg.test(lineStr)||templateIndex.vhtml>0) {
        return parseWhenHasVhtml(lineStr, line, resourcePath, templateIndex);
    }
    else{
        return parse(lineStr, line, resourcePath, templateIndex);
    }
}
function parseWhenHasVhtml(lineStr, line, resourcePath, templateIndex){
  let reg = /(<[\w-]+)|(<\/template)|(v-html=\s?")|([^\\=]")/g;
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
      if (templateIndex.index > 0 && item && item.indexOf("template") == -1) {
          if(new RegExp(`v-html=\s?"`).test(item)){
            templateIndex.vhtml+=1;
          }
          if(new RegExp(`[^\=]"`).test(item)&&templateIndex.vhtml>0){
              templateIndex.vhtml-=1;
          }
          if(templateIndex.vhtml<=0&&!new RegExp(`v-html=\s?"`).test(item)&&!new RegExp(`[^\=]"`).test(item)){
            if (new RegExp(`${item}>`, "g").test(lineStr)) {
              let regx = new RegExp(`${item}>`, "g");
              let location = `${item} code-location="${resourcePath}:${line}">`;
              lineStr = lineStr.replace(regx, location);
            }
            //对有属性的标签如<div class="test">,只替换开头的标签"<div "(包含空格，用于避免如下问题:
            //<a-b><a></a></a-b> -> <a codexx-b><a codexx></a></a-b>:当长标签字符包含短标签字符时，短标签的替换影响长标签)
            else {
              let regx = new RegExp(`${item}\\s+`, "g");
              let location = `${item} code-location="${resourcePath}:${line}" `;
              lineStr = lineStr.replace(regx, location);
            }
          }else{
          }
      }
    });
  }
  return lineStr;
}
function parse(lineStr, line, resourcePath, templateIndex){
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

      if (templateIndex.index > 0 && item && item.indexOf("template") == -1) {
        //对没有属性的标签如<div>,整个进行替换
        if (new RegExp(`${item}>`, "g").test(lineStr)) {
          let regx = new RegExp(`${item}>`, "g");
          let location = `${item} code-location="${resourcePath}:${line}">`;
          lineStr = lineStr.replace(regx, location);
        }
        //对有属性的标签如<div class="test">,只替换开头的标签"<div "(包含空格，用于避免如下问题:
        //<a-b><a></a></a-b> -> <a codexx-b><a codexx></a></a-b>:当长标签字符包含短标签字符时，短标签的替换影响长标签)
        else {
          let regx = new RegExp(`${item}\\s+`, "g");
          let location = `${item} code-location="${resourcePath}:${line}" `;
          lineStr = lineStr.replace(regx, location);
        }
      }
    });
  }
  return lineStr;
}
