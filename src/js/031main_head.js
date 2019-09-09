//数据准备
var categorydata = ['奶粉', '尿裤', '护肤', '减肥', '数码', '钟表', '服饰', '运动', '汽车', '游戏机', '户外', '香水'];
//渲染sub_menu
var sub_itemall = '';//存放sub_itemall内容


for (var i = 0; i < categorydata.length; i++) {
    sub_itemall += ` <div class="dd_item ">
                                  <h3><i class="iconfont"></i><a href="###">${categorydata[i]}</a><b class="iconfont"></b></h3>
                                  <h4><a href="###">${categorydata[i]}</a></h4>
                                  <h4><a href="###">${categorydata[i]}</a></h4>
                              </div>`;

}
$('#dd_item_all').html(sub_itemall);


//滑到哪个哪个亮
$('#category .dd_item').mousemove(function () {

    var sub_list = '';//存放sub_list内容
    var sub_brand = '';//存放sub_brand内容
    var idex = $(this).index() % 2;
    $(this).addClass('hover').siblings().removeClass('hover');
    for (var j = 0; j < 4; j++) {
        sub_list += ` <dl class="slblock">
                                      <dt class="dttitle"><a href="###">${categorydata[$(this).index()]}</a></dt>
                                      <dd class="dditem"><a href="###">${categorydata[$(this).index()]}</a></dd>
                                      <dd class="dditem"><a href="###">${categorydata[$(this).index()]}</a></dd>
                                      <dd class="dditem lastdditem"><a href="###">${categorydata[$(this).index()]}</a></dd>
                                  </dl>
                                  <div class="split"></div>`;
        sub_brand += ` <li><img src="../images/naifen${++idex}.jpg" alt=""></li>`;
    };
    $('#category .sub_list').html(sub_list);
    $('#category .sub_brand').html(sub_brand);
    //给三级栏的a标签添加点击事件，若是数码，则跳到列表页

    $('#category .last_sub_brand_img').prop('src', `../images/lastsubbrandimg${$(this).index() % 3 + 1}.jpg`)
})
//划出清空
$('#category .dd_item').mouseout(function () {
    $(this).removeClass('hover');
})
$('.dd_inner').mousemove(function () {
    $('#category .dd .dd_inner .sub_menu ').css('display', 'block');
})
$('.dd_inner').mouseout(function () {
    $('#category .dd .dd_inner .sub_menu ').css('display', 'none');
})
//用户登录就显示用户名
if (lookCookie('username')) {//刷新页面就执行
    $('#shortcut ul a:first').html(lookCookie('username') + ',退出');
    $('#shortcut ul a:first').addClass('style-red');
    $('#shortcut ul a:first').click(function () {//点击退出
        $('#shortcut ul a:first').html('你好，请登录');
        removeCookie('username');//清除用户名缓存
        $('#shortcut ul a:first').removeClass('style-red');
        $('#shortcut ul a:first').click(function () {
            location.href = '04userdenglu.html';
        });
    });
} else {//否则可以点击让用户跳转到登录页面
    $('#shortcut ul a:first').html('你好，请登录');
    $('#shortcut ul a:first').click(function () {
        location.href = '04userdenglu.html';
    });
}

$('a').click(function () {//点击数码就跳到列表页
    if ($(this).html() == '数码') {
        window.open('05liebiao.html');
    }
});
$('#my_goods_car a').click(function () {//点击购物车就打开购物车页面
    window.open('08shopcar.html');
});