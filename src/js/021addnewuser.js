//信息正则验证
$('.form_input input').change(function () {
    if ($(this).attr('id') == 'username') {
        var ok = reg_verify.chinese($(this).val());
        if (!ok) { $(this).next().html('用户名必须为3-8位的数字字母中文'); yanz(ok, $(this)); };
        if (ok) {
            $.ajax({
                type: 'post',
                url: '../PHP/addnewuser.php',
                data: {
                    username: $(this).val()
                },
                success: str => {
                    var arr = JSON.parse(str);
                    console.log(arr);
                    if (arr.verifyUserName == 1) {
                        $(this).next().html('用户名已存在')
                        $(this).next().css('color', 'red');
                    } else if (arr.verifyUserName == 0) {
                        yanz(true, $(this));
                    }
                }
            });
        }
    } else if ($(this).attr('id') == 'phonenum') {
        var ok = reg_verify.phone($(this).val());
        yanz(ok, $(this));
        if (!ok) { $(this).next().html('请输入正确的手机号码') };

    } else if ($(this).attr('id') == 'psw') {
        var ok = reg_verify.password($(this).val());
        yanz(ok, $(this));
        if (!ok) { $(this).next().html('密码是6-12位密码') };
    }
})
function yanz(ok, p) {
    if (ok) {
        p.next().html('验证通过');
        p.next().css('color', '#58bc58');
    } else {
        p.next().css('color', 'red');
    }
}
$('.body_content_foot p').click(function () {

    var istrue = true;
    $('.form_input input').each(function (index, item) {
        if ($(item).next().html() != '验证通过') {
            istrue = false;
        }
    })
    if (istrue) {
        $.ajax({
            type: 'post',
            url: '../PHP/addnewuser.php',
            data: {
                username: $('#username').val(),
                password: $('#psw').val(),
                phonenum: $('#phonenum').val()
            },
            success: str => {
                var arr = JSON.parse(str);
                if (arr.login == 0) {
                    $(this).next().html('添加成功');
                    $(this).next().css('color', '#58bc58');
                } else if (arr.login == 1) {
                    $(this).next().html('添加失败');
                    $(this).next().css('color', 'red');
                }
            }
        });
    }
})