# 验证码

验证码通常用于验证，在登陆的时候比较常见，这里会演示以下几种验证码  

1. base64 图片验证码
2. 问题验证码,如 8 + 5 = ?
3. 滑块验证码

----

## base64图片验证码

实现原理:后端生成一个 base64 图片，返回前端，验证码的值后端自行存储，前端提交验证码，后端进行校验  

这里后端使用的是 nodejs，需要借助一个第三方库 [svg-captcha](https://github.com/produck/svg-captcha)  

----

## 问题验证码

实现原理:同上  

这里后端使用的是 nodejs，需要借助一个第三方库 [svg-captcha](https://github.com/produck/svg-captcha)  

----

## 滑块验证码

实现原理:纯前端的滑块验证码，前端利用 canvas 实现，没有与后台交互，不能保证安全  

这里是纯前端实现的，也需要借助一个第三方库 [jigsaw](https://github.com/yeild/jigsaw)  
