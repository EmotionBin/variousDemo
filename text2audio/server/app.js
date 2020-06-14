// express
let express = require('express');
// 获取baidu语音合成接口
let AipSpeechClient = require('baidu-aip-sdk').speech;
// 导入node文件管理模块
var fs = require('fs')


// 设置APPID/AK/SK
var APP_ID = "18863213";
var API_KEY = "S4nNrEdSGdYGYRcP0EdDvvgK";
var SECRET_KEY = "qcb74TSD1TrifoPtY9q6iOo77r9VKomS";

// 实例化接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

// 将百度接口调用函数封装
function createAudio(text){
    return new Promise((resolve, reject)=>{
        //调用接口生成音频文件
        client.text2audio(text).then(function(result){
            // result.data,音频数据写入
            if(result.data){
                // 生成当前时间戳
                let time = new Date().getTime()
                // 同步方式写入文件
                fs.writeFileSync(`static/audio/voice${time}.mp3`,result.data)
                resolve(`/audio/voice${time}.mp3`)
            }else{
                console.log('文件写入失败')
                reject('文件写入失败')
            }
        },function(e){
            console.log("接口出错了")
            reject(e)
        })
    })
}

// 实例化服务器
let app = express();

// 静态服务器中间件设置
app.use(express.static('static'));

// 跨域处理中间
app.use((req, res, next)=>{
    res.append('Access-Control-Allow-Origin',"*");
    res.append('Access-Control-Allow-Content-Type',"*");
    next();
})

app.get('/', (req, res)=>{
    res.send('语音合成');
})


app.get('/api/audio', async (req,res)=>{
    // 获取get里，text的参数
    let text = req.query.text
    // 调用生成音频文件，并且获取音频文件的链接地址
    let audioLink = await createAudio(text)
    // 以json的形式返回audio地址给前端
    res.json({audioLink})
})

app.listen(8888,()=>{
    console.log('server start:','http://localhost:8888')
})
