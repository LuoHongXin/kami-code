(function () {
    $('.denglu').click(function () {//点击登录
        $.ajax({
            type: 'post',
            url: '../PHP/managedenglu.php',
            data: {
                mname: $('.login_form input').eq(0).val(),
                mpassword: $('.login_form input').eq(1).val(),
            },
            success: str => {
                var arr = JSON.parse(str);
                if (arr == '登录成功') {
                    setCookie('managename', $('.login_form input').eq(0).val());
                    location.href = '02houtai.html';
                } else {
                    alert(arr);
                }
            }
        });
    });
})();