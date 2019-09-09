(function () {
    removeCookie('baby');
    $('#main_head').load('031main_head.html');//导入头部
    $('#w-footer').load('0319footer.html');//导入尾部
    $('.price-chose').hover(function () {//价区间的划入划出
        $('.price-chose').addClass('price-chose-focus');
    }, function () {
        $('.price-chose').removeClass('price-chose-focus');
    })
    //判断评论数、价格升降序、价格区间、内容搜索是否使用
    function cookies() {
        var cookie = {
            tex: lookCookie('searchtxt') ? lookCookie('searchtxt') : '',
            lp: lookCookie('lp') ? lookCookie('lp') : '',
            hp: lookCookie('hp') ? lookCookie('hp') : '',
            order: lookCookie('order') ? lookCookie('order') : '',
            judge: lookCookie('judge') ? lookCookie('judge') : ''
        }
        return cookie;
    }
    function clearcookies() {
        removeCookie('searchtxt');
        removeCookie('lp');
        removeCookie('hp');
        removeCookie('order');
        removeCookie('judge');
    }
    //绑定节点
    var mypages = document.getElementById('ipages');
    $.ajax({//商品信息的ajax调用
        type: 'get',
        url: '../PHP/goodsdata.php',
        success: str => {
            var arr = JSON.parse(str);
            clearcookies();//清除所有缓存
            $('#plist .gl-warp').html(liitemshow(arr.data));
            li();//划过商品光亮
            pageshow(arr.total);//初始渲染页码
            $('#ipages a').eq(0).addClass('curr');//第一页光亮
            mypages.onclick = function (ev) {  //点击换页功能
                if (ev.target.tagName == 'A') {
                    var cookie = cookies();//获取缓存
                    if (ev.target.innerHTML != '...') {
                        $('.page .p-num a').removeClass('curr');//排他光亮
                        ev.target.classList.add('curr');//点击的那个页码光亮
                        pndisable();//判断上下页是否禁用
                        $.ajax({
                            type: 'get',
                            url: '../PHP/goodsdata.php',
                            data: {
                                ipages: ev.target.innerHTML,
                                order: cookie.order,
                                tex: cookie.tex,
                                lp: cookie.lp,
                                hp: cookie.hp
                            },
                            success: str => {
                                var arr = JSON.parse(str);
                                if (cookie.judge) {//评论数升降序
                                    $('#plist .gl-warp').html(liitemshow(arr.judge));

                                } else {
                                    $('#plist .gl-warp').html(liitemshow(arr.data));

                                }
                                li();//划过商品光亮
                            }
                        })
                    } else {  //点击页码中的...时渲染全部页码
                        pageshow2($('#ipages a:last-child').html());
                    }
                }
            }
        }
    })
    //准备数据渲染
    function liitemshow(arr) {//商品列表渲染
        var liitem = arr.map(function (item) {
            return `<li class="gl-item" gid='${item.gid}'>
                                <div class="p-cnt">
                                    <div class="item hasComment">
                                        <div class="p-img">
                                            <a href="###">
                                                <img src="${item.tu.split('&')[0]}" alt="">
                                            </a>
                                        </div>
                                        <div class="p-scroll ">
                                            <div class="ps-wrap">
                                                <ul class="ps-main">
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="price-icons">
                                            <div class="price">
                                                <span>
                                                    <b>￥</b>
                                                    ${item.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="p-name">
                                            <a href="###">
                                                <em>
                                                    <i class="name-icon-glo">海囤全球</i>
                                                    ${item.gtitle}
                                                </em>
                                            </a>
                                        </div>
                                        <div class="p-buy">
                                            <div class="assess">
                                                <a href="###" class="comment">
                                                    <span class="cNum">
                                                        <b class="comment_num">${item.judgenum}</b>
                                                       条评价
                                                    </span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="p-shop-name">
                                            <p>
                                                <a href="###" class="p-shop-name-text"> ${item.shopname}
                                                </a>
                                                <a href="###" class="p-shop-name-icon shop-icon-new"></a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>`;
        }).join('');
        return liitem;
    }

    $.ajax({//侧栏信息渲染
        type: 'get',
        url: '../PHP/celandata.php',
        success: str => {
            var arr = JSON.parse(str);
            $('.recommend .r-list').html(celanshow(arr));
        }
    })
    function celanshow(arr) {//侧栏渲染函数
        var celan = arr.map(function (item) {
            return `<div class="item">
                    <a href="###">
                        <img src="${item.ctu}" alt="">
                    </a>
                    <div class="price">
                        <em>特价：</em>
                        <span>¥${item.cprice}</span>
                    </div>
                    <a href="###" class="name">${item.ctitle}</a>
                </div>`;
        })
        return celan;
    }

    function pageshow(n) {//部分页码渲染
        var pages = '';
        if (n >= 4) {//如果页数多于4页就不全部显示
            pages = `<a href="###">1</a>
        <a href="###">2</a>
        <a href="###" class="pn-break">...</a>
        <a href="###">${n}</a>`;
        } else {
            for (var i = 0; i < n; i++) {
                pages += `<a href="###">${i + 1}</a>`;
            }
        }
        $('#ipages').html(pages);
        $('#ipages a').eq(0).addClass('curr');//每次页码渲染都要第一页光亮
    }
    function pageshow2(n) {//渲染全部页码
        var pages = '';
        for (var i = 0; i < n; i++) {
            pages += `<a href="###">${i + 1}</a>`;
        }
        $('#ipages').html(pages);//渲染全部页码
    }

    //根据评论数降序
    $('.filter .f-sort a').eq(0).click(function () {
        $('#ipages a').eq(0).addClass('curr');//第一页光亮
        setCookie('judge', 'desc')//设置评论升降序缓存
        removeCookie('order');//清除价格升降序缓存
        $('.filter .f-sort a').eq(0).addClass('curr');//点击评论数升降就光亮
        var cookie = cookies();
        $.ajax({
            type: 'get',
            url: '../PHP/goodsdata.php',
            data: {
                tex: cookie.tex,
                lp: cookie.lp,
                hp: cookie.hp
            },
            success: str => {
                var arr = JSON.parse(str);
                $('#plist .gl-warp').html(liitemshow(arr.judge));
                li();//划过商品光亮
                pageshow(arr.total);
            }

        });
    })
    //价格升价序
    var od = 'asc';
    $('.filter .f-sort a').eq(1).click(function () {
        $('#ipages a').eq(0).addClass('curr');//第一页光亮
        setCookie('order', od);//设置升降序缓存
        removeCookie('judge');//清除评论升降序缓存
        $('.filter .f-sort a').eq(0).removeClass('curr');//取消评论数升降的光亮
        od = od == 'asc' ? 'desc' : 'asc';//每次点击取反
        if (od == 'asc') {//升序降序的时候对应的样式
            $('.filter .f-sort a').eq(1).removeClass('down').addClass('up');
        } else if (od == 'desc') {
            $('.filter .f-sort a').eq(1).removeClass('up').addClass('down');
        }
        var cookie = cookies();
        $.ajax({
            type: 'get',
            url: '../PHP/goodsdata.php',
            data: {
                order: od,
                tex: cookie.tex,
                lp: cookie.lp,
                hp: cookie.hp
            },
            success: str => {
                var arr = JSON.parse(str);
                $('#plist .gl-warp').html(liitemshow(arr.data));
                li();//划过商品光亮
                pageshow(arr.total);

            }
        });
    })
    //价格区间搜索-确定
    $('#priceBtn').click(function () {
        $('#ipages a').eq(0).addClass('curr');//第一页光亮
        setCookie('lp', $('#priceMin').val());
        setCookie('hp', $('#priceMax').val());//设置价格搜索缓存
        var lp = $('#priceMin').val();
        var hp = $('#priceMax').val();
        var cookie = cookies();
        $.ajax({
            type: 'get',
            url: '../PHP/goodsdata.php',
            data: {
                lp: lp,
                hp: hp,
                order: cookie.order,
                tex: cookie.tex
            },
            success: str => {
                var arr = JSON.parse(str);
                if (cookie.judge) {
                    $('#plist .gl-warp').html(liitemshow(arr.judge));
                    pageshow(arr.total);
                } else {
                    $('#plist .gl-warp').html(liitemshow(arr.data));
                    pageshow(arr.total);
                }
                li();//划过商品光亮
            }
        });
    });
    //价格区间搜索-清空
    $('#price-cancel').click(function () {
        $('#ipages a').eq(0).addClass('curr');//第一页光亮
        removeCookie('lp');
        removeCookie('hp');//清除价格区间缓存
        $('#priceMin').val('');
        $('#priceMax').val('')//清除价格区间内容
        var cookie = cookies();
        $.ajax({
            type: 'get',
            url: '../PHP/goodsdata.php',
            data: {
                order: cookie.order,
                tex: cookie.tex
            },
            success: str => {
                var arr = JSON.parse(str);
                if (cookie.judge) {
                    $('#plist .gl-warp').html(liitemshow(arr.judge));
                    pageshow(arr.total);
                } else {
                    $('#plist .gl-warp').html(liitemshow(arr.data));
                    pageshow(arr.total);
                }
                li();//划过商品光亮
            }
        });
    })
    //内容搜索
    $('#resultSearchBtn').click(function () {
        $('#ipages a').eq(0).addClass('curr');//第一页光亮
        setCookie('searchtxt', $('#resultSearchTxt').val());//设置搜索内容缓存
        var tex = $('#resultSearchTxt').val();
        var cookie = cookies();
        $.ajax({
            type: 'get',
            url: '../PHP/goodsdata.php',
            data: {
                tex: tex,
                order: cookie.order,
                lp: cookie.lp,
                hp: cookie.hp,
            },
            success: str => {
                var arr = JSON.parse(str);
                if (cookie.judge) {//如果是评论数升降序,就用php中的data3结果
                    if (arr.judge.length) {
                        $('#J_bottomPage .p-num').css('display', 'block');
                        $('#plist .gl-warp').html(liitemshow(arr.judge));
                    } else {
                        $('#plist .gl-warp').html('不好意思，没有你要的商品！');
                        $('#J_bottomPage .p-num').css('display', 'none');
                    }

                    pageshow(arr.total);
                } else {//否则就是价格升降序
                    if (arr.data.length) {
                        $('#J_bottomPage .p-num').css('display', 'block');
                        $('#plist .gl-warp').html(liitemshow(arr.data));
                    } else {
                        $('#plist .gl-warp').html('不好意思，没有你要的商品！');
                        $('#J_bottomPage .p-num').css('display', 'none');
                    }
                    pageshow(arr.total);
                }

                li();//划过商品光亮
            }
        });
    });
    //上下页点击事件
    $('.page .p-num a').eq(0).click(function () {
        var cookie = cookies();
        var nowpage = $('#ipages .curr').eq(0).html()//获取当前光亮页的所在页数
        if ($('#ipages .curr').eq(0).prev().html() == '...') {//如果是从末尾开始点
            pageshow2($('#ipages a:last-child').html());//点击上一页遇到...就渲染全部页码
        }
        nowpage -= 1;
        if (nowpage <= 0) {
            $('.page .p-num a').eq(0).addClass('disabled');
            nowpage = 1;
        } else {
            $('.page .p-num a').eq(0).removeClass('disabled');
        }
        $('#ipages a').eq(nowpage - 1).addClass('curr').siblings().removeClass('curr');//页码光亮跟着动
        pndisable();
        $.ajax({
            type: 'get',
            url: '../PHP/goodsdata.php',
            data: {
                ipages: nowpage,
                order: cookie.order,
                tex: cookie.tex,
                lp: cookie.lp,
                hp: cookie.hp
            },
            success: str => {
                var arr = JSON.parse(str);
                if (cookie.judge) {//评论数升降序
                    $('#plist .gl-warp').html(liitemshow(arr.judge));

                } else {
                    $('#plist .gl-warp').html(liitemshow(arr.data));
                }
                li();//划过商品光亮
            }
        })
    });
    $('.page .p-num a:last-child').click(function () {
        var cookie = cookies();
        var nowpage = $('#ipages .curr').eq(0).html()//获取当前光亮页的所在页数
        if ($('#ipages .curr').eq(0).next().html() == '...') {//如果是从开始往后点
            pageshow2($('#ipages a:last-child').html());//点击下一页遇到...就渲染全部页码
        }
        nowpage = nowpage - 0 + 1;
        console.log(nowpage)
        if (nowpage >= $('#ipages a:last-child').html()) {
            $('.page .p-num a:last-child').eq(1).addClass('disabled');
            nowpage = $('#ipages a:last-child').html();
        } else {
            $('.page .p-num a:last-child').eq(1).removeClass('disabled');
        }
        $('#ipages a').eq(nowpage - 1).addClass('curr').siblings().removeClass('curr');//页码光亮跟着动
        pndisable();
        $.ajax({
            type: 'get',
            url: '../PHP/goodsdata.php',
            data: {
                ipages: nowpage,
                order: cookie.order,
                tex: cookie.tex,
                lp: cookie.lp,
                hp: cookie.hp
            },
            success: str => {
                var arr = JSON.parse(str);
                if (cookie.judge) {//评论数升降序
                    $('#plist .gl-warp').html(liitemshow(arr.judge));

                } else {
                    $('#plist .gl-warp').html(liitemshow(arr.data));
                }
                li();//划过商品光亮
            }
        })
    });
    //判断上下页是否要disable
    function pndisable() {
        if ($('#ipages .curr').eq(0).html() == $('#ipages a:first-child').html()) {
            $('.page .p-num a').eq(0).addClass('disabled');
        } else if ($('#ipages .curr').eq(0).html() == $('#ipages a:last-child').html()) {
            $('.page .p-num a:last-child').addClass('disabled');
        } else {
            $('.page .p-num a').eq(0).removeClass('disabled');
            $('.page .p-num a:last-child').removeClass('disabled');
        }
    }


    function li() {//划过某商品li就黑亮
        $('.m-list .goods-list .gl-item').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });
    };
    //利用事件委托给li绑定事件
    $('#plist .gl-warp').on('click', '.gl-item', function () {
        location.href = '06xiangqing.html?' + $(this).attr('gid');
    })


})();
