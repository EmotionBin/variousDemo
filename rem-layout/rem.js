!(function () {
  function resize() {
    const baseFontSize = 100; // 设置基准值 设计稿的 100px 相当于1rem 750px -> 7.5rem 7.5rem 相当于 100% 的宽度
    const designWidth = 750; // 假设设计稿的宽度是750
    const width = window.innerWidth; // 当前屏幕的宽度
    const currentFontSize = (width / designWidth) * baseFontSize; // 当前的 fontsize 值 根据比例换算得出
    document.querySelector('html').style.fontSize = `${currentFontSize}px`; // 给根元素 html 设置 fontsize 属性
  }
  document.addEventListener('DOMContentLoaded', resize);
  window.onresize = resize;
})()