const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 这里需要设置一下环境变量
// 因为browserslist的环境变量默认是'production'
// 需要修改的话只能修改node的环境变量process.env.NODE_ENV
// 注意webpack配置中的mode和这个没有任何关系
process.env.NODE_ENV = 'development';

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
          'css-loader',
          // 使用postcss-loader
          // 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定css兼容性样式
          {
            loader:'postcss-loader',
            options:{
              ident:'postcss',
              // 注意这里的箭头函数不是{}而是[]
              plugins:() => [
                // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
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



