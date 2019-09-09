(function () {
    var yzm;//存取验证码
    //警告内容输出.login-form .msg-error span
    $('.login-wrap').on('click', '.form .forgetpsw .zm', function () {
        if ($(this).html() == '手机登录') {//手机登录
            $('.phone').css('display', 'block');
            $('.unpsw').css('display', 'none');
        } else {//账号密码登录
            $('.phone').css('display', 'none');
            $('.unpsw').css('display', 'block');
        }
        $('.login-form .msg-error').css('display', 'none');//提示框隐藏
    }).on('click', '.zhuce a', function () { //点击注册就去注册页面
        location.href = '09userzhuce.html';
    }).on('change', '#loginname', function () {//输入用户名失去焦点时检测用户名是否存在
        $.ajax({
            type: 'get',
            url: '../PHP/userdenglu.php',
            data: {
                username: $(this).val()
            },
            success: str => {
                var arr = JSON.parse(str);
                if (arr == 2) {
                    $('.login-form .msg-error').css('display', 'block');//提示框显示
                    $('.login-form .msg-error span').html('用户不存在');
                } else {
                    $('.login-form .msg-error').css('display', 'none');//提示框隐藏
                }
            }
        });
    }).on('click', '.form .denglu #login-btn', function () {//点击登录的时候匹配用户名和密码是否正确
        $.ajax({
            type: 'post',
            url: '../PHP/userdenglu.php',
            data: {
                username: $('#loginname').val(),
                password: $('#psw').val()
            },
            success: str => {
                var arr = JSON.parse(str);
                if (arr > 2) {//登录成功,返回的是用户uid
                    setCookie('username', $('#loginname').val(), 10);//缓存用户名.10天免登录
                    if (lookCookie('baby')) {//若有浏览过宝贝，则直接返回到宝贝
                        location.href = lookCookie('baby');
                    } else {
                        location.href = '03main.html';//没有直接去首页
                    }
                } else if (arr == 1) {
                    $('.login-form .msg-error').css('display', 'block');//提示框显示
                    $('.login-form .msg-error span').html('用户名与密码不匹配');
                } else if (arr == 2) {
                    $('.login-form .msg-error').css('display', 'block');//提示框显示
                    $('.login-form .msg-error span').html('用户不存在');
                }
            }
        });
    }).on('click', '#getyzm', function () {//获取手机验证码
        $.ajax({
            type: 'post',
            url: '../PHP/phonemail.php',
            data: {
                userphone: $('#phonenumber').val()
            },
            success: str => {
                var arr = JSON.parse(str);
                $('.login-form .msg-error').css('display', 'block');//提示框显示
                $('.login-form .msg-error span').html(arr.message.reason);
                yzm = arr.phonecode;//存进全局变量里

            }
        });
    }).on('click', '#phonedl a', function () {//手机登录按钮，匹配验证码是否正确
        if ($('#psw2').val() == yzm) {//若验证码符合，登录成功
            $.ajax({
                type: 'post',
                url: '../PHP/userzhuce.php',
                data: {
                    username: $('phonenumber').val(),
                    password: $('phonenumber').val(),
                },
                success: str => {
                    setCookie('username', $('#phonenumber').val(), 10);//缓存用户名.10天免登录
                    if (lookCookie('baby')) {//若有浏览过宝贝，则直接返回到宝贝
                        location.href = lookCookie('baby');
                    } else {
                        location.href = '03main.html';//没有直接去首页
                    }
                }
            });
        } else {//不符合
            $('.login-form .msg-error').css('display', 'block');//提示框显示
            $('.login-form .msg-error span').html('验证码不符合，请重新输入');
        }
    })


})();