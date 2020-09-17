
new Vue({
  el:'#app',
  name:'app',
  data:{
    token:'',
    isExpire:'否' // token 是否过期
  },
  created(){
    this.getToken();
  },
  methods:{
    // 获取 token 相当于登录
    getToken(){
      // 发送请求
      fetch('/getToken',{
        headers: {
          username:'user-index'
        }
      })
        .then(res => res.text())
        .then(res => {
          console.log(res);
          this.token = res;
        });
    },
    // 验证 token，相当于发请求并携带 token
    verifyToken(){
      fetch('/verifyToken',{
        headers: {
          token:this.token
        }
      })
        .then(res => res.text())
        .then(res => {
          if(JSON.parse(res)){
            this.isExpire = '是';
            alert('token 已过期，请重新登录')
          }
        });
    }
  }
})