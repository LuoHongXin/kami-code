var subtitle = '';
var subtitledata = ['爆款玩具直降', '乐高拼插积木玩具', '萌兔特价抢购'];
for (var i = 0; i < subtitledata.length; i++) {
    subtitle += ` <li class="tag">
                        <span class="bg lf"></span>
                        <span class="bg ri"></span>
                        <a href="###">${subtitledata[i]}</a>
                    </li>`;
}
$('.wanju .cat .sub-title').html(subtitle);
var mengbaoitemimg = '';
for (var j = 0; j < 5; j++) {
    mengbaoitemimg += ` <li class="right-bordered">
                <a href="###" class="item short">
                    <img src="../images/wanju/wanju${j + 8}.jpg" class="itemImg">
                    <span class="cornerImg"></span>
                    <span class="name">碧然德（BRITA）滤水壶Aluna光汐系列3.5L蓝色 1壶1芯 家用办公过滤净水器 自来水过滤器 净水壶滤芯套装</span>
                    <span class="price">
                        <span>
                            <b>￥</b>
                            165
                        </span>
                    </span>
                    <span class="tags"></span>
                </a>
            </li> `;
}
$('.wanju .content .top-left .bottom-items').html(mengbaoitemimg + "<span class='clr'></span>");

$('.tabs ul li').click(function () {
    $(this).addClass('curr').siblings().removeClass('curr');
    $('.wanju .top-right .tab-contents').eq($(this).index()).removeClass('hide').siblings().addClass('hide');
})
var brandname = ['宝格丽', '施华洛世奇', '万宝龙', 'LEE', 'Burberry', 'coach', 'Gucci', 'furla'];
var brand = '';
for (var q = 0; q < brandname.length; q++) {
    brand += `<a href="###" class="brand">
                    <div class="name">${brandname[q]}</div>
                    <img src="../images/fushi/brand${q + 1}.jpg" alt="">
                </a>`;
}
$('.wanju .content .brands').html(brand);
$('.wanju .content .brands a .name').addClass('hide');
$('.wanju .content .brands a').hover(function () {
    $('.wanju .content .brands a .name').eq($(this).index()).removeClass('hide');
    $('.wanju .content .brands a img').eq($(this).index()).addClass('hide');
}, function () {
    $('.wanju .content .brands a .name').eq($(this).index()).addClass('hide');
    $('.wanju .content .brands a img').eq($(this).index()).removeClass('hide');
});