const express = require('express');
const cookieParser=require("cookie-parser");

const app = express();
// app1用于模拟跨域情况
const app1 = express();

app.use(cookieParser());
app1.use(cookieParser());

const config = {
  port: 9527,
  port1: 9528
}

app.use(express.static(__dirname));
app1.use(express.static(__dirname));

const USER_DATA = {};

// 获取一个唯一的字符串
function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt((1 + Math.random()) * 65536) + '';
  return (+(randomNum + timestamp)).toString(32);
}

app.get('/login', (req, res) => {
  const { query: { username, password } } = req;
  // 登录成功 生成临时票据
  const code = createUniqueString();
  // 写入用户信息
  USER_DATA[code] = { username, password };
  res.cookie("code", code);
  res.json({ status: 1, code });
});

app.get('/getUserInfo', (req, res) => {
  const { query: { code } } = req;
  const data = USER_DATA[code];
  if (!data) {
    res.json({ status: 0, detail: '无效的code' });
  }
  res.json({ status: 1, data });
});

app.get('/verifyCode', (req, res) => {
  const { query: { code } } = req;
  const data = USER_DATA[code];
  if (!data) {
    res.json({ status: 0, detail: '无效的code' });
  }
  res.json({ status: 1 });
});

app1.get('/login', (req, res) => {
  const { query: { username, password } } = req;
  // 登录成功 生成临时票据
  const code = createUniqueString();
  // 写入用户信息
  USER_DATA[code] = { username, password };
  res.cookie("code", code);
  res.json({ status: 1, code });
});

app1.get('/getUserInfo', (req, res) => {
  const { query: { code } } = req;
  const data = USER_DATA[code];
  if (!data) {
    res.json({ status: 0, detail: '无效的code' });
  }
  res.json({ status: 1, data });
});

app1.get('/verifyCode', (req, res) => {
  const { query: { code } } = req;
  const data = USER_DATA[code];
  if (!data) {
    res.json({ status: 0, detail: '无效的code' });
  }
  res.json({ status: 1 });
});

app.listen(config.port, () => {
  console.log(`server is running on ${config.port} port!`);
});

app1.listen(config.port1, () => {
  console.log(`server is running on ${config.port1} port!`);
});
