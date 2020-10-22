new Vue({
  el: '#app',
  name: 'app',
  data: {
    second:3
  },
  mounted(){
    this.getAccessToken();
  },
  methods: {
    // 获取access_token
    getAccessToken() {
      const code = window.location.search.substr(1).split('=')[1];
      fetch(`/getAccessToken?code=${code}`)
        .then(res => res.json())
        .then(res => {
          const { access_token, status, detail } = res;
          if (!status) {
            alert(`认证失败${detail}`);
            return;
          }
          // 获取到access_token
          console.log(access_token);
          // 将access_token写入
          window.localStorage.setItem('access_token', access_token);
          this.timer = setInterval(() => {
            this.second --;
            if(!this.second) {
              clearInterval(this.timer);
              this.close();
            }
          }, 1000);
        })
    },
    // 关闭窗口
    close() {
      window.close();
    }
  }
})