# webpack的HMR功能


## HMR

`HMR`就是`Hot Module Replacement`，热模块替换  

作用:一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块），极大提高构建速度

注意:

- 样式文件：可以使用HMR功能，因为`style-loader`内部实现了
- js文件：默认不能使用HMR功能  
  （1）解决：需要修改js代码，添加支持HMR功能代码  
  （2）注意: HMR功能对js的处理只能处理非入口js文件，入口文件无法实现HMR，因为入口文件会把其他所有模块都引入，只要入口文件发生变化，他都会重新执行，就会把所有文件重新引入构建，所以入口js文件不支持HMR功能
- html文件:默认不能使用HMR功能，同时会导致问题，html文件不能热更新了  
  解决:修改entry入口，将html文件引入


