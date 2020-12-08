Vue.config.devtools = true;

// 建立socket连接
const socket = io('http://localhost:9528');

new Vue({
  el:'#app',
  data:{
    messageList:[],
    inputValue:''
  },
  created(){

  },
  mounted(){
    this.getMsg();
  },
  beforeDestroy() {

  },
  methods:{
    // 提交信息
    send(){
      if(!this.inputValue) return;
      // 发送信息
      socket.emit('message', this.inputValue);
    },
    // 接收信息
    getMsg(){
      socket.on('broadcast', data => {
        this.messageList.push({
          id:+new Date(),
          data,
        })
      })
    }
  }
})


