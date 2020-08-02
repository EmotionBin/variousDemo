const express = require('express');

const app = express();

const config = {
  port:9528
}

app.use(express.static(__dirname));

app.listen(config.port, () => {
  console.log(`server is running on ${config.port} port!`);
});