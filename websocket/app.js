// https://github.com/sitegui/nodejs-websocket
const ws = require('nodejs-websocket');

const config = {
  port:9527,
}

const server = ws.createServer(socket => {
  // 事件名称为 text 监听客户端发送过来的字符串
  socket.on('text', data => {
    console.log(data);
    socket.sendText(data);
  });
  socket.on('close', data => {
    console.log('close');
  });
  socket.on('errer', data => {
    console.log('errer', data);
  });

  setInterval(() => {
    socket.sendText(`服务端每两秒会向客户端推送一次消息${+ new Date()}`);
  }, 2000);
})

server.listen(config.port, () => {
  console.log(`server is running on ${config.port} port!`)
})