/**
 * 服务器代码
 */
const express = require('express');

const app = express();

app.use(express.static('built', { maxAge: 1000 * 3600 }));

app.listen(3000);

