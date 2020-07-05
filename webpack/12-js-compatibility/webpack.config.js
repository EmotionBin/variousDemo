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
      /**
       * js兼容性处理: babel-loader @babel/preset-env
       */
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader: 'babel-loader',
        options:{
          // 预设: 指示babel做怎么样的兼容性处理
          presets:[
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns:'usage',
                // 指定core-js版本
                corejs:{
                  version:3
                },
                // 指定兼容性做到哪个版本浏览器
                targets:{
                  chrome:'60',
                  firefox:'60',
                  ie:'9'
                }
              }
            ]
          ]
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
  mode:'development'
}



