new Vue({
  el: '#app',
  name: 'app',
  data: {
    username: '',
    password: ''
  },
  methods: {
    // 登录
    login() {
      const redirect_uri = window.location.search.substr(1).split('=')[1];
      fetch(`/login?username=${this.username}&password=${this.password}`)
        .then(res => res.json())
        .then(res => {
          const { code, status } = res;
          if(!status){
            alert('登陆失败');
            return;
          }
          window.location.href = `${window.decodeURIComponent(redirect_uri)}?code=${code}`;
        })
    }
  }
})