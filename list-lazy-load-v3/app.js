const express = require('express');

const app = express();

const config = {
  port:9527
}

app.use(express.static(__dirname));

app.get('/getList', (req, res) => {
  let list = [];
  const words = 'abcdefghijklmnopqrstuvwxyz你是好的嗯气短前端后端设计产品网但考虑到付款啦分手快乐的分类开发商的李开复封疆大吏师德师风吉林省附近';
  // 生成指定个数的随机字符串
  function genrateRandomWords(n) {
    len = words.length;
    var ret = '';
    for (let i = 0; i < n; i++) {
      ret += words[Math.floor(Math.random() * len)]
    }
    return ret
  }
  // 生成10万条数据的list
  for (let i = 0; i < 10000; i++) {
    list.push({
      name: `name_${i}`,
      title: genrateRandomWords(12),
      label: `我是第${i}项目~`,
      id: `id_${i}`
    })
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.send(list);
});

app.listen(config.port,() => {
  console.log(`server is running on ${config.port} port!`);
});
