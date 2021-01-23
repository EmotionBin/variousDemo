this.addEventListener('install', function (event) {
  console.log('Service Worker install')
})

this.addEventListener('activate', function (event) {
  console.log('Service Worker activate')
})

this.addEventListener('message', function (event) {
  console.log(event.data) // this message is from page
})

// this.addEventListener('install', function (event) {
//   console.log('install')
//   event.waitUntil(
//     caches
//       .open('sw_demo')
//       .then(function (cache) {
//         return cache.addAll([
//           '/style.css',
//           '/panda.jpg',
//           './main.js'
//         ])
//       })
//   )
// })
