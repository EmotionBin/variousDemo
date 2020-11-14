const app = new Vue({
  el:'#app',
  name:'app',
  data:{
    config:[
      {
        type:0,
        title:'1.svg验证码，后端返回svg图片给前端，前端把svg转blob，再转成base64',
        value:'',
        image:''
      },
      {
        type:1,
        title:'2.svg验证码，后端直接返回base64',
        value:'',
        image:''
      },
      {
        type:2,
        title:'3.算数验证码，后端直接返回base64',
        value:'',
        image:''
      },
      {
        type:3,
        title:'4.纯前端的滑块验证码'
      }
    ]
  },
  mounted() {
    this.init()
  },
  methods:{
    init(){
      this.config.forEach(item => this.getCode(item.type))
    },
    getCode(type){
      if(type === 3){
        // 滑块验证码
        jigsaw.init({
          el: this.$refs.slider[0],
          width: 310, // 可选, 默认310
          height: 155, // 可选, 默认155
          onSuccess: function () { alert('验证通过') },
          onFail: function () { alert('验证失败') },
          onRefresh: function () { console.log('刷新滑块验证码') }
        })
        return 
      }
      fetch(`/getCode?type=${type}`)
        .then(res => {
          if(type === 0){
            const blob = res
              .blob()
              .then(blob => {
                // blob 转 base64
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = e => this.config[type].image = e.target.result
              })
          }
          if(type === 1 || type === 2){
            const json = res
              .json()
              .then(json => this.config[type].image = json.status ? json.data : '')
          }
        })
    },
    checkCode(type){
      fetch(`/check?type=${type}&code=${this.config[type].value}`)
        .then(res => res.json())
        .then(res => alert(res.status ? '验证通过!' : '验证失败'))
    }
  }
})