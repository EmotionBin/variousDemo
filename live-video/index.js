// 这里是调用腾讯云API必填的APPID和SECRET
const SKDAPPID = 666666666;
const SECRETKEY = '上腾讯云填自己的字段值，因为需要收费的';

// 获取一个唯一的字符串
function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt((1 + Math.random()) * 65536) + '';
  return (+(randomNum + timestamp)).toString(32);
}

// 获取userId，这里调用生成的唯一字符串的函数，作为userId，测试用
const userId = createUniqueString();
console.log('用户id', userId);

// 有效时间
const EXPIRETIME = 7 * 24 * 60 * 60;

// 获取userSig
const generator = new LibGenerateTestUserSig(SKDAPPID, SECRETKEY, EXPIRETIME);
const userSig = generator.genTestUserSig(userId);

// 创建视频流客户端对象
const client = TRTC.createClient({
  mode:'rtc',
  sdkAppId:SKDAPPID,
  userId,
  userSig
});

// 进入音视频通话的事件
const  roomId = '000001';
client.join({roomId}).then(() => {
  console.log('进入房间成功');
  
  // 创建本地音视频流
  const localStream = TRTC.createStream({
    userId,
    audio:true, // 播放音频
    video:true // 播放视频
  })

  // 初始化音视频流
  localStream.initialize().then(() => {
    console.log('初始化本地流成功');

    // 将本地视频流的视频音频渲染在页面上
    // 将div的id名称传入到play方法即可
    localStream.play('local');

    // 将本地的音视频流发布出去
    client.publish(localStream).then(() => {
      console.log('音视频流发布成功');
    }).catch(err => {
      console.error('音视频流发布失败', err);
    })
  }).catch(err => {
    console.error('初始化本地流失败', err);
  })
}).catch(err => {
  console.error('进入房间失败', err);
})

// 订阅远端的视频流，可以理解为有人加入房间
client.on('stream-added', event => {
  // 从事件对象中获取远端视频流
  const remoteStream = event.stream;
  console.log('远端视频流增加：', remoteStream.getId());

  // 订阅远端视频流
  client.subscribe(remoteStream);
})

// 监听订阅到的视频流，并对其进行播放
client.on('stream-subscribed', event => {
  // 从事件对象中获取远端视频流
  const remoteStream = event.stream;
  console.log('远端视频流订阅成功：', remoteStream.getId());
  remoteStream.play('remote');
})


