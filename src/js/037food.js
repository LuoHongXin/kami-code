var subtitle = '';
var subtitledata = ['德运', '巴黎水', '龙角散', '食品会场', '宠物会场'];
for (var i = 0; i < subtitledata.length; i++) {
    subtitle += ` <li class="tag">
                        <span class="bg lf"></span>
                        <span class="bg ri"></span>
                        <a href="###">${subtitledata[i]}</a>
                    </li>`;
}
$('.food .cat .sub-title').html(subtitle);
$('.brand .name').addClass('hide');//一开始的时候所有的brand name为隐藏的

$('.bl .brand').hover(function () {
    $('.bl .brand .name').eq($(this).index()).removeClass('hide').next().addClass('hide');
}, function () {
    $('.bl .brand .name').eq($(this).index()).addClass('hide').next().removeClass('hide');
})
$('.br .brand').hover(function () {
    $('.br .brand .name').eq($(this).index()).removeClass('hide').next().addClass('hide');
}, function () {
    $('.br .brand .name').eq($(this).index()).addClass('hide').next().removeClass('hide');
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
                    <img src="../images/food/imgitem${j + 1}.jpg" class="itemImg">
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
for (var k = 0; k < 3; k++) {
    mengbaoitemimg2 += ` <li>
                        <a href="###" class="item shorter">
                            <img src="../images/mengbao/itemimg${k + 1}.jpg" alt="" class="itemImg">
                            <span class="name">美国进口 Elta MD 氨基酸洁面乳 207ml/瓶 弱酸性卸妆清洁洗面奶 敏感肌可用</span>
                            <span class="price">
                                <span>
                                    <b>￥</b>
                                    199
                                </span>
                            </span>
                        </a>
                    </li>`;
}
$('.floor-share1 .content .top-left .bottom-items').html(mengbaoitemimg + "<span class='clr'></span>");
$('.meizhuang div.bottom-middle .items').html(mengbaoitemimg2);
$('.tabs ul li').click(function () {
    $(this).addClass('curr').siblings().removeClass('curr');
    $('.top-right .tab-contents').eq($(this).index() + 1).removeClass('hide').siblings().addClass('hide');
})