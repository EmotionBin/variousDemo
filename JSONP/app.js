const express = require('express');

//9527端口 将当前目录作为http服务
const app = express();
app.use(express.static(__dirname));
app.listen(9527);

//9528端口 返回数据
const app1 = express();
app1.get('/', (req, res) => {
  //这里获取带过来的参数callback，值是f
  const funcName = req.query.callback;
  //这里需要拼接后再返回 返回的数据是f('你好')
  res.send(funcName + "('你好')");
});
app1.listen(9528);
