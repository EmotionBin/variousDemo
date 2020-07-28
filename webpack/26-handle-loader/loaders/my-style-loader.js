
function loader(source) {
  let style = `
    let style = document.createElement('style');
    // 将css文件的内容字符串化
    style.innerHTML = ${JSON.stringify(source)}; 
    document.head.appendChild(style)
  `;
  return style;
}

module.exports = loader;

