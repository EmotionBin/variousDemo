const axios = require('axios'); // HTTP 库
const cheerio = require('cheerio'); // 服务端以 jquery 语法操作 dom 
const fs = require('fs'); // 用于创建可写流

/**
 * 设置请求头模拟浏览器行为
 */
axios.defaults.headers.common['referer'] = 'https://www.mzitu.com';
axios.defaults.headers.common['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36';

/**
 * 每次爬取资源的时间间隔 timer 建议 1000 即为一秒爬取一次资源，频率太高会被封禁 ip
 */
const timer = 1000;
getWebData();

async function getWebData(){
  try {
    // 获取要爬取的页面的网页源代码 需要分析结构
    const { data } = await axios.get('https://www.mzitu.com');
    const $ = cheerio.load(data);
    $('#pins a').each((i, ele) => {
      if(i > 0) return;
      // 拿到 index.html 中 a 标签指向的地址 
      const pageAddress = $(ele).attr('href');
      // 获取每个页面中的图片资源
      getImgCount(pageAddress);
    })
  } catch (error) {
    console.log('error: ', error);
  }
}

async function getImgCount(address){
  try {
    const { data } = await axios.get(address);
    const $ = cheerio.load(data);
    const listLength = $('.pagenavi a').length;
    const total = $('.pagenavi a').eq(listLength - 2).find('span').text();
    await getImgData(address, 0);
    for(let i = 1;i <= total;i ++){
      const imgUrl = `${address}/${i}`;
      await getImgData(imgUrl, i);
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

async function getImgData(address, page){
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(address);
      const $ = cheerio.load(data);
      const title = $('.main-image img').attr('alt');
      const imgSrc = $('.main-image img').attr('src');
      if (!fs.existsSync(`./python-data`)) {
        //路径不存在则新建文件夹
        fs.mkdirSync(`./python-data`, err => {
          if (err) {
            console.log('创建文件夹失败');
            throw err;
          }
        });
      }
      if (!fs.existsSync(`./python-data/${title}`)) {
        //路径不存在则新建文件夹
        fs.mkdirSync(`./python-data/${title}`, err => {
          if (err) {
            console.log('创建文件夹失败');
            throw err;
          }
        });
      }
      // 获取图片资源 设置 responseType 以文件流的形式返回
      const img = await axios.get(imgSrc, { responseType: 'stream' });
      // 创建可写流
      const writeStream = fs.createWriteStream(`./python-data/${title}/${title}${page}.jpg`);
      // 通过管道流将获取的文件写入
      img.data.pipe(writeStream);
      console.log(`图片${address}获取完毕`);
      setTimeout(() => {
        resolve();
      }, timer);
    } catch (error) {
      console.log('error: ', error);
      reject();
    }
  })
}


