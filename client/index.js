const axios = require('axios')

function sendRequestToOpenFileInEditor(filePath) {
  const port = process.env.port || process.env.npm_config_port || 80 // 端口
  axios
    .get(`http://localhost:${port}/code`, {
      params: {
        filePath: filePath,
      },
    })
    .catch((error) => {
      console.log(error);
    });
}

function getFilePath(element) {
  if (!element || !element.getAttribute) return null
  if (element.getAttribute('code-location')) {
    return element.getAttribute('code-location')
  }
  return getFilePath(element.parentNode)
}

function openFileInEditor(e) {
  if (e.shiftKey && e.button === 2) {
    e.preventDefault();
    const filePath = getFilePath(e.target);
    sendRequestToOpenFileInEditor(filePath)
  }
}

function init() {
  if (process.env.NODE_ENV === 'development') {
    document.oncontextmenu = function() {
      return false;
    }
    document.onmousedown = function(e) {
      if (e.shiftKey && e.button === 2) {
        openFileInEditor(e)
      }
    }
  }
}
module.exports = {
  init
};
