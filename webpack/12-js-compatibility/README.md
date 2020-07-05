# js的兼容性处理

1. 需要安装`@babel/core`和`babel-loader`和`@babel/preset-env`
2. 上面的三个包是对js做一些基本的兼容性处理，如果需要对全部js做兼容性处理还需要安装`@babel/polyfill`，并且在入口文件`index.js`中引入，但是需要注意，如果处理所有js的兼容性问题会导致打包之后js文件过大
3. 由于上面的问题需要对js进行选择性的兼容性处理，可以理解为**按需加载**，需要用到`core-js`，记得安装，并且在`webpack.config.js`中`presets`字段中进行配置