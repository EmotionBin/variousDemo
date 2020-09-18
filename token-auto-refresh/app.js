const express = require('express');
const jwt = require('jsonwebtoken'); // https://github.com/auth0/node-jsonwebtoken

const app = express();

const config = {
  port:9527
}

app.use(express.static(__dirname));

// 用户名与 hash 值映射集合
const USER_HASH_MAP = {};
// hash 值与 token 映射集合
const HASH_TOKEN_MAP = {};

// 获取一个唯一的字符串
function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt((1 + Math.random()) * 65536) + '';
  return (+(randomNum + timestamp)).toString(32);
}

// 获取 hash 值
function getHash() {
  return `${createUniqueString()}-${createUniqueString()}-${createUniqueString()}-${createUniqueString()}`
}

/**
 * 获取 token
 * @param {string} key 生成 token 的秘钥
 */
function getToken(key) {
  const payload = {
    name: 'token-auto-refresh demo'
  };
  return jwt.sign(payload, key, { expiresIn: 60 }); // 缓存 token 过期时间 60s
}

// 生成 token，相当于登录
app.get('/getToken', (req, res) => {
  // 登录的时候传递过来的用户名
  const { username } = req.headers;
  // 先看看集合中有没有
  console.log('USER_HASH_MAP: ', USER_HASH_MAP);
  console.log('HASH_TOKEN_MAP: ', HASH_TOKEN_MAP);
  const hash = USER_HASH_MAP[username];
  if(hash){
    // 如果存在映射关系 全部清空 因为 token 需要重新生成
    delete HASH_TOKEN_MAP[hash];
    delete USER_HASH_MAP[username];
  }
  const uniqueString = getHash(); // 这里的 uniqueString 只是一个映射
  // 记录映射关系
  USER_HASH_MAP[username] = uniqueString;
  HASH_TOKEN_MAP[uniqueString] = getToken(uniqueString);
  res.send(uniqueString);
});

// 验证 token，相当于携带 token 发送请求
app.get('/verifyToken', (req, res) => {
  const hash = req.headers.token;
  // 根据 hash 值查到真正的 token
  const token = HASH_TOKEN_MAP[hash];
  console.log('token: ', token);
  console.log('HASH_TOKEN_MAP: ', HASH_TOKEN_MAP);
  jwt.verify(token, hash, (err, decoded) => {
    if(err){
      // token 验证失败
      console.log(err, 'token验证失败');
      return res.send(true);
    }
    console.log(decoded.exp, Math.floor(+ new Date() / 1000));
    // token 校验通过刷新 token
    HASH_TOKEN_MAP[hash] = getToken(hash);
    console.log('HASH_TOKEN_MAP[hash]: ', HASH_TOKEN_MAP[hash]);
    res.send(false);
  });
});

app.listen(config.port,() => {
  console.log(`server is running on ${config.port} port!`);
});
