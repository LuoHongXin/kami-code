var mingdianrcntul = ''//mingdianrcnt内容
for (var i = 0; i < 6; i++) {
    mingdianrcntul += `<li>
                        <a href="###" class="detail">
                            <span class="brandLogo">
                                <img src="../images/mingdian/mingdian1.jpg" alt="">
                            </span>
                            <span class="txt">泰国7-11合作伙伴</span>
                            <span class="tips">
                                品牌官方授权
                                <i></i>
                            </span>
                        </a>
                        <span class="items">
                            <span class="wp">
                                <a href="###" class="aItem">
                                    <img src="../images/mingdian/mingdianaItem1.jpg" alt="" class="itemImg">
                                    <span class="line"></span>
                                    <span class="price">
                                        <span>
                                            <b>￥</b>
                                            59
                                        </span>
                                    </span>
                                </a>
                                <a href="###" class="aItem">
                                    <img src="../images/mingdian/mingdianaItem2.jpg" alt="" class="itemImg">
                                    <span class="line"></span>
                                    <span class="price">
                                        <span>
                                            <b>￥</b>
                                            59
                                        </span>
                                    </span>
                                </a>
                                <span class="clr"></span>
                            </span>
                        </span>
                    </li>`;
}
$('.mingdian .r-cnt ul').html(mingdianrcntul + '  <span class="clr"></span>');//渲染
$('.mingdian .r-cnt ul li').eq(1).addClass('style1');
$('.mingdian .r-cnt ul li').eq(2).addClass('style1');
$('.mingdian .r-cnt ul li').eq(5).addClass('style1');