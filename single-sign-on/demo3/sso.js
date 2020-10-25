new Vue({
  el: '#app',
  name: 'app',
  data: {
    username:'',
    password:'',
    isLogin:false
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init(){
      window.addEventListener('message', data => this.getMessage(data.data), false);
      const uuid = window.localStorage.getItem('uuid');
      if(uuid) window.parent.postMessage(uuid, '*');
    },
    // 获取父页面传过来的消息 写入 localStorage
    getMessage(data){
      window.localStorage.setItem('uuid', data);
    },
    // 登录
    login(){
      fetch(`/login?username=${this.username}&password=${this.password}`)
        .then(res => res.json())
        .then(res => {
          res.status && this.redirect(res.code);
        })
    }
  }
})