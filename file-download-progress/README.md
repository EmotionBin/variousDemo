# 实现文件下载与获取请求的进度

## 文件下载

实现文件下载需要后端对响应头进行设置，即设置 `Content-Disposition, attachment;filename=README.md`(如果使用 express 可以使用 `res.download(filePath)`) 即可实现文件下载功能，前端只需要发送一个 xhr 请求，即可下载对应的文件，但是需要注意的是**通过ajax的方式请求是无法自动下载文件的，因为js无法调用到浏览器的下载处理机制和程序**，所以给出以下两种方式：

1. window.open()
2. 修改 window.location.href 为目标地址

比如下载文件接口的地址是 `http://localhost:9527/getFile` ，就可以使用 `window.open('http://localhost:9527/getFile')` 或 `window.location.href = 'http://localhost:9527/getFile'`，但是**要注意的是，如果请求需要携带 token 等验证信息，则不能使用这两种方式**，因为它们都是发送一个 get 请求，无法在发送请求的时候携带 token，所以此时需要利用 ajax 请求，我们再稍微做一些处理实现下载文件，下面给出解决方案  

**使用 ajax 请求，再利用 blob 与 a 标签实现文件下载**

前面说到，就算后端对响应头设置了格式，也无法通过 ajax 请求自动下载文件，所以需要我们手动进行处理，拿到请求返回的内容后(因为是文件内容，可能会有乱码，编码不一致)，需要利用 blob 和 a 标签稍微处理一下，这里也可能会有问题，因为 **blob 的 type 默认是 MIME 类型的**，在这个例子中我的测试文件是 `text.md`，md 后缀的文件不属于 MIME 类型的范畴内，所以下载下来后后缀名会是 html，也就是说，如果要下载的文件名后缀不属于 MIME 类型，可能后缀名会不一致，要么就直接前端写死文件后缀名  

参考：  
[Blob.type MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/type)  
[常见 MIME 类型列表 MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)  

## 获取请求的进度

可以监听 xhr 的 `progress` 来实时获取当前请求进度，需要响应头中包含 `Content-Length` 字段，据我了解，目前 `fetch` API暂不支持  

**操作方法**

`node app.js` 启动 express 服务，在浏览器中输入地址 `http://localhost:9527/index.html` 
