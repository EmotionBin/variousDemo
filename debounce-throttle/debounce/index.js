let count = 0;
const container = document.querySelector('#container');

/**
 * 防抖函数
 * @param {function} cb 
 * @param {number} wait 
 * @param {boolean} immediate 
 */
function debounce(cb, wait, immediate){
  let timer;
  return function (){
    const args = arguments; 
    const context = this;
    if(timer) clearTimeout(timer);
    if(immediate){
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait)
      if(callNow) return cb.apply(context, args);
    }else{
      timer = setTimeout(function() {
        return cb.apply(context, args);
      }, wait);
    }
  }
}

function dosomething (e){
  console.log('拿到事件参数：', e);
  console.log('正确获取this指向：', this);
  container.innerHTML = ++ count;
  return '我是返回值';
}

container.onmousemove = debounce(dosomething, 300, false);