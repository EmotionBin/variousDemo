
function loader(source) {
  const time = new Date().toLocaleTimeString();
  const { author } = this.query;
  return `
    /**
    ** @author ${author}
    ** @time ${time}
    **/
    console.log('我是banner-loader注入的代码~作者是${author}');
    ${source}
  `
}

module.exports = loader;

