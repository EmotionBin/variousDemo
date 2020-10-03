import { h } from 'snabbdom/build/package/h';
import { init } from 'snabbdom/build/package/init';

let patch = init([]);

let vnode = h('div#container',[
  h('h1','Hello Snabbdom'),
  h('p', '这是一个p标签')
]);

let app = document.querySelector('#app');

let oldVnode = patch(app, vnode);

setTimeout(() => {
  vnode = h('div#container',[
    h('h1','Hello Snabbdom'),
    h('p', 'Hello P')
  ]);
  patch(oldVnode, vnode);

  // 清空页面元素 利用h函数创建一个注释节点('!')
  patch(oldVnode, h('!'));
}, 2000);
