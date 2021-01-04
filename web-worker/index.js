// 引用本地文件的方式初始化 web worker
// const myWorker = new Worker("worker.js")

// myWorker.onmessage = function (e) {
//   const { data } = e
//   console.log('我是页面，我收到了web worker发来的消息', data)
// }

// const message = '这是页面发送的消息'
// myWorker.postMessage(message)


// 内嵌的方式初始化 web worker
const worker = `
  onmessage = function (e) {
    const { data } = e
    console.log('我是worker，我收到了页面发来的消息: ', data)
    const message = '这是worker发送的消息'
    postMessage(message)
  }
`

const blob = new Blob([worker])
const myWorker = new Worker(window.URL.createObjectURL(blob))

myWorker.onmessage = function (e) {
  const { data } = e
  console.log('我是页面，我收到了web worker发来的消息', data)
}

const message = '这是页面发送的消息'
myWorker.postMessage(message)
