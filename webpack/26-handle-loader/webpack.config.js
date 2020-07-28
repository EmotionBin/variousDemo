
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getLoaderPath = (loaderPath) => {
  return resolve(__dirname, "loaders", loaderPath);
}

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use:[
          {
            loader: getLoaderPath("banner-loader"),
            options:{
              author:'hwb'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: getLoaderPath("my-style-loader"),
            options: {

            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: "development"
}