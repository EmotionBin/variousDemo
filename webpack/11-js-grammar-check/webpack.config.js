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
       * 语法检查: eslint-loader eslint
       * 注意只检查自己写的js代码，第三方库不用检查
       * 
       * 设置检查规则:
       *    package.json中的eslintConfig字段中设置检查规则,推荐用airbnb
       */
      {
        test: /\.js$/,
        // 排除第三方库的检查
        exclude:/node_modules/,
        loader:'eslint-loader',
        options:{
          // 自动修复eslint的错误
          fix: true
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



