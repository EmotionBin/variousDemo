const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:{
    // 配置多入口
    index:'./src/js/index.js',
    test:'./src/js/test.js'
  },
  output:{
    filename:'js/[name].[contenthash:10].js',
    path:resolve(__dirname, 'built')
  },
  plugins:[
    // plugins配置
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      // 压缩html代码
      minify:{
        // 移除空格
        collapseWhitespace:true,
        // 移除注释
        removeComments:true
      }
    })
  ],
  mode:'production'
}



