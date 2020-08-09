# 实现文件下载与获取请求的进度

## 文件下载

实现文件下载需要后端对响应头进行设置，即设置 `Content-Disposition, attachment;filename=README.md`(如果使用 express 可以使用 `res.download(filePath)`) 即可实现文件下载功能，前端只需要发送一个 xhr 请求，即可下载对应的文件，但是需要注意的是**通过ajax的方式请求是无法下载文件的，因为js无法调用到浏览器的下载处理机制和程序**，所以给出以下两种方式：

1. window.open()
2. 修改 window.location.href 为目标地址

比如下载文件接口的地址是 `http://localhost:9527/getFile` ，就可以使用 `window.open('http://localhost:9527/getFile')` 或 `window.location.href = 'http://localhost:9527/getFile'`  

## 获取请求的进度

可以监听 xhr 的 `progress` 来实时获取当前请求进度，需要响应头中包含 `Content-Length` 字段，据我了解，目前 `fetch` API暂不支持  

**操作方法**

`node app.js` 启动 express 服务，在浏览器中输入地址 `http://localhost:9527/index.html` 
