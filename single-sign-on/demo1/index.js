new Vue({
  el: '#app',
  name: 'app',
  data: {
    username:'',
    password:'',
    isLogin:false
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 登录
    login(){
      fetch(`/login?username=${this.username}&password=${this.password}`)
        .then(res => res.json())
        .then(res => {
          res.status && (this.isLogin = true);
        })
    },
    // 尝试获取用户信息 有则直接登录
    getUserInfo(){
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
      fetch(`/getUserInfo?uuid=${COOKIE_MAP.uuid}`)
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