import { h } from 'snabbdom/build/package/h';
import { init } from 'snabbdom/build/package/init';

import { styleModule } from 'snabbdom/build/package/modules/style';
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners';

// 注册模块
let patch = init([
  styleModule,
  eventListenersModule
]);

// 使用 h 函数的第二个参数传入模块需要的数据
// 设置样式 和注册事件等
let vnode = h('div',{
  style:{
    backgroundColor:'red'
  },
  on:{
    click:eventHandler
  }
},[
  h('h1', 'Hello Snabbdom'),
  h('p', '这是p标签')
])

function eventHandler(){
  console.log('点击我了');
}

let app = document.querySelector('#app');

patch(app, vnode);
