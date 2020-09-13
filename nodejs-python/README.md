# 爬虫

这是一个基于 nodejs 的爬虫，爬取的数据是本地测试页面中的所有图片数据，在这个 demo 中，本地页面的地址是 `http://127.0.0.1:5501/nodejs-python/client/index.html`，注意端口和文件夹路径，可自行更改  

这里用了 axios 和 cheerio 两个第三方库，axios 用于发送网络请求，cheerio 用于在服务端以 `jquery` 语法操作 dom，为了方便

