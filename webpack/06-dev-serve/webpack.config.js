


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
  // 开发服务器serve 自动化打包 热更新
  // 注意 devServe只会在内存中打包，不会有任何输出
  // 启动指令为 npx webpack-dev-server
  devServer:{
    // 要运行的目录
    contentBase:resolve(__dirname, 'built'),
    // 启动gizp压缩
    compress:true,
    // 端口号
    port:3000,
    // 自动打开浏览器
    open:true
  },
  mode:'development'
}