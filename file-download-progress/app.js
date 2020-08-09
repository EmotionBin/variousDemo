
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const config = {
  port:9527
}

app.use(express.static(__dirname));

const readFile  = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.log('读取文件失败');
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

app.get('/getFile', async (req, res) => {
  const filePath = path.join(__dirname, 'text.md');
  const data = await readFile(filePath);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Disposition', 'attachment;filename=README.md');
  res.send(data);
});

app.get('/getFile1', async (req, res) => {
  const filePath = path.join(__dirname, 'text.md');
  res.header('Access-Control-Allow-Origin', '*');
  res.download(filePath,'README.md');
});

app.listen(config.port,() => {
  console.log(`server is running on ${config.port} port!`);
});
