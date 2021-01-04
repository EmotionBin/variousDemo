/**
 * worker
 */

onmessage = function (e) {
  const { data } = e
  console.log('我是worker，我收到了页面发来的消息: ', data)
  const message = '这是worker发送的消息'
  postMessage(message)
}
