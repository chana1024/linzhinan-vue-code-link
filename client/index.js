function openEditor(filePath) {
  axios
    .get("http://localhost:8700/code", {
      params: {
        filePath: filePath,
      },
    })
    .catch((error) => {
      console.log(error);
    });
}

function openCode(e) {
  if (e.metaKey || e.shiftKey) {
    e.preventDefault();
    const filePath = getFilePath(e.target);
    openEditor(filePath);
  }
}

function init() {
  document.oncontextmenu = function() {
    return false;
  }
  document.onmousedown = function(e) {
    if (e.shiftKey && e.button === 2) {
      console.info(e)
      console.info(e.path[0].attributes.codelocation.nodeValue)
    }
  }
}
export default {
  init
};
