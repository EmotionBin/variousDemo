const express = require('express');

const app = express();

const config = {
  port:9527
}

//  开辟静态资源并且允许跨域
app.use(express.static(__dirname, {
  setHeaders: (res, path, stat) => {
    res.set('Access-Control-Allow-Origin', '*')
  }
}));

app.listen(config.port, () => {
  console.log(`server is running on ${config.port} port!`);
});