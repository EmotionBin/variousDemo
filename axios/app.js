const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');

const app = express();
// app1用于模拟跨域情况
const app1 = express();

const config = {
  port:9527,
  port1:9528
}

//body-parser 解析json格式数据
app.use(bodyParser.json());  
//此项必须在 bodyParser.json 下面,为参数编码 解析x-www-form-urlencoded格式数据
app.use(bodyParser.urlencoded({            
  extended: true
}));
// 解析multipart/form-data格式数据 注意不能和bodyParser一起使用，我也没研究明白为什么
app1.use(formidable());

app.use(express.static(__dirname));

app.all('*', function (req, res, next) {
  // 设置请求头为允许跨域
  res.header('Access-Control-Allow-Origin', '*');
  // 设置服务器支持的所有头信息字段
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
  // 设置服务器支持的所有跨域请求的方法
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method.toLowerCase() === 'options') {
    console.log('options: ', 'options');
    res.sendStatus(204);  // 让options尝试请求快速结束
  } else {
    next();
  }
});

app1.all('*', function (req, res, next) {
  // 设置请求头为允许跨域
  res.header('Access-Control-Allow-Origin', '*');
  // 设置服务器支持的所有头信息字段
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
  // 设置服务器支持的所有跨域请求的方法
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method.toLowerCase() === 'options') {
    console.log('options: ', 'options');
    res.sendStatus(204);  // 让options尝试请求快速结束
  } else {
    next();
  }
});

app.get('/getData', (req, res) => {
  const { query } = req;
  let data = query.data ? `参数是：${query.data},${query.data1}` : '';
  const str = `这是服务端回应的数据   ${data}`;
  res.send(str);
});

app.post('/getData', (req, res) => {
  const { body } = req;
  let data = body.data ? `参数是：${body.data},${body.data1}` : '';
  const str = `这是服务端回应的数据   ${data}`;
  res.send(str);
});

app1.post('/getData1', (req, res) => {
  // fields为非文件项，files为文件项
  const { fields,files } = req;
  let data = fields.data ? `参数是：${fields.data},${fields.data1}` : '';
  const str = `这是服务端回应的数据   ${data}`;
  res.header('Access-Control-Allow-Origin', '*');
  res.send(str);
});

app.listen(config.port,() => {
  console.log(`server is running on ${config.port} port!`);
});

app1.listen(config.port1,() => {
  console.log(`server is running on ${config.port1} port!`);
});
