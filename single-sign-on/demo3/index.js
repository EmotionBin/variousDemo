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
      window.addEventListener('message', data => this.getUserInfo(data.data), false);
    },
    // 登录
    login(){
      fetch(`/login?username=${this.username}&password=${this.password}`)
        .then(res => res.json())
        .then(res => {
          res.status && (this.isLogin = true);
          document.querySelector('#testIframe').contentWindow.postMessage(res.code, '*');
        })
    },
    // 尝试获取用户信息 有则直接登录
    getUserInfo(code){
      fetch(`/getUserInfo?code=${code}`)
        .then(res => res.json())
        .then(res => {
          if(res.status){
            this.username = res.data.username;
            this.password = res.data.password;
            this.isLogin = true;
          }
        })
    }
  }
})