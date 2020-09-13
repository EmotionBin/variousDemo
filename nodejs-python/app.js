const axios = require('axios'); // HTTP 库
const cheerio = require('cheerio'); // 服务端以 jquery 语法操作 dom 
const fs = require('fs'); // 用于创建可写流

getWebData();
console.log('所有数据获取完成');

async function getWebData(){
  try {
    // 获取要爬取的页面的网页源代码 需要分析结构
    const { data } = await axios.get('http://127.0.0.1:5501/nodejs-python/client/index.html');
    const $ = cheerio.load(data);
    // 第一个参数 索引 第二个参数 dom 元素
    $('a').each((i, ele) => {
      // 拿到 index.html 中 a 标签指向的地址 
      const pageAddress = $(ele).attr('href');
      // 获取每个页面中的图片资源
      getImgData(pageAddress);
    })
  } catch (error) {
    console.log('error: ', error);
  }
}

async function getImgData(address){
  try {
    const { data } = await axios.get(address);
    const $ = cheerio.load(data);
    const title = $('h1').text();
    const imgSrc = $('img').attr('src');
    // 获取图片资源 设置 responseType 以文件流的形式返回
    const img = await axios.get(imgSrc, { responseType:'stream' });
    // 创建可写流
    const writeStream = fs.createWriteStream(`./python-data/${title}.png`);
    // 通过管道流将获取的文件写入
    img.data.pipe(writeStream);
  } catch (error) {
    console.log('error: ', error);
  }
}

