


const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/built.js',
    // 这里使用resolve是为了解决各个操作系统对路径'/'或'\'的定义不同
    path:resolve(__dirname, 'built')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'production',
  externals:{
    // 忽略库名  ->  npm对应的包名
    jquery:'jQuery'
  }
}