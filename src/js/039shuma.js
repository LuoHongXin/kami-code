var subtitle = '';
var subtitledata = ['自营数码', '任天堂', '加湿器', '耳机', '数码', '美容仪', '净化器'];
for (var i = 0; i < subtitledata.length; i++) {
    subtitle += ` <li class="tag">
                        <span class="bg lf"></span>
                        <span class="bg ri"></span>
                        <a href="###">${subtitledata[i]}</a>
                    </li>`;
}
$('.shuma .cat .sub-title').html(subtitle);
$('.brand .name').addClass('hide');//一开始的时候所有的brand name为隐藏的

$('.bl2 .brand').hover(function () {
    $('.bl2 .brand .name').eq($(this).index()).removeClass('hide').next().addClass('hide');
}, function () {
    $('.bl2 .brand .name').eq($(this).index()).addClass('hide').next().removeClass('hide');
})
$('.br2 .brand').hover(function () {
    $('.br2 .brand .name').eq($(this).index()).removeClass('hide').next().addClass('hide');
}, function () {
    $('.br2 .brand .name').eq($(this).index()).addClass('hide').next().removeClass('hide');
})

var mengbaoitemimg = '';
var mengbaoitemimg2 = '';
for (var j = 0; j < 5; j++) {
    mengbaoitemimg += ` <li class="right-bordered">
                <div class="country">
                    <div class="inlie-blk">
                        <img src="../images/country1.jpg" class="cImg">
                        <span class="name">爆款麦片</span>
                    </div>
                </div>
                <a href="###" class="item short">
                    <img src="../images/shuma/shuma${j + 6}.jpg" class="itemImg">
                    <span class="cornerImg"></span>
                    <span class="name">日本进口 Calbee(卡乐比) 富果乐 水果麦片700g/袋 早餐谷物冲饮燕麦片（新老包装随机发货）</span>
                    <span class="price">
                        <span>
                            <b>￥</b>
                            65
                        </span>
                    </span>
                    <span class="tags"></span>
                </a>
            </li> `;
}
$('.shuma .content .top-left .bottom-items').html(mengbaoitemimg + "<span class='clr'></span>");