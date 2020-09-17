const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const config = {
  port:9527
}

app.use(express.static(__dirname));

// 唯一字符串 用于获取 token 与校验 token
let uniqueString = '';
// token映射
TOKEN_MAP = {};

// 获取一个唯一的字符串
function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * 生成 token
 * @param {boolean} flag 是否需要设置时间
 */
function getToken(flag) {
  const payload = {
    name: 'token-auto-refresh demo'
  };
  const options = flag ? { expiresIn: 60 } : {};
  return jwt.sign(payload, uniqueString, options); // 缓存 token 过期时间 60s
}

// 生成 token，相当于登录
app.get('/getToken', (req, res) => {
  uniqueString = createUniqueString();
  const token = getToken(false); // token 永久有效
  console.log('token: ', token);
  const cacheToken = getToken(true); // 缓存 token 过期时间 60s
  console.log('cacheToken: ', cacheToken);
  // 记录映射关系
  TOKEN_MAP[token] = cacheToken;
  res.send(token);
});

// 验证 token，相当于携带 token 发送请求
app.get('/verifyToken', (req, res) => {
  const { token } = req.headers;
  console.log('token: ', token);
  console.log('TOKEN_MAP[token]: ', TOKEN_MAP[token]);
  jwt.verify(TOKEN_MAP[token], uniqueString, (err, decoded) => {
    if(err){
      console.log(err);
      res.send(true);
    }
    console.log(decoded.exp, Math.floor(+ new Date() / 1000));
    // token 校验通过刷新 token
    TOKEN_MAP[token] = getToken(true);
    res.send(false);
  });
});

app.listen(config.port,() => {
  console.log(`server is running on ${config.port} port!`);
});
