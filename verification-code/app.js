const express = require('express');
const svgCaptcha = require('svg-captcha');

const app = express();

const config = {
  port: 9527
}

app.use(express.static(__dirname));

const CODE_MAP = {

}

app.get('/getCode', (req, res) => {
  const { query: { type } } = req;
  const options = {
    size: 4, //验证码长度
    fontSize: 45, //验证码字号
    ignoreChars: '0o1i',
    noise: 1, //干扰线条数目
    width: 120, //宽度
    height: 36, //高度
    color: true, //验证码字符是否有颜色，默认是没有，但是如果设置了背景颜色，那么默认就是有字符颜色
    background: '#ccc' //背景颜色
  }
  if(+type === 0){
    const captcha = svgCaptcha.create(options)
    CODE_MAP[type] = captcha.text.toLowerCase()
    res.type('image/svg+xml'); // 响应的类型
    res.send(captcha.data);
  }
  if(+type === 1){
    const captcha = svgCaptcha.create(options)
    const base64str = `data:image/svg+xml;base64,${Buffer.from(captcha.data, 'binary').toString('base64')}`; 
    CODE_MAP[type] = captcha.text.toLowerCase()
    res.json({ status:1, data:base64str});
  }
  if(+type === 2){
    const captcha = svgCaptcha.createMathExpr(options)
    const base64str = `data:image/svg+xml;base64,${Buffer.from(captcha.data, 'binary').toString('base64')}`; 
    CODE_MAP[type] = captcha.text.toLowerCase()
    res.json({ status:1, data:base64str});
  }
});

app.get('/check', (req, res) => {
  const { query: { type, code } } = req;
  const status = code.toLowerCase() === CODE_MAP[type] ? 1 : 0
  res.json({ status });
});

app.listen(config.port, () => {
  console.log(`server is running on ${config.port} port!`);
});
