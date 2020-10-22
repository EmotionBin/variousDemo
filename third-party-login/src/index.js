new Vue({
  el: '#app',
  name: 'app',
  data: {
    username:'',
    password:'',
    isLogin:false
  },
  methods: {
    // 登录
    login(){
      this.isLogin = true;
    },
    // 第三方登录
    thirdPartyLogin(){
      const width = 600;
      const height = 600;
      const top = 60;
      const left = 60;
      const redirect_uri = 'http://localhost:9527/success.html';
      this.childWindow = window.open(`http://localhost:9528/index1.html?redirect_uri=${window.encodeURIComponent(redirect_uri)}`, 'test', `width=${width}, height=${height}, top=${top}, left=${left}`);
      // 监听第三方登录页面关闭事件
      this.timer = setInterval(() => {
        if(this.childWindow.closed){
          // 第三方登页面关闭的回调
          clearInterval(this.timer);
          // 拿到access_token
          const access_token = window.localStorage.getItem('access_token');
          this.getUserInfo(access_token);
        }
      }, 500);
    },
    // 登录成功 带着 access_token 请求用户数据
    getUserInfo(access_token){
      fetch(`/getUserInfo?access_token=${access_token}`)
        .then(res => res.json())
        .then(res => {
          const { username, password } = res.data;
          this.username = username;
          this.password = password;
          this.isLogin = true;
        })
    }
  }
})