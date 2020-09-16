const express = require('express');

const app = express();

const config = {
  port:9527
}

app.use(express.static(__dirname));

app.get('/getData', (req, res) => {
  const str = `这是服务端回应的数据`;
  res.send(str);
});

app.listen(config.port,() => {
  console.log(`server is running on ${config.port} port!`);
});
