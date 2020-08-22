let count = 0;
const container = document.querySelector('#container');

/**
 * 节流函数时间戳版 第一次会触发 最后一次不会触发
 * @param {function} cb 
 * @param {number} wait 
 */
function throttle1(cb, wait){
  let context, args;
  let old = 0;
  return function(){
    context = this;
    args = arguments;
    let now = + new Date();
    if(now - old > wait){
      cb.apply(context, args);
      old = now;
    }
  }
}

/**
 * 节流函数定时器版 第一次不会触发 最后一次会触发
 * @param {function} cb 
 * @param {number} wait 
 */
function throttle2(cb, wait){
  let context, args, timer;
  return function(){
    context = this;
    args = arguments;
    if(!timer){
      timer = setTimeout(() => {
        cb.apply(context, args);
        timer = null;
      }, wait)
    }
  }
}

/**
 * 节流函数结合版 第一次会触发 最后一次也会触发
 * @param {function} cb 
 * @param {number} wait 
 */
function throttle3(cb, wait){
  let context, args, timer;
  let old = 0; // 时间戳
  let later = function(){
    old = + new Date();
    timer = null;
    cb.apply(context, args);
  }
  return function(){
    context = this;
    args = arguments;
    let now = + new Date();
    if(now - old > wait){
      if(timer){
        clearTimeout(timer);
        timer = null;
      }
      cb.apply(context, args);
      old = now;
    }else if(!timer){
      timer = setTimeout(later, wait)
    }
  }
}

/**
 * 节流函数可配置版本 可自由配置 除了第一次不触发，最后一次也不触发的情况，这样会有bug
 * @param {function} cb 
 * @param {number} wait 
 * @param {object} options
 */
function throttle(cb, wait, options){
  let context, args, timer;
  let old = 0; // 时间戳
  if(!options) options = {};
  let later = function(){
    old = + new Date();
    timer = null;
    cb.apply(context, args);
  }
  return function(){
    context = this;
    args = arguments;
    let now = + new Date();
    if(options.leading === false){
      old = now;
    }
    if(now - old > wait){
      if(timer){
        clearTimeout(timer);
        timer = null;
      }
      cb.apply(context, args);
      old = now;
    }else if(!timer && options.trailing !== false){
      timer = setTimeout(later, wait)
    }
  }
}

function dosomething (e){
  console.log('拿到事件参数：', e);
  console.log('正确获取this指向：', this);
  container.innerHTML = ++ count;
  return '我是返回值';
}

container.onmousemove = throttle(dosomething, 1000, {
  leading:true,
  trailing:true
});