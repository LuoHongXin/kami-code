(function () {
    //用户名的正则验证
    $('#form-account').change(function () {
        var username = $(this).val().trim();
        if (username) {//不为空
            if (reg_verify.chinese(username)) {//正则
                $.ajax({
                    type: 'get',
                    url: '../PHP/userzhuce.php',
                    data: {
                        username: username
                    },
                    success: str => {
                        var arr = JSON.parse(str);
                        if (arr.verifyUserName == 0) {//用户名通过
                            $('.input-tip .error').eq(0).css({
                                'display': 'block',
                                'color': 'blue'
                            }).html('用户名通过');
                        } else {
                            $('.input-tip .error').eq(0).css({
                                'display': 'block',
                                'color': '#f91'
                            }).html(' <i class="i-error"></i>用户名已存在');;//警告显示
                        }
                    }
                });
            } else {
                $('.input-tip .error').eq(0).css({
                    'display': 'block',
                    'color': '#f91'
                }).html(' <i class="i-error"></i>用户名必须是3到8位的数字字母中文');;//警告显示
            }
        } else {
            $('.input-tip .error').eq(0).css({
                'display': 'block',
                'color': '#f91'
            }).html(' <i class="i-error"></i>用户名不能为空');;//警告显示
        }
    });
    //密码正则
    $('#form-pwd').change(function () {
        if (reg_verify.password($(this).val())) {//6到12位密码
            $('.input-tip .error').eq(1).css({
                'display': 'block',
                'color': 'blue'
            }).html('密码通过');
        } else {
            $('.input-tip .error').eq(1).css({
                'display': 'block',
                'color': '#f91'
            }).html(' <i class="i-error"></i>密码必须为6到12位字符');;//警告显示
        }
        qrpsw();
    });
    //密码确认
    $('#form-equalTopwd').change(function () {
        qrpsw()
    });
    //点击注册
    $('#form-register').click(function () {
        $('.input-tip .error').eq(3).html('');//清空注册下的警告
        if ($('.error').find('.i-error').length == 0) {//信息验证成功
            $.ajax({
                type: 'post',
                url: '../PHP/userzhuce.php',
                data: {
                    username: $('#form-account').val(),
                    password: $('#form-equalTopwd').val()
                },
                success: str => {
                    var arr = JSON.parse(str);
                    if (arr.login == 0) {//注册成功
                        location.href = '04userdenglu.html';
                    } else if (arr.login == 1) {
                        $('.input-tip .error').eq(3).css({
                            'display': 'block',
                            'color': '#f91'
                        }).html(' <i class="i-error"></i>注册失败');;//警告显示
                    }
                }

            });
            location.href('04userdenglu.html');
        } else {//清空了注册下的警告还有警告，说明上面有信息不正确
            $('.input-tip .error').eq(3).css({
                'display': 'block',
                'color': '#f91'
            }).html(' <i class="i-error"></i>请先填好信息');;//警告显示
        }

    });
    //确认密码
    function qrpsw() {
        var password = $('#form-pwd').val().trim();
        if (password) {//密码不为空
            if ($('#form-equalTopwd').val().trim()) {//确认密码不为空
                if (password == $('#form-equalTopwd').val().trim()) {
                    $('.input-tip .error').eq(2).css({
                        'display': 'block',
                        'color': 'blue'
                    }).html('密码确认');
                } else {
                    $('.input-tip .error').eq(2).css({
                        'display': 'block',
                        'color': '#f91'
                    }).html(' <i class="i-error"></i>密码不一致');;//警告显示
                }
            }
        } else {
            $('.input-tip .error').eq(2).css({
                'display': 'block',
                'color': '#f91'
            }).html(' <i class="i-error"></i>请先设置密码');;//警告显示
        }
    }
    $('.header .have-account a ').click(function () {
        location.href = '04userdenglu.html';
    });
})();
