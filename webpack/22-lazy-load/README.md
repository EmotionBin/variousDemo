# lazy-load

## 懒加载

当文件需要使用时才加载，动过动态 `import` 以及**webpack魔法注释** `/* webpackChunkName:'test' */`实现懒加载  

## 预加载

`/* webpackPrefetch:true */` 等其他资源加载完毕，浏览器空闲了，在偷偷加载资源，**注意，预加载的兼容性较差，只能在高本版浏览器使用**
