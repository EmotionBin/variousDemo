


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
        test:/\.less$/,
        // use数组中loader执行顺序，从右到左
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 处理图片资源
        test:/\.(jpg|png|gif)/,
        // 使用loader 下载url-loader和file-loader
        loader:'url-loader',
        options:{
          // 图片大小小于8kb，就会被base64处理
          // 优点：减少请求数量，减轻服务器压力
          // 缺点L图片体积会更大，文件请求速度更慢
          limit:8 * 1024,
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来拓展名
          name:'[hash:10].[ext]'
        }
      },
      {
        test:/\.html$/,
        // 处理html文件的img图片
        loader:'html-loader'
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