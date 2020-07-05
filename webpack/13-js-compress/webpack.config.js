const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/built.js',
    path:resolve(__dirname, 'built')
  },
  plugins:[
    // plugins配置
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  // 生产环境下自动进行js代码压缩
  mode:'production'
}



