# axios

axios 是一个基于 promise 的轻量级发送请求的第三方库，以后尽量使用它，不再像以前一样使用 jquery 的 ajax，原因有两点，第一，jquery 不符合当前 MVVM 架构的思想，第二，如果只为了使用它的 ajax 而需要把一整个库引入有点大可不必，为了性能考虑不建议这样做  

## 使用方法

1. 发送无参数的 get 请求  

```javascript
axios({
  url:'getData',
  method:'get'
}).then(res => {
  console.log('无参数的get请求:',res.data);
});
```

axios 默认请求的方法就是 get，字段 method 不填默认发送 get 请求  

2. 发送带参数的 get 请求

```javascript
axios({
  url:'getData',
  method:'get',
  params: {
    data: 12345,
    data1:54321
  }
}).then(res => {
  console.log('带参数的get请求:',res.data);
})
```

使用 params 字段，传递一个对象，会自动在 url 上进行拼接  

3. 发送无参数的 post 请求

```javascript
axios({
  url:'getData',
  method:'post'
}).then(res => {
  console.log('无参数的post请求:',res.data);
})
```

当需要发送 post 请求时需要把 method 字段设置为 post  

4. 发送带参数的 post 请求

```javascript
// application/json
axios({
  url:'getData',
  method:'post',
  data:{
    data:111,
    data1:222
  }
}).then(res => {
  console.log('带参数的post请求:',res.data);
})
```

axios 的post 请求默认格式为 `application/json`，需要后端处理 `application/json` 请求  

```javascript
// x-www-form-urlencoded
axios({
  url:'getData',
  method:'post',
  data:Qs.stringify({
    data:111,
    data1:222
  })
}).then(res => {
  console.log('带参数的post请求:',res.data);
})
```

发送 `x-www-form-urlencoded` 的请求时，需要借助 qs 模块的 `Qs.stringify()` 方法处理，注意 q 和 Q 大小写区别，不一定，根据情况决定(直接引包或 es6 模块)  

```javascript
// multipart/form-data
let formData = new FormData();
formData.append('data',111);
formData.append('data1',222);
axios({
  url:'http://localhost:9528/getData1',
  method:'post',
  data:formData
}).then(res => {
  console.log('带参数的post请求:',res.data);
})
```

发送 `form-data` 的请求需要利用 FormData，可以发送二进制数据，如图片、其他文件等

5. 实例化与设置默认配置

```javascript
// 实例化axios
const myAxios = axios.create();
// 设置默认路径 方便拼接
myAxios.defaults.baseURL = 'http://localhost:9527';
```

这里实例化了一个 `myAxios` 并设置默认路径，接下来就可以用 `myAxios` 发送各种请求并做路径拼接  

```javascript
myAxios({
  url:'getData',
  method:'post',
  data:Qs.stringify({
    data:111,
    data1:222
  })
}).then(res => {
  console.log('带参数的post请求:',res.data);
})
```

这里只是举一个例子，想要了解更多可以看官方文档 [axios官方文档](http://www.axios-js.com/zh-cn/docs/#%E5%88%9B%E5%BB%BA%E5%AE%9E%E4%BE%8B)  

6. 拦截器

```javascript
// 请求拦截器
myAxios.interceptors.request.use(
  config => {
    config.headers.common['Authorization'] = 'custom-token';
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
)
```

请求拦截器多用于添加自定义的请求头，总之，在请求发送之前可以对请求做一系列的处理  

```javascript
myAxios.interceptors.response.use(
  response => {
    response.data = `响应被拦截了!!!${response.data}`;
    return response;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
)
```

响应拦截器多用于处理各种状态码，也可以处理响应数据等  

## 一些其他的东西

这里主要想说一下我自己在使用 axios 时遇到的坑，情况是这样的，跨域的情况下，需要在请求头中添加自定义请求头字段(如 `Authorization`)，在这种情况下就是复杂请求，复杂请求不仅仅是后端设置 CORS 那么简单了，此时 axios 会先发送一个 options 预请求，**所以需要后端设置处理 options 请求，设置 CORS，设置允许的自定义请求头字段，允许的请求方法，一定要对 options 请求作处理，否则会一直处于 pending 状态，这一点很重要**

具体操作如下(这里以 express 为例)：  

```javascript
app.all('*', (req, res, next) => {
  // 设置请求头为允许跨域 CORS
  res.header('Access-Control-Allow-Origin', '*');
  // 设置服务器支持的所有请求头信息字段
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
  // 设置服务器支持的所有跨域请求的方法
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // 这里对 options 请求进行单独处理
  if (req.method.toLowerCase() === 'options') {
    console.log('options: ', 'options');
    res.sendStatus(204);  // 让options尝试请求快速结束
  } else {
    next();
  }
});
```
