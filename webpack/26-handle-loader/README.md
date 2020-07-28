# 手写webpack的loader

开始之前先介绍一下 loader ，所谓 loader 只是一个导出为函数的 JavaScript 模块，只要使用了 loader ， webpack 在构建的时候就会自动调用这个 loader 函数，把上一个 loader 产生的结果或者资源文件(resource file)传入进去，最终得到最后一个 loader 产生的处理结果  

这里手写了两个 loader ，分别是 `banner-loader` 和 `my-style-loader`

**banner-loader**

可以在每个文件的头部加入一段注释，包括作者名称和时间，作者名称可以在该 loader 的 options 中的 author 进行配置，源码见 `loaders/banner-loader.js`  

**my-style-loader**

模拟了 style-loader ，可以在 js 中引入 css 文件，运行的时候会自动将 css 文件生成 style 标签并插入 html 的 head 中，源码见 `loaders/my-style-loader.js`  


