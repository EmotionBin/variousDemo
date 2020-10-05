// 手写vue的观察者模式

class Dep {
  constructor () {
    // 记录所有的订阅者
    this.subs = [];
  }

  // 添加订阅者
  addSub (sub) {
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }

  // 发布通知
  notify () {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}

class Watcher {
  update () {
    console.log('update');
  }
}

// 测试
let dep = new Dep();
let watcher = new Watcher();

dep.addSub(watcher);

dep.notify();

let btn = document.querySelector('#button');
btn.onclick = function () {
  dep.notify();
}




