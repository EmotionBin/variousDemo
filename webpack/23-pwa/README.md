# PWA

渐进式网络开发应用程序(离线可访问)，用 `workbox` 技术实现，在webpack中需要安装插件 `workbox-webpack-plugin`  

1. 需要在 `plugins` 中配置 `new WorkboxWebpackPlugin.GenerateSW` 配置项略，具体可以参考配置文件
2. 需要在入口文件 `index.js` 中配置 `serviceWorker`，**注意，因为这项技术比较新，所以目前只能兼容一些版本比较高的浏览器**
3. 需要作兼容性处理 `if ('serviceWorker' in navigator)` 这里会判断浏览器是否兼容 `serviceWorker`  
4. 剩余的配置项具体可以参考 `index,js`



