const express = require('express');
const socket = require('socket.io');

const app = express();
const port = 9527;
const port1 = 9528; // 这里需要再开一个端口运行 socket.io 的服务

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, () => console.log(`server is running on ${port} port!`));

const server = app.listen(port1);
const io = socket.listen(server);

let socketList = {};
let member = 0;

io.on('connection', (socket) => {
  console.log('socket 连接成功!');
  
  // 接收信息
  socket.on('message', data => {
    console.log(data);
    // 广播信息 事件名称可以自定义 保持一致即可
    io.emit('broadcast', data);
  })

  // 有用户加入群聊
  socket.on('join', name => {
    socket.name = name;
    socketList[name] = socket.id;
    member ++;
    // 有人加入群聊则发送广播
    io.emit('welcome', name, member);
  })

  // 用户离开
  socket.on('disconnecting', () => {
    if(socketList[socket.name]){
      delete socketList[socket.name];
      member --;
      // 有用户退出广播
      socket.broadcast.emit('quit', socket.name, member);
    }
  })
});
