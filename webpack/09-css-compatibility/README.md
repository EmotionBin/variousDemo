# css的兼容性处理

1. 使用插件`postcss-loader`和`postcss-preset-env`，记得安装
2. 需要在`package.json`中配置`browserslist`字段，它是一个对象

- 可以指定环境，如`development`或者`production`
- `last 1 xxx version`，意思是兼容最近的一个版本，`xxx`可以写要兼容的浏览器，比如`"last 1 chrome version"`
- `>0.2%`表示兼容`99.8%`的浏览器
- `not dead`表示对于一些已经死的浏览器(可以理解为低版本的或者现在已经不用了的浏览器)不处理
- `not op_mini all`写着就完事了，我也不太清楚啥意思

3. **注意：因为browserslist的环境变量默认是'production',需要修改的话只能修改node的环境变量process.env.NODE_ENV,注意webpack配置中的mode和这个没有任何关系**