# token过期自动刷新

前端每次请求都在请求头中带上 token，后端校验 token，如果 token 过期，对于活跃用户自动续期，并且不改变当前 token 值  

**实现原理：在服务端做一个 token 映射，token 有两个，一个是给客户端的 token，另一个是服务端的 cache token，通过 token 找到 cache token，用 cache token 来进行校验**

参考
https://zhuanlan.zhihu.com/p/163053370