# 图片自动矫正旋转

有时候上传图片的时候会造成图片自动旋转，需要前端攻城狮去把它矫正，造成这种现象的根本原因就是图片的 EXIF 信息中的 Orientation 字段值错误  

**注意：要读取图片的 EXIF 数据，那么图片必须要满足 EXIF 标准，目前 EXIF 标准仅适用于 .jpg 和 .tiff 图像**  

要自动矫正错误旋转的图片，必须要拿到该图片的 Orientation 字段值，Orientation 字段值可能为一下几种：  

| 旋转角度        | 参数     |
| :--------:     | :-----:  |
| 0°             |   1      |  
| 顺时针90°       |   6     |   
| 逆时针90°       |   8     |  
| 180°           |    3     |  

这里可以在线查看 EXIF 信息 [传送门](http://exif-viewer.com)  

要进行自动矫正，具体细节需要我们怎么实现呢，这里就需要借助一个第三方库，`exif-js`，github地址 [传送门](https://github.com/exif-js/exif-js)  

这里可以查看各种 API 的使用 [传送门](http://code.ciaoca.com/javascript/exif-js)  

具体实现可以看 index.js 文件，images 目录下有一些可用的图片(满足 EXIF 标准，并且存储有 EXIF 数据)可以测试  