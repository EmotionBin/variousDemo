const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader:'postcss-loader',
    options:{
      ident:'postcss',
      plugins:() => [
        require('postcss-preset-env')()
      ]
    }
  }
]

module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/built.[contenthash:10].js',
    path:resolve(__dirname, 'built')
  },
  module:{
    rules:[
      /**
       * 正常来讲一个文件只能被一个loader处理
       * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
       *    先执行eslint 在执行babel
       */
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'eslint-loader',
        // 强制优先执行这个loader
        enforce:'pre',
        options:{
          fix:true
        }
      },
      {
        // 加上oneOf可以让文件只匹配对应的一种loader，否则每种类型的文件都要在所有loader中过一遍，找到对应的loader再使用，这样可以提高效率
        // 注意：不能有两个配置处理同一种类型的文件
        oneOf:[
          {
            test:/\.css$/,
            use:[...commonCssLoader]
          },
          {
            test:/\.less$/,
            use:[
              ...commonCssLoader,
              'less-loader'
            ]
          },
          {
            test:/\.js$/,
            exclude:/node_modules/,
            loader:'babel-loader',
            options:{
              presets:[
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns:'usage',
                    corejs:{
                      version:3
                    },
                    targets:{
                      chrome:'60',
                      firefox:'50'
                    }
                  }
                ]
              ],
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory:true
            }
          },
          {
            test:/\.(jpg|png|gif)/,
            loader:'url-loader',
            options:{
              limit:8 * 1024,
              name:'[contenthash:10].[ext]',
              outputPath:'images'
            }
          },
          {
            test:/\.html$/,
            loader:'html-loader'
          },
          {
            exclude:/\.(js|css|less|html|jpg|png|gif)/,
            loader:'file-loader',
            options:{
              outputPath:'media'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    // plugins配置
    new MiniCssExtractPlugin({
      filename:'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
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
  mode:'production',
  devtool:'source-map'
}



