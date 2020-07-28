
const { resolve } = require('path');

const RemoveCommentsPlugin = require('./plugins/remove-comments-plugin.js');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist")
  },
  plugins: [
    new RemoveCommentsPlugin()
  ],
  mode: "development"
}