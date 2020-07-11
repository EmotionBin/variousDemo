const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/js/index.js',
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
  /**
   * 1.可以将node_modules中代码单独打包一个chunk最终输出
   * 2.自动分析多入口chunk中，有没有公共文件，如果有会打包成单独一个chunk
   */
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  mode:'production'
}



