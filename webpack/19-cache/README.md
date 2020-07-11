# 缓存cache

1. **bable缓存:**可以直接配置 `cacheDirectory:true` 来开启bable缓存  
2. **文件资源缓存:**每次webpack构建的时候都会生成一个唯一的hash值，只需要给文件名加上这个hash值即可，这样只要修改了文件，每次打包的hash值不同，对应打包后的文件名也不同，这样就可以达到了禁用缓存的目的。但是这样做会存在一个问题，如果只改变了css文件的内容，重新打包后，所有文件的缓存都失效了。解决办法: `contenthash`   

下面介绍一些hash值：  

1. chunkhash:根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样  
问题：js和css的hash值还是一样的，因为css是在js中被引入的，他们都来自同一个chunk  
2. contenthash:根据文件的内容生成hash值。不同文件hash值一定不一样

总结：  

1. 开启bable缓存可以让我们第二次的构建速度更快  
2. `contenthash` 让代码上线运行缓存更好使用，只会重新加载修改过的文件，未修改过的文件使用缓存

