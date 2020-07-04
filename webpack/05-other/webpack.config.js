


const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'built.js',
    // 这里使用resolve是为了解决各个操作系统对路径'/'或'\'的定义不同
    path:resolve(__dirname, 'built')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        // use数组中loader执行顺序，从右到左
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      // 打包其他资源 除了html/js/css资源以外的资源
      {
        exclude:/\.(css|js|html)$/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development'
}