new Vue({
  el:'#app',
  name:'app',
  data:{
    themeList:[
      {
        title:'主题1',
        value:{
          mainColor: 'red',
          testColor:'green',
          fontColor:'grey'
        }
      },
      {
        title: '主题2',
        value: {
          mainColor: 'yellow',
          testColor: 'blue',
          fontColor: 'red'
        }
      },
      {
        title: '主题3',
        value: {
          mainColor: 'pink',
          testColor: 'grey',
          fontColor: 'green'
        }
      },
      {
        title: '主题4',
        value: {
          mainColor: 'blue',
          testColor: 'aqua',
          fontColor: 'pink'
        }
      },
      {
        title: '主题5',
        value: {
          mainColor: 'green',
          testColor: 'red',
          fontColor: 'aqua'
        }
      }
    ]
  },
  methods:{
    changeTheme(index){
      const colorValueObj = this.themeList[index].value;
      Object.keys(colorValueObj).forEach(item => {
        document.body.style.setProperty(`--${item}`, colorValueObj[item]);
      })
    }
  }
})