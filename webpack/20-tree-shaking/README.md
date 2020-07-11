# tree-shaking

所谓 `tree-shaking` 就是树摇的意思，通俗的讲就是把一棵树上的一些枯萎的叶子去掉，那么在代码里面的意思就是**按需加载**，把一些没有引用的资源给剔除，去除无用代码，减小文件体积，优化性能  

1. 必须使用ES6模块化
2. 开启 `production` 环境会自动开启树摇功能

**注意！！！！！**

如果在package.json文件中配置了 `sideEffects:false`，意思就是所有代码都没有副作用（都可以进行tree-shaking），在这种情况下会出现一个问题，**可能会把css/@bable/polyfill(副作用)**文件干掉，解决办法就是改成 `sideEffects:["*.css"]`等  


