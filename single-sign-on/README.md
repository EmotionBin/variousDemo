# 单点登录SSO

单点登录即 Single Sign On，简称 **SSO**，简单来说，单点登录就是**在多个系统中，用户只需一次登录，各个系统即可感知该用户已经登录**  

这里会演示三个版本的单点登录 demo  

1. 同域名下的单点登录(域名一致，端口跨域不一致)
2. 不同域名下的单点登录(借助 SSO 登录系统)
3. 不同域名下的单点登录(借助 iframe 实现 localStorage 跨域共享)

## 同域名下的单点登录

文件在 demo1 目录下，需要运行 app.js 开启 node 服务，分别打开 `http://localhost:9527/index.html` 与 `http://localhost:9528/index.html` 这两个本地不同端口的网站  

打开后随便任意一个网站中输入账号密码，点击登录显示登陆成功，然后刷新另外一个网站，同时也会登录成功  

实现原理：在一个网站登录成功后，后端生成 uuid，并根据 uuid 记录用户信息，同时将该 uuid 写入浏览器的 cookie 中，**因为这两个网站是在同域名下的，所以他们的 cookie 是可以共享的**，此时刷新另一个网站，，检测到有 cookie 中有 uuid 字段，带着 uuid 向后端请求用户信息，完成登录  

## 不同域名下的单点登录(借助 SSO 登录系统)

文件在 demo2 目录下，需要运行 app.js 开启 node 服务，分别打开 `http://localhost:9527/index.html` 与 `http://localhost:9528/index.html` 这两个本地不同端口的网站，可以假设这两个网站现在在两个不同的域名下  

随意打开其中一个网站，没登录会自动跳转到 SSO 登录系统，输入用户名和密码登录，登录成功，然后刷新另外一个网站，同时也会登录成功  

实现原理：因为这两个网站是在不同的域名下的，所以不能通过 cookie 共享字段，因为 cookie 不支持跨域(如果两个域名不同的网站顶级域名相同则可以利用 cookie 的 domain 属性实现 cookie 共享)。所以在这种情况下就需要引入一个 SSO 登录系统，只要没有登录都会自动跳转到 SSO 登录页面(需要带着 redirect_uri 参数，用于登录成功跳转)，在这里登录成功后，后端返回一个 code，并将 code 写入 cookie(注意这个 cookie 是 SSO 登录页面的域名独有的)，再根据 redirect_uri 重定向回之前的页面，拿到 code 后向后端请求用户数据，登录成功，在另一个页面中刷新，由于另一个页面没有登录会跳转到 SSO 登录页面，此时，因为 cookie 中记录有 code 值，则向后端验证 code 值是否有效，有效则重定向回之前的页面，再带着这个 code 向后端请求用户数据，登录成功  

## 不同域名下的单点登录(借助 iframe 实现 localStorage 跨域共享)

文件在 demo3 目录下，需要运行 app.js 开启 node 服务，分别打开 `http://localhost:9527/index.html` 与 `http://localhost:9528/index.html` 这两个本地不同端口的网站，可以假设这两个网站现在在两个不同的域名下 

**iframe实现localStorage跨域通信**，比如淘宝和天猫单点登录，因为淘宝和天猫都嵌入了同一个iframe，借助这个iframe与postMessage实现跨域

参考：https://www.jianshu.com/p/75edcc05acfd



