(function () {
    $('#main_head').load('031main_head.html');//导入头部
    $('#w-footer').load('0319footer.html');//导入尾部
    let gid = decodeURI(location.search.slice(1)).split('&')[0].split('=')[1];//商品id
    let gnum = decodeURI(location.search.slice(1)).split('&')[1].split('=')[1];//商品数量
    if (gid && gnum) {
        $.ajax({
            type: 'get',
            url: '../PHP/xiangqing.php',
            data: {
                gid: gid
            },
            success: str => {
                var arr = JSON.parse(str);
                $('.p-img img').prop('src', arr.tu.split('&')[0]);
                $('#succeed .success-cont .p-name').html(arr.gtitle);
                $('#shopnum').html(gnum);
            }
        });
    }
    //点击返回键
    $('.btn-tobback').click(function () {
        history.back();
    });
    //去购物车
    $('#GotoShoppingCart').click(function () {
        location.href = '08shopcar.html';
    });

})();