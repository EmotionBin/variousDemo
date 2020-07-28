# 手写webpack的plugin

插件是 webpack 的支柱功能，插件的功能要比 loader 更灵活，loader 一般情况下是帮助 webpack 实现翻译的功能，因为 webpack 只能理解 js 代码，所以插件目的在于解决 loader 无法实现的其他事  

下面引用 webpack 官网的一段解释:  

> webpack 插件是一个具有 apply 属性的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问

**在 webpack 运行的声明周期中会广播许多事件，plugin 可以监听这些事件，在特定的时刻调用 webpack 提供的 API 执行相应的操作**  

## 插件的结构

一个插件的基本结构应该是像下面这样的:  

```javascript
class HelloPlugin{
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options){
  }
  // Webpack 会调用 HelloPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler) {
    // 在emit阶段插入钩子函数，用于特定时机处理额外的逻辑；
    compiler.hooks.emit.tap('HelloPlugin', compilation => {
      // 在功能流程完成后可以调用 webpack 提供的回调函数；
    });
    // 如果事件是异步的，会带两个参数，第二个参数为回调函数，在插件处理完任务时需要调用回调函数通知webpack，才会进入下一个处理流程。
    compiler.plugin('emit', (compilation, callback) => {
      // 支持处理逻辑
      // 处理完毕后执行 callback 以通知 Webpack 
      // 如果不执行 callback，运行流程将会一直卡在这不往下执行 
      callback();
    });
  }
}

module.exports = HelloPlugin;
```

## 插件的工作原理

1. 读取配置的过程中会先执行 `new HelloPlugin(options)` 初始化一个 `HelloPlugin` 获得其实例
2. 初始化 `compiler` 对象后调用 `HelloPlugin.apply(compiler)` 给插件实例传入 `compiler` 对象
3. 插件实例在获取到 `compiler` 对象后，就可以通过 `compiler.plugin`(事件名称, 回调函数) 监听到 Webpack 广播出来的事件。 并且可以通过 `compiler` 对象去操作 Webpack

## 实践成果

这里我自己写了一个 `RemoveCommentsPlugin` 插件，该插件的功能是移除打包后的文件中的注释(类似/\*\*\*\*\*\*/)，打包后代码更干净，可读性更高，插件源码在 `plugins/remove-comments-plugin.js` 目录下
