var subtitle = '';
var subtitledata = ['钙铁锌', '奶粉', '博朗耳温计', '哈罗闪', '产后收腹带'];
for (var i = 0; i < 5; i++) {
    subtitle += ` <li class="tag">
                        <span class="bg lf"></span>
                        <span class="bg ri"></span>
                        <a href="###">${subtitledata[i]}</a>
                    </li>`;
}
$('.mengbao .cat .sub-title').html(subtitle);
$('.brand .name').addClass('hide');//一开始的时候所有的brand name为隐藏的

$('.bottom-left-tall .brand').hover(function () {
    $('.bottom-left-tall .brand .name').eq($(this).index()).removeClass('hide').next().addClass('hide');
}, function () {
    $('.bottom-left-tall .brand .name').eq($(this).index()).addClass('hide').next().removeClass('hide');
})
$('.bottom-middle-tall .brand').hover(function () {
    $('.bottom-middle-tall .brand .name').eq($(this).index()).removeClass('hide').next().addClass('hide');
}, function () {
    $('.bottom-middle-tall .brand .name').eq($(this).index()).addClass('hide').next().removeClass('hide');
})
$('.bottom-right-tall .brand').hover(function () {
    $('.bottom-right-tall .brand .name').eq($(this).index()).removeClass('hide').next().addClass('hide');
}, function () {
    $('.bottom-right-tall .brand .name').eq($(this).index()).addClass('hide').next().removeClass('hide');
})

var mengbaoitemimg = '';
var mengbaoitemimg2 = '';
for (var j = 0; j < 6; j++) {
    mengbaoitemimg += `   <li>
                        <a href="###" class="item shorter">
                            <img src="../images/mengbao/itemimg${j + 1}.jpg" alt="" class="itemImg">
                            <span class="name">澳洲爱他美白金版奶粉9 3段</span>
                            <span class="price">
                                <span>
                                    <b>￥</b>
                                    199
                                </span>
                            </span>
                        </a>
                    </li>`;
}
for (var k = 0; k < 4; k++) {
    mengbaoitemimg2 += ` <li>
                        <a href="###" class="item shorter">
                            <img src="../images/mengbao/itemimg${k + 1}.jpg" alt="" class="itemImg">
                            <span class="name">澳洲爱他美白金版奶粉9 3段</span>
                            <span class="price">
                                <span>
                                    <b>￥</b>
                                    199
                                </span>
                            </span>
                        </a>
                    </li>`;
}
$('.mengbao div.bottom-left-tall .items').html(mengbaoitemimg);
$('.mengbao div.bottom-middle-tall .items').html(mengbaoitemimg2);