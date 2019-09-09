var subtitle = '';
var baobao = '';
var subtitledata = ['潮流女包', '热销吊坠'];
for (var i = 0; i < subtitledata.length; i++) {
    subtitle += ` <li class="tag">
                        <span class="bg lf"></span>
                        <span class="bg ri"></span>
                        <a href="###">${subtitledata[i]}</a>
                    </li>`;
}
$('.fushi .cat .sub-title').html(subtitle);
var tabcontent = '';
for (var i = 0; i < 15; i = i + 5) {
    tabcontent += `<div class="tab-contents hide">
                    <div class="left">
                        <a href="###" class="item cls1">
                            <span class="triangle-container">
                                <span class="triangle-dowm"></span>
                            </span>
                            <span class="name">Calvin Klein 内衣T恤 CK男士棉质圆领短袖T恤打底衫 Black L</span>
                            <span class="price">
                                <span>
                                    <b>￥</b>
                                    278
                                </span>
                            </span>
                            <img src="../images/fushi/fushi${i + 4}.jpg" class="itemImg">
                        </a>
                        <a href="###" class="item cls2">
                            <div class="name">Comme des Garcons Play 日本潮牌 短袖经典款红心T恤男女情侣款 T108 白色 M</div>
                            <div class="price"></div>
                            <span class="triangle-container">
                                <span class="triangle-dowm"></span>
                            </span>
                            <img src="../images/fushi/fushi${i + 5}.jpg" class="itemImg">
                        </a>
                    </div>
                    <div class="left">
                        <a href="###" class="item cls3"> <img src="../images/fushi/fushi${i + 6}.jpg"
                                class="itemImg">
                            <span class="triangle-container">
                                <span class="triangle-up"></span>
                            </span>
                            <span class="name">全球购阿玛尼ARMANI男装短袖T恤圆领上衣男士打底衫2件装 黑色+白色 175/95 L</span>
                            <span class="price">
                                <span>
                                    <b>￥</b>
                                    389
                                </span>
                            </span></a>
                        <a href="###" class="item cls4">
                            <img src="../images/fushi/fushi${i + 7}.jpg" class="itemImg">
                            <span class="triangle-container">
                                <span class="triangle-up"></span>
                            </span>
                            <span class="name">Champion短袖T恤 正品美版 草写经典字母印花 刺绣 纯棉圆领情侣打底衫 薄款 白色（新款黑字）
                                L（体重158-178）</span>
                            <span class="price">
                                <span>
                                    <b>￥</b>
                                    287
                                </span>
                            </span>
                        </a>
                    </div>
                    <span class="clr"></span>
                    <img src="../images/fushi/fushi${i + 3}.jpg" class="bg">
                </div> `;
}
$('.fushi .middle .tabs').html($('.fushi .tabs').html() + tabcontent);
$('.fushi .middle .tabs .tab-contents:first').removeClass('hide');
$('.fushi .tab').click(function () {
    $(this).addClass('curr').siblings().removeClass('curr');
    $('.fushi .middle .tabs .tab-contents').addClass('hide');
    $('.fushi .middle .tabs .tab-contents').eq($(this).index()).removeClass('hide');
})
for (var p = 0; p < 5; p++) {
    baobao += `<a href="###" class="item">
                <img src="../images/fushi/baobao${p + 1}.png" class="itemImg">
                <div class="name">Louis Vuitton/路易威登LV男女同款手拿包经典帆布老花钱包lv梳洗包 M47542</div>
                <div class="price">
                    <span>
                        <b>￥</b>
                        ${(p + 1) * 3500}
                    </span>
                </div>
            </a>`;
}
$('.fushi .top-right .tab-contents').html(baobao);
var brandname = ['宝格丽', '施华洛世奇', '万宝龙', 'LEE', 'Burberry', 'coach', 'Gucci', 'furla'];
var brand = '';
for (var q = 0; q < brandname.length; q++) {
    brand += `<a href="###" class="brand">
                    <div class="name">${brandname[q]}</div>
                    <img src="../images/fushi/brand${q + 1}.jpg" alt="">
                </a>`;
}
$('.fushi .content .brands').html(brand);
$('.fushi .content .brands a .name').addClass('hide');
$('.fushi .content .brands a').hover(function () {
    $('.fushi .content .brands a .name').eq($(this).index()).removeClass('hide');
    $('.fushi .content .brands a img').eq($(this).index()).addClass('hide');
}, function () {
    $('.fushi .content .brands a .name').eq($(this).index()).addClass('hide');
    $('.fushi .content .brands a img').eq($(this).index()).removeClass('hide');
});