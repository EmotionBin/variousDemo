# webpack打包css样式资源

1. 需要在`index.js`入口文件中引入样式资源
2. 需要在`webpack.config.js`文件中配置`loader`，因为webpack只能处理`js`和`json`，不能识别`css`资源，所以需要引入`loader`处理，记得安装对应的`loader`

