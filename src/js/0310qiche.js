var subtitle = '';
var subtitledata = ['美孚', '壳牌', '嘉实多'];
for (var i = 0; i < subtitledata.length; i++) {
    subtitle += ` <li class="tag">
                        <span class="bg lf"></span>
                        <span class="bg ri"></span>
                        <a href="###">${subtitledata[i]}</a>
                    </li>`;
}
$('.qiche .cat .sub-title').html(subtitle);
$('.brand .name').addClass('hide');//一开始的时候所有的brand name为隐藏的

$('.bl3 .brand').hover(function () {
    $('.bl3 .brand .name').eq($(this).index()).removeClass('hide').next().addClass('hide');
}, function () {
    $('.bl3 .brand .name').eq($(this).index()).addClass('hide').next().removeClass('hide');
})
$('.br3 .brand').hover(function () {
    $('.br3 .brand .name').eq($(this).index()).removeClass('hide').next().addClass('hide');
}, function () {
    $('.br3 .brand .name').eq($(this).index()).addClass('hide').next().removeClass('hide');
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
                    <img src="../images/qiche/qiche${j + 6}.jpg" class="itemImg">
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
$('.qiche .content .top-left .bottom-items').html(mengbaoitemimg + "<span class='clr'></span>");