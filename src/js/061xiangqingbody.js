; (function () {
    let gid = decodeURI(location.search.slice(1));
    setCookie('baby', '06xiangqing.html?' + gid);
    $.ajax({//渲染数据
        type: 'get',
        url: '../PHP/xiangqing.php',
        data: {
            gid: gid
        },
        success: str => {
            var arr = JSON.parse(str);
            var tu = arr.tu.split('&');
            var litu = tu.map(function (item) {
                return ` <li>
                            <img src="${item}">
                        </li>`;
            }).join('');
            $('#litu').html(litu);
            $('.preview .main-img img').prop('src', tu[0]);
            $('.preview .bigimg').prop('src', tu[0]);
            $('.itemInfo-wrap .sku-name').html(arr.gtitle);
            $('.itemInfo-wrap .news').html(arr.othername);
            $('.itemInfo-wrap .summary-price-wrap .summary-price .p-price .price').html(arr.price);
            gongneng();//渲染后再启动所有功能
        }
    });
    function gongneng() {
        $('#spec-n1').mousemove(function (ev) {
            $('.preview .zoomdiv').css('display', 'block');
            $('.preview .jqZoomPup').css('display', 'block');
            var pic = $('.preview .main-img img').offset();
            // 鼠标在mian里滑动，mask不断计算left和top的值跟着移动，
            var left = ev.pageX - pic.left - $('.preview .jqZoomPup').innerWidth() / 2;
            var top = ev.pageY - pic.top - $('.preview .jqZoomPup').innerHeight() / 2;
            if (left <= 0) {
                left = 0;
            } else if (left > $('.preview .main-img img').innerWidth() - $('.preview .jqZoomPup').innerWidth()) {
                left = $('.preview .main-img img').innerWidth() - $('.preview .jqZoomPup').innerWidth();
            }
            if (top <= 0) {
                top = 0;
            } else if (top > $('.preview .main-img img').innerHeight() - $('.preview .jqZoomPup').innerHeight()) {
                top = $('.preview .main-img img').innerHeight() - $('.preview .jqZoomPup').innerHeight();
            }
            $('.preview .jqZoomPup').css('left', left);
            $('.preview .jqZoomPup').css('top', top);
            var scale = ($('.preview .bigimg').innerWidth() - $('.preview .zoomdiv').innerWidth()) / ($('.preview .main-img img').innerWidth() - $('.preview .jqZoomPup').innerHeight());
            //magnipic里的大图也要相应跟着移动
            $('.preview .bigimg').css('left', scale * -left);
            $('.preview .bigimg').css('top', scale * -top);
        });
        //鼠标划出时，隐藏mask和magnipic
        $('#spec-n1').mouseout(function () {
            $('.preview .zoomdiv').css('display', 'none');
            $('.preview .jqZoomPup').css('display', 'none');
        });

        //点击小图能切换main里的图, main里的图和magnipic里的大图保持一致
        $('.preview .spec-items ul li img').click(function () {
            $('.preview .main-img img').attr('src', $(this).attr('src'));
            $('.preview .bigimg').attr('src', $(this).attr('src'));
            $(this).parent().addClass('img-hover').siblings().removeClass('img-hover');
        });
        //点击左右箭头,能移动图列表
        function ullistmove(iw) {
            var listleft = parseInt($('.lh').css('left'));
            listleft += iw;
            $('#spec-backward').removeClass('disabled');
            $('#spec-forward').removeClass('disabled');
            if (listleft <= $('#spec-list').innerWidth() - $('.lh').innerWidth()) {//右移到头
                listleft = $('#spec-list').innerWidth() - $('.lh').innerWidth();
                $('#spec-backward').addClass('disabled');
            } else if (listleft > 0) {//左移到头
                listleft = 0;
                $('#spec-forward').addClass('disabled');
            }
            $('.lh').animate({ left: listleft }, 200);//移动
        }
        var liswidth = $('.preview .spec-items ul li').length * $('.preview .spec-items ul li').eq(0).outerWidth(true);
        $('.lh').css('width', liswidth + 'px');//根据小图个数决定ul的宽度
        var iw = $('.preview .spec-items ul li').eq(0).outerWidth(true);
        $('#spec-forward').click(function () {
            ullistmove(iw);
        });
        $('#spec-backward').click(function () {
            ullistmove(-iw);
        });
        //点加增加购买数量，最低为1，最高为200，不能为数字以外的字符串
        $('.btn-add').click(function () {//增加购买数量
            var buynum = $('#buy-num').val();
            buynum++;
            buynum = testbuynum(buynum);
            $('#buy-num').val(buynum);
        });

        $('.btn-reduce').click(function () {//减少购买数量
            var buynum = $('#buy-num').val();
            buynum--;
            buynum = testbuynum(buynum);
            $('#buy-num').val(buynum);
        });
        function testbuynum(n) {//控制buynum最低为1，最高不过200
            $('.choose-btns .choose-amount a').removeClass('disabled');//清除disabled
            if (n <= 1) {
                n = 1;
                $('.btn-reduce').addClass('disabled');
            } else if (n >= 200) {
                n = 200;
                $('.btn-add').addClass('disabled');
            }
            return n;
        }
        //键盘输入时也要控制购买数量范围
        $('#buy-num').keyup(function () {
            var buynum = $('#buy-num').val();
            buynum = testbuynum(buynum);
            $('#buy-num').val(buynum);
        });
        //点击加入购物车，没登录就缓存商品的gid和数量
        $('#InitCartUrl,#InitCartUrl-mini').click(function () {
            if (lookCookie('username')) {//有登陆，就存到数据库的购物车里
                $.ajax({
                    type: 'post',
                    url: '../PHP/addshopcar.php',
                    data: {
                        gid: gid,
                        username: lookCookie('username'),
                        gnum: $('#buy-num').val()
                    },
                    sunccess: str => {
                        console.log(str);
                    }
                });
            } else {//没有登录,就存gid和gnum到缓存中
                setCookie('gid' + gid, $('#buy-num').val());//设置gid缓存，例：gid1：gid为1的购买数量
            }
            location.href = '07shopcarready.html?gid=' + gid + '&gunm=' + $('#buy-num').val();//带参跳转到购物车准备页面
        });
    }


})();