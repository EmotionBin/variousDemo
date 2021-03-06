# token 自动刷新

这里使用了一个第三方库，具体可以看这里 [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)  

token 常用于身份校验，用户登录后，后端生成 token 返回给前端，前端存储，**这里假设前端每次请求都会带上 token，没有判断未携带 token的情况**，主要实现两个功能：  

1. token 自动刷新，对于活跃用户，每次请求 token 校验通过后自动刷新 token，延长过期时间，并且前端存储的 token 不变
2. 单点登录，只允许一个地方登录，如果又在其他地方登录则会挤掉当前登录状态

**对于以上两点的实现核心原理就是，前端存储的 token 其实并不是真正的 token，只是一个 hash 字符串，这个 hash 字符串是真正的 token 的一个映射**  

服务端会有两个记录映射的集合，分别是 `USER_HASH_MAP` 与 `HASH_TOKEN_MAP`，前者记录用户名与 hash 值的映射，后者记录 hash 值与 token 的映射

**完整流程大概是这样**，用户登录，把用户名传递到后端，后端根据用户名生成一个 hash 值，再根据这个 hash 值生成 token，返回给前端 hash 值，并且记录他们之间的映射关系(用户名 -> hash 值，hash 值 -> token)，此时视为登录成功，用户发送请求，携带 hash 值，后端通过映射关系(hash 值 -> token)找到 token，校验 token，校验通过后，根据这个 hash 值重新生成 token，并覆盖旧的 token，这里就实现了 token 自动刷新并且不改变前端记录的 hash 值；若用户登录成功后，又在别的地方进行登录操作，则将该用户当前的所有映射关系(用户名 -> hash 值，hash 值 -> token)清空，重新生成映射关系并记录，此时，旧的映射关系已经清空了，旧的 token 必然会失效，这里实现了单点登录    

这里有两个页面 index.html 与 index1.html，可以用于模拟两个不同用户，也可以模拟两个相同用户测试单点登录功能，只需要修改 `getToken()` 函数中的请求头用户信息 `username` 字段的值即可，若 `username` 字段的值相同，则为两个相同的用户，反之则为两个不同用户