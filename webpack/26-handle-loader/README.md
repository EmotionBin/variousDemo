# 手写webpack的loader

开始之前先介绍一下 loader ，所谓 loader 只是一个导出为函数的 JavaScript 模块，只要使用了 loader ， webpack 在构建的时候就会自动调用这个 loader 函数，把上一个 loader 产生的结果或者资源文件(resource file)传入进去，最终得到最后一个 loader 产生的处理结果  

