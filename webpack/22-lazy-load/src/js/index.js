
console.log('index.js被加载了');

// import { mul } from './test';

document.getElementById('btn').onclick = function () {
  import (/* webpackChunkName:'test', webpackPrefetch:true */'./test')
    .then(({ mul }) => {
      console.log(mul(4, 5));
    })
}

