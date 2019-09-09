//轮播图的功能
var inum = 0;
var timer;
var colordata = ['#ffd7da', '#a60100', '#e5cbbe', '#6e9dd3'];//背景颜色数据
lunboshow(inum);
$('#head_wrapper .items li').eq(inum).css('display', 'list-item')
function lunbotimer() {//定时器自动轮播
    timer = setInterval(function () {
        inum++;
        if (inum > $('#head_wrapper .items li').length - 1) {
            inum = 0;
        }
        lunboshow(inum);
    }, 3000);
}
lunbotimer();
//划入轮播图出现左右按钮，划出消失
var ulwp = document.querySelectorAll('#slide_one .ulwp')[0];
ulwp.onmousemove = (ev) => {
    if (ev.target) {
        $('#slide_one .ulwp .left-btn').css('display', 'block');
        $('#slide_one .ulwp .right-btn').css('display', 'block');
    }
}
ulwp.onmouseout = (ev) => {
    if (ev.target) {
        $('#slide_one .ulwp .left-btn').css('display', 'none');
        $('#slide_one .ulwp .right-btn').css('display', 'none');
    }
}
//轮播图的点击事件
var slide_one = document.getElementById('slide_one');
slide_one.onclick = function (ev) {//左右按钮点击
    if (ev.target.className == 'left-btn') {
        clearInterval(timer);//关闭定时器
        inum--;
        if (inum < 0) {
            inum = $('#head_wrapper .items li').length - 1;
        }
        lunboshow(inum);
        lunbotimer();
    }
    if (ev.target.className == 'right-btn') {
        clearInterval(timer);//关闭定时器
        inum++;
        if (inum > $('#head_wrapper .items li').length - 1) {
            inum = 0;
        }
        lunboshow(inum);
        lunbotimer();
    }

}
$('#head_wrapper .tips a').click(function () {//光亮按钮的点击事件
    clearInterval(timer);//关闭定时器
    inum = $(this).index();
    lunboshow(inum);
    lunbotimer();//开启定时器
})

function lunboshow(n) {
    $('#head_wrapper .items li').eq(n).css('display', 'list-item').siblings().css('display', 'none');
    $(' #head_wrapper .ulwp .tips a ').eq(n).addClass('active').siblings().removeClass('active');
    $('.cj_focus').css('background-color', colordata[n]);
    $('#slide_one').css('background-color', colordata[n]);
}
//轮播图旁服务那一块的切换功能
$('#head_wrapper .control a').mouseenter(function () {
    $(this).addClass('curr').siblings().removeClass('curr');
    $('#head_wrapper .service ul').stop().animate({
        marginLeft: -242 * $(this).index() + 'px'
    }, 1000)
})