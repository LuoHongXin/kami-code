var links = '';
var linkstitle = ['母婴优选', '美妆个护', '全球美食', '营养保健', '时尚轻奢', '家居厨具', '汽车用品'];
for (var t = 0; t < 7; t++) {
    links += `<a href="###" class="img">
                <img src="../images/links/links${t + 1}.png">
                <span class="txt">${linkstitle[t]}</span>
                <span class="line"></span>
            </a>`;
}
$('.links .container').html(links);