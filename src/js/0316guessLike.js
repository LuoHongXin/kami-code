var guesslike = '';
for (var t = 0; t < 9; t++) {
    guesslike += `<li>
                    <a href="###">
                        <img src="../images/guesslike/guesslike${t + 1}.jpg" class="itemImg">
                        <span class="name">韩国直邮HERA赫妍拉气垫BB霜粉底隔离遮瑕BB保湿气垫黑珍珠黑金 新款C21+替换装自然白</span>
                        <span class="price">
                            <b>￥</b>
                            ${t + 180}
                        </span>
                    </a>
                </li>`;
}
$('.guessLike .hScroll').html(guesslike);
var num = 0;
var max = $('.guessLike .like li').length - 6;
let hScroll = $('.guessLike .hScroll');
let x = $('.guessLike .like #scrollbar').innerWidth() / max - $('.guessLike .like .scrollbar .handle').eq(0).innerWidth() / max;
$('.guessLike #next').click(function () {
    num++;
    if (num > max) {
        num = max;
    }
    $('.guessLike .like .scrollbar .handle').eq(0).css('transform', `translateX(${x * num}px)`);
    $('.guessLike .hScroll').css('transform', `translateX(${$('.guessLike .like li').eq(0).outerWidth(true) * -num}px)`);
})
$('.guessLike #prev').click(function () {
    num--;
    if (num < 0) {
        num = 0;
    }
    $('.guessLike .like .scrollbar .handle').eq(0).css('transform', `translateX(${x * num}px)`);
    $('.guessLike .hScroll').css('transform', `translateX(${$('.guessLike .like li').eq(0).outerWidth(true) * -num}px)`);
})