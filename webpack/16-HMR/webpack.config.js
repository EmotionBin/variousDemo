const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/built.js',
    path:resolve(__dirname, 'built')
  },
  module:{
    rules:[
      // loader配置
      {
        // 处理less资源
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 处理css资源
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        // 处理图片资源
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{
          limit:8 * 1024,
          name:'[hash:10].[ext]',
          outputPath:'images'
        }
      },
      {
        // 处理html中img资源
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        // 处理其他资源
        exclude:/\.(html|js|css|less|jpg|png|gif)/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]',
          outputPath:'assets'
        }
      }
    ]
  },
  plugins:[
    // plugins配置
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  devServer:{
    contentBase:resolve(__dirname, 'built'),
    compress:true,
    port:3000,
    open:true,
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重新启动webpack
    hot:true
  },
  mode:'development'
}



