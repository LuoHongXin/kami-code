var guarantee = '';
for (var i = 0; i < 5; i++) {
    guarantee += `<a href="###" class="pic_container">
                    <img src="../images/links/mainimg${i + 1}.jpg" class="main_img">
                    <img src="../images/links/dec.png" class="dec">
                    <span class="info">京东海囤全球与Attent战略合作</span>
                </a>`;
}
$('.guarantee .imgs .container').html(guarantee);
var gotop = `<a href="###" class="cart">
            <i></i>
        </a>`;
var gotopdata = ['全球特卖', '全球直采', '全球名店', '家有萌宝', '美妆个护', '吃遍全球', '营养保健', '3C数码', '汽车用品', '服饰鞋帽', '居家生活', '运动户外', '钟表奢品', '玩具乐器'];
var gotopid = ['temai', 'zhicai', 'mingdian', 'mengbao', 'meizhuang', 'food', 'baojian', 'shuma', 'qiche', 'fushi', 'jujia', 'yundong', 'zhongbiao', 'wanju'];
for (var j = 0; j < gotopdata.length; j++) {
    gotop += `<a href="###" index='${gotopid[j]}'>${gotopdata[j]}</a>`;
}
gotop += `<a href="###" class="j-go-top">
            <i></i>
        </a>`;
$('#go-top').html(gotop);//渲染
$('#go-top a').click(function () {
    $('html,body').stop();
    if ($(this).attr('index')) {
        $('html,body').animate({
            scrollTop: $(`#${$(this).attr('index')}`).offset().top + 'px'
        }, 800)
        // window.scrollTo(0, $(`#${$(this).attr('index')}`).offset().top);
    }
    if ($(this).hasClass('j-go-top')) {
        $('html,body').animate({
            scrollTop: 0 + 'px'
        }, 800)
    }
})
// $('#go-top .j-go-top').click(function () {
//     window.scrollTo(0, 0);
// })
// $("#ctop").click(function () {
//     $("html,body").animate({ scrollTop: '0px' }, 300)
// })