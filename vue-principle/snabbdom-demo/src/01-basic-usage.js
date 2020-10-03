import { h } from 'snabbdom/build/package/h';
import { init } from 'snabbdom/build/package/init';

// 返回值 patch 函数 作用是对比两个vnode的差异更新到真实dom
let patch = init([]);

// 第一个参数 标签+选择器 
// 第二个参数 如果是字符串的话就是标签中的内容
let vnode = h('div#container.cls','Hello World');

let app = document.querySelector('#app');

// 第一个参数 可以是dom元素 内部会把dom元素转换成vNode
// 第二个参数 vNode
// 返回值 vNode
let oldVnode = patch(app, vnode);

vnode = h('div', 'Hello Snabbdom');

patch(oldVnode, vnode);