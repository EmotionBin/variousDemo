new Vue({
  el: '#app',
  name: 'app',
  data: {
    username:'',
    password:'',
    isLogin:false
  },
  created() {
    this.verifyCode();
  },
  methods: {
    // 登录
    login(){
      fetch(`/login?username=${this.username}&password=${this.password}`)
        .then(res => res.json())
        .then(res => {
          res.status && this.redirect(res.code);
        })
    },
    // 验证 code 是否有效
    verifyCode(){
      if(!document.cookie) return;
      const cookieString = document.cookie;
      const cookieItem = cookieString.indexOf(';') > -1 ? cookieString.split(';') : [cookieString];
      console.log('cookieItem: ', cookieItem);
      const COOKIE_MAP = {};
      cookieItem.forEach(item => {
        const cookieEach = item.split('=');
        const key = cookieEach[0];
        const value = cookieEach[1];
        COOKIE_MAP[key] = value;
      })
      console.log('COOKIE_MAP: ', COOKIE_MAP);
      fetch(`/verifyCode?code=${COOKIE_MAP.code}`)
        .then(res => res.json())
        .then(res => {
          res.status && this.redirect(COOKIE_MAP.code);
        })
    },
    // 重定向
    redirect(code){
      const redirect_uri = window.location.search.substr(1).split('=')[1];
      // 登录成功 重定向回网站页面
      window.location.href = `${window.decodeURIComponent(redirect_uri)}?code=${code}`;
    }
  }
})