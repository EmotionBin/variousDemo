// 发送请求
fetch('/getData')
  .then(res => res.text())
  .then(res => console.log(res));