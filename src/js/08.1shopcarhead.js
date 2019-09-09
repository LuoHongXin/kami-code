//用户登录就显示用户名
if (lookCookie('username')) {//刷新页面就执行
    $('#dl').html(lookCookie('username') + ',退出').addClass('style-red').click(function () {
        removeCookie('username');
        $('#dl').html('你好，请登录').removeClass('style-red').click(function () {
            location.href = '04userdenglu.html';
        });;
    });;
} else {//否则可以点击让用户跳转到登录页面
    $('#dl').html('你好，请登录').click(function () {
        location.href = '04userdenglu.html';
    });;
}