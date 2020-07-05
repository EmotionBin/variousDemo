const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/built.js',
    path:resolve(__dirname, 'built')
  },
  module:{
    rules:[
      {
        // 处理css资源
        test:/\.css$/,
        use:[
          // 创建style标签，将样式引入
          // 'style-loader',
          // 这个loader取代style-loader 作用：提取js中css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader'
        ]
      }
    ]
  },
  plugins:[
    // plugins配置
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名 可以自定义目录
      filename:'css/index.css'
    })
  ],
  mode:'development'
}



