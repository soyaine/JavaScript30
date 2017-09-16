window.onload = function() {
    canvas = document.querySelector('canvas');
    video = document.querySelector('video');
    ctx = canvas.getContext('2d');
    img = document.querySelector('#myimg');
    slider = document.querySelector('.rgb');
    a = document.querySelector('a');
    //滤色范围记录
    filter = {
        rmin: 0,
        rmax: 255,
        gmin: 0,
        gmax: 255,
        bmin: 0,
        bmax: 255
    }

    //调用摄像头数据
            askWebcam();

    //绑定change事件动态修改图片颜色
    slider.onchange = function(e) {
        //先将canvas恢复至原始截图
        ctx.putImageData(origindata, 0, 0);
        const target = e.target;
        //startPos表示操作像素点数据时的起点，从canvas获取到的像素数据每四个值表示一个像素点
        //例如滑块为红色，则只需要改变像素数组中第0,4,8......个元素的值。
        const startPos = {
            'r': 0,
            'g': 1,
            'b': 2
        }[target.name[0]];
        //filterMin和filterMax表示相应的滤色范围上下限，若修改了红色滤色范围则取红色范围值。
        //若修改蓝色的滤色范围，则取蓝色。
        var tempFilter = checkFilter(target.name, target.value);
        const filterMin = tempFilter.min;
        const filterMax = tempFilter.max;
        //从canvas获取像素数据
        var img = ctx.getImageData(0, 0, 300, 200);


        var imgd = img.data;
        //色彩过滤
        for (var i = startPos, len = imgd.length; i < len; i += 4) {
            if (imgd[i] < filterMin) {
                imgd[i] = filterMin;
            } else if (imgd[i] > filterMax) {
                imgd[i] = filterMax;
            }
        }
        //将修改后的像素数据重绘制至canvas
        ctx.putImageData(img, 0, 0);
        img.src = canvas.toDataURL();
    }

}

//点击函数
function takePhoto() {
    ctx.drawImage(video, 0, 0, 300, 200);
    //将原始截图保存
    origindata = ctx.getImageData(0, 0, 300, 200);
}

//保存图片
function savePhoto() {
    img.src = canvas.toDataURL();
    a.href = canvas.toDataURL();
    a.setAttribute('download', 'handsome');
}

//申请网络摄像头操作权限
function askWebcam() {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            audio: false,
            video: {
                width: 300,
                height: 200
            }
        }, function(stream) {
            //若成功
            video.srcObject = stream;
            video.onloadedmetadata = function(e) {
                video.play();
            }
        }, function(err) {
            console.log('Error occured:' + err.name);
        });
    } else {
        console.log('this navigator doesn\'t support webcam!');
    }
}

//滤色函数
function checkFilter(name, value) {
    var _min;
    var _max;
    var _antiname = {
        'rmin': 'rmax',
        'rmax': 'rmin',
        'gmin': 'gmax',
        'gmax': 'gmin',
        'bmin': 'bmax',
        'bmax': 'bmin'
    }[name]
    filter[name] = value;
    //当下限值超过上限时，将两者对调
    _min = Math.min(filter[name], filter[_antiname]);
    _max = Math.max(filter[name], filter[_antiname]);
    console.log(filter);
    return {
        min: _min,
        max: _max
    }
}