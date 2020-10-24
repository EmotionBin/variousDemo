new Vue({
  el: '#app',
  name: 'app',
  data: {
    username:'',
    password:'',
    isLogin:false
  },
  created() {
    this.isLoin();
  },
  methods: {
    // 判断是否登录 若没登陆 跳转至 SSO 登录页面 登录则请求用户信息
    isLoin(){
      const code = window.location.search.substr(1).split('=')[1];
      if(!code){
        window.location.href = `/sso.html?redirect_uri=${window.encodeURIComponent(window.location.href)}`;
      }else{
        // 验证 code 是否有效
        this.getUserInfo(code);
      }
    },
    // 登录
    login(){
      fetch(`/login?username=${this.username}&password=${this.password}`)
        .then(res => res.json())
        .then(res => {
          res.status && (this.isLogin = true);
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
          }else{
            alert(res.detail);
          }
        })
    }
  }
})