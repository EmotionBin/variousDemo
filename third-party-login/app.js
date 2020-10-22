const express = require('express');

const app = express();
// app1用于模拟跨域情况
const app1 = express();

const config = {
  port: 9527,
  port1: 9528
}

app.use(express.static(__dirname));
app1.use(express.static(__dirname));

const USER_DATA = {};
const TOKEN_MAP = {};

// 获取一个唯一的字符串
function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt((1 + Math.random()) * 65536) + '';
  return (+(randomNum + timestamp)).toString(32);
}

app.get('/login', (req, res) => {
  const { query:{ username, password } } = req;
  res.redirect(302, 'http://localhost:9527/index1.html');
});

app.get('/getAccessToken', (req, res) => {
  const { query: { code } } = req;
  const access_token = TOKEN_MAP[code];
  if (!access_token){
    res.json({ status: 0, detail:'无效的code' });
  }
  res.json({ status: 1, access_token });
});

app.get('/getUserInfo', (req, res) => {
  const { query: { access_token } } = req;
  const data = USER_DATA[access_token];
  if (!data) {
    res.json({ status: 0, detail: '无效的access_token' });
  }
  res.json({ status: 1, data });
});

app1.get('/login', (req, res) => {
  const { query: { username, password } } = req;
  // 登录成功 生成临时票据
  const code = createUniqueString();
  // 生成真实凭证 用于之后的接口调用
  const access_token = createUniqueString();
  // 把临时票据和真实凭证做好映射关系 方便后面查找
  TOKEN_MAP[code] = access_token;
  // 写入用户信息
  USER_DATA[access_token] = { username, password };
  res.json({ status: 1, code });
});

app.listen(config.port, () => {
  console.log(`server is running on ${config.port} port!`);
});

app1.listen(config.port1, () => {
  console.log(`server is running on ${config.port1} port!`);
});
