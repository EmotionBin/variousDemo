// // 引入@babel/polyfill对js做全部兼容性处理
// // import '@babel/polyfill';

// const add = (x, y) => x + y;

// console.log(add(1, 3));

// const promise = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log('定时器执行完了~');
//     resolve();
//   }, 1000);
// });

// console.log('promise: ', promise);

import { mul } from './test';
import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(mul(2, 3));

console.log(sum(1, 2, 3, 4, 5, 6, 7, 8));

// 注册serviceworker
// 并处理兼容性问题
/**
 * 需要在package.json中配置
 * "env":{
      "browser": true
    }

    2.sw代码必须运行在服务器上
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功');
      }).catch(() => {
        console.log('sw注册失败');
      });
  });
}
