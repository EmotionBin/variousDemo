Vue.config.devtools = true;

// 建立socket连接
const socket = io('http://localhost:9528');

new Vue({
  el:'#app',
  data:{
    name:'',
    isJoin:false,
    member:0,
    messageList:[],
    inputValue:''
  },
  created(){

  },
  mounted(){
    this.getMsg();
    // this.join();
    this.welcome();
    this.quit();
  },
  beforeDestroy() {

  },
  methods:{
    // 提交信息
    send(){
      if(!this.inputValue) return;
      this.messageList.push({
        id:+new Date(),
        data:this.inputValue
      })
      // 发送信息
      socket.emit('message', this.inputValue);
      this.inputValue = '';
    },
    // 接收信息
    getMsg(){
      socket.on('broadcast', data => {
        this.messageList.push({
          id:+new Date(),
          data,
        })
      })
    },
    // 加入聊天
    join(){
      socket.emit('join', this.name);
      this.isJoin = true;
    },
    // 有人加入聊天
    welcome(){
      socket.on('welcome', (name, len) => {
        this.messageList.push({
          id:+new Date(),
          data:`欢迎 ${name} 加入群聊`,
        })
        this.member = len;
      })
    },
    // 有人退出聊天
    quit(){
      socket.on('quit', (name, len) => {
        this.messageList.push({
          id:+new Date(),
          data:`${name} 退出群聊`,
        })
        this.member = len;
      })
    }
  }
})


