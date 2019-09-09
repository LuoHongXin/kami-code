var tWrapperdata = ['全球购自营', '自营奶粉尿裤', '自营个护美妆', '自营食品营养', '自营服饰箱包', '自营数码电器'];
var html = '';
var html2 = '';
var toptwo = '';
var toptwo2 = '';
for (var i = 0; i < 6; i++) {
    html += `<li> <a href="###">
            <img src="../images/head_main/itemBg3.jpg" alt="" class="itemImg">
            <span class="topNum">3</span>
            <span class="name">飞利浦（PHILIPS）S7370/12 电动剃须刀 5向三刀头干湿两用</span>
            <span class="price">
                <span>
                    <b>￥</b>
                    715
                </span>
            </span>
            <span class="comment">
                <span class="cNum">
                    <b class="comment_num">9300+</b> 条评价
                </span>
            </span>
        </a>
    </li>`;
    html2 += `<li>
                <span class="tWrapper">
                    <span class="txt">${tWrapperdata[i]}</span>
                    <i></i>
                    <span class="arror-up"></span>
                </span>
            </li>`
}
$('.zhicai .otherItem ul').html(html);
$('.zhicai .tab ul').html(html2);
//zhicai添加点击换栏
$('.zhicai .tab ul li').eq(0).addClass('curr');
for (var j = 0; j < 2; j++) {
    toptwo += `<a href="javascript:;" class="item">
                            <img src="../images/head_main/itemBg${j + 1}.jpg" alt="" class="itemBg">
                            <span class="details">
                                <span class="area">
                                    <img src="../images/head_main/Englandflag.jpg" alt="" class="flag">
                                    <span class="brandName">a2</span>
                                    <span class="split"></span>
                                </span>
                                <span class="itemName">澳洲a2 Platinum 白金版婴幼儿奶粉3段900g（1-3岁）新西兰原装进口</span>
                                <span class="comment">
                                    <span class="commstar">
                                        <span class="star star5 active"></span>
                                    </span>
                                    <span class="cNum"></span>
                                    <span class="cNum">
                                        <b class="comment_num">45万+</b> 条评价
                                    </span>
                                </span>
                                <span class="tips">为了获取珍贵的a2蛋白质，每一头奶牛，都刚经过DNA的检测，造就了奶粉中的黄金贵族~</span>
                                <span class="price">
                                    <span><b>￥</b>210</span>
                                    <del>¥288</del>
                                </span>
                            </span>
                        </a>`
}
for (var j = 0; j < 2; j++) {
    toptwo2 += `<a href="javascript:;" class="item">
                            <img src="../images/head_main/itemBg${j + 4}.jpg" alt="" class="itemBg">
                            <span class="details">
                                <span class="area">
                                    <img src="../images/head_main/Englandflag.jpg" alt="" class="flag">
                                    <span class="brandName">a2</span>
                                    <span class="split"></span>
                                </span>
                                <span class="itemName">澳洲a2 Platinum 白金版婴幼儿奶粉3段900g（1-3岁）新西兰原装进口</span>
                                <span class="comment">
                                    <span class="commstar">
                                        <span class="star star5 active"></span>
                                    </span>
                                    <span class="cNum"></span>
                                    <span class="cNum">
                                        <b class="comment_num">45万+</b> 条评价
                                    </span>
                                </span>
                                <span class="tips">为了获取珍贵的a2蛋白质，每一头奶牛，都刚经过DNA的检测，造就了奶粉中的黄金贵族~</span>
                                <span class="price">
                                    <span><b>￥</b>210</span>
                                    <del>¥288</del>
                                </span>
                            </span>
                        </a>`
}
for (var k = 0; k < 6; k++) {
    if (k % 2 == 0) {
        $('.zhicai .tab-ctn .topTwo').eq(k).html(toptwo);
    } else {
        $('.zhicai .tab-ctn .topTwo').eq(k).html(toptwo2);
    }

}
$('.zhicai .tab ul li').click(function () {
    $(this).addClass('curr').siblings().removeClass('curr');
    $('.zhicai .tab-ctn').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');
})