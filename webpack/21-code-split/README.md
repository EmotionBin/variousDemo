# code-split代码分割

demo1:多入口配置，`entry` 为一个对象，打包后会生成多个js文件，每个js文件对应一个入口

demo2:配置 `optimization` 字段，可以将node_modules中代码单独打包一个chunk最终输出，自动分析多入口chunk中，有没有公共文件，如果有会打包成单独一个chunk

demo3:利用es10动态 `import` 的语法能将某个文件单独打包，并且可以利用**webpack魔法注释** `/* webpackChunkName:'test' */`对打包后的文件进行命名


