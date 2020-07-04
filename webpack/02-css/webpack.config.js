
const { resolve } = require('path');


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
          // 创建style标签，将js中的样式资源插入，添加到head中生效
          'style-loader',
          // 将css文件编程commonjs模块加载到js中，里面内容是样式字符串
          'css-loader'
        ]
      }
    ]
  },
  plugins:[

  ],
  mode:'development'
}