(function () {
    //侧栏高度设置
    $('#sidebar').height($(window).innerHeight() - 50);
    //内容显示区域高度设置
    $('#content').height($(window).innerHeight() - 50);
    // $('#sidebar .li1').click(() => {
    //     console.log($(this))
    //     $(this).next().height(100);
    // })
    //侧栏导航的显示和隐藏
    var li = document.getElementsByClassName('li1');
    for (var i = 0; i < li.length; i++) {
        li[i].onclick = function () {
            // console.log(getComputedStyle(this.nextElementSibling, false)['height']);
            if (getComputedStyle(this.nextElementSibling, false)['height'] == 0 + 'px') {
                // this.nextElementSibling.style.height = 'auto';
                startMove(this.nextElementSibling, { 'height': 100 });
            } else {
                // this.nextElementSibling.style.height = 0 + 'px';
                startMove(this.nextElementSibling, { 'height': 0 });
            }
        }
    }
    $('#name').html(lookCookie('managename'));//设置登录管理员名字
    $('.out').click(function () {//退出就直接去管理系统登录页面
        location.href = '01login.html';
        removeCookie('managename');
    });
    $('#sidebar li').click(function () {
        if ($(this).html() == '修改用户信息') {
            $('#content iframe').prop('src', '022changeuser_information.html');
        } else if ($(this).html() == '添加新用户') {
            $('#content iframe').prop('src', '021addnewuser.html');
        }
    });
})();