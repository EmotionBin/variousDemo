document.querySelector('input').addEventListener('change', onFileChange);

const container = document.querySelector('.preivew');
const container1 = document.querySelector('.preivew1');

function onFileChange(e) {
  const file = e.target.files[0];
  
  // test
  setTimeout(() => {
    var img1 = document.getElementById("img1");
    EXIF.getData(img1, function() {
      console.log(EXIF.pretty(this));
      var make = EXIF.getTag(this, "Make");
      var model = EXIF.getTag(this, "Model");
      console.log('model: ', model);
      console.log('make: ', make);
    });
  },1000)
  // 

  container.src = URL.createObjectURL(file);
  rotateImg(file).then(blob => {
    container1.src = URL.createObjectURL(blob) // 转换后的img
    /*
     *这里把转换后的blob对象下载在电脑上查看，实际开发中忽略
     */
    // const url = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', 'AAAAAA');
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // window.URL.revokeObjectURL(url);
})
}

function rotateImg(file) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      // 获取图片源数据 上面已经引入EXIF全局变量
      EXIF.getData(img, function () {
        // 获取图片orientation值
        console.log(EXIF.getAllTags(this))
        let orientation = EXIF.getTag(this, "Orientation");
        console.log('orientation: ', orientation);
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        switch (orientation) {
          case 3: // 旋转180°
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.rotate((180 * Math.PI) / 180);
            ctx.drawImage(img, -img.width, -img.height, img.width, img.height);
          break;
          case 6: // 旋转90°
            canvas.width = img.height;
            canvas.height = img.width;
            ctx.rotate((90 * Math.PI) / 180);
            ctx.drawImage(img, 0, -img.height, img.width, img.height);
          break;
          case 8: // 旋转-90°
            canvas.width = img.height;
            canvas.height = img.width;
            ctx.rotate((-90 * Math.PI) / 180);
            ctx.drawImage(img, -img.width, 0, img.width, img.height);
          break;
          default: // 没有源信息的图片和正常的图片是不需要旋转的
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
          break;
        }
        // 处理完返回 (这里返回都是被压缩的，根据实际情况更改正常的图片处理方式)
        canvas.toBlob(file => resolve(file), 'image/jpeg', 0.92)
      })
    }
  })
}
