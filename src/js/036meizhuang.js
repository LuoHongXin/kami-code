var subtitle = '';
var subtitledata = ['自营专区', '护肤', '洗护清洁', '香水'];
for (var i = 0; i < subtitledata.length; i++) {
    subtitle += ` <li class="tag">
                        <span class="bg lf"></span>
                        <span class="bg ri"></span>
                        <a href="###">${subtitledata[i]}</a>
                    </li>`;
}
$('.meizhuang .cat .sub-title').html(subtitle);
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
for (var j = 0; j < 3; j++) {
    mengbaoitemimg += `   <li>
                        <a href="###" class="item shorter">
                            <img src="../images/mengbao/itemimg${j + 1}.jpg" alt="" class="itemImg">
                            <span class="name">Rogaine落健 男性浓密防脱发育发增发水生发液生发溶液 3瓶装 三个月量 60ml/瓶 美国进口 米诺</span>
                            <span class="price">
                                <span>
                                    <b>￥</b>
                                    499
                                </span>
                            </span>
                        </a>
                    </li>`;
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
$('.meizhuang div.bottom-left .items').html(mengbaoitemimg + "<span class='clr'></span>");
$('.meizhuang div.bottom-middle .items').html(mengbaoitemimg2);