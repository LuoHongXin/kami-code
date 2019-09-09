(function () {
    $('#w-body').load('061xiangqingbody.html');//导入详情页中心
    $('#w-footer').load('0319footer.html');//导入尾部
    //吸顶效果
    //吸顶对象$('.m-aside .mt'),$('#detail .tab-main')
    var k = 861;//获取第一次吸顶对象的距离顶部的高度
    // console.log($('#detail .tab-main').offset().top);236px
    $(window).scroll(function () {
        // console.log($('#detail .tab-main').offset().top);//861px
        // if (k == 0) { k = $('#detail .tab-main').offset().top };//放弃了，有bug，若直接在他top刷新页面
        // console.log(k);
        if ($(window).scrollTop() >= k) {
            $('.m-aside .mt').addClass('dingwei');
            $('#detail .tab-main').addClass('dingwei');
        } else {
            $('.m-aside .mt').removeClass('dingwei');
            $('#detail .tab-main').removeClass('dingwei');
        }
        //点击商品详情和评价可以切换
        $('.detail .ETab div.large li').eq(0).click(function () {//点击商品详情
            $(this).addClass('current').siblings().removeClass('current');
            $('#detail .tab-con').css('display', 'block');
            $('.comment').css('display', 'none');
            if ($(window).scrollTop() >= k) {
                $(window).scrollTop(k - 1);
            }

        });
        $('.detail .ETab div.large li').eq(1).click(function () {//点击评价
            $(this).addClass('current').siblings().removeClass('current');
            $('#detail .tab-con').css('display', 'none');
            $('.comment').css('display', 'block');
            if ($(window).scrollTop() >= k) {
                $(window).scrollTop(k - 1);
            }
        });
    });
    $('#my_goods_car a').on('click', function () {//点击购物车跳转到购物车页面
        window.open('08shopcar.html');
    })
    let gid = decodeURI(location.search.slice(1));//商品的id
    $.ajax({//渲染数据
        type: 'get',
        url: '../PHP/xiangqing.php',
        data: {
            gid: gid
        },
        success: str => {
            var arr = JSON.parse(str);
            $('#nav-shop .shopHeaderArea .shopName a').html(arr.shopname);
            $('.m-aside h3').html(arr.shopname);//mt的图
            $('#jnum').html(`(${arr.judgenum}+)`);//商品详情的评价数
            $('.detail .p-parameter .parameter2 li span').eq(0).html(arr.gtitle);//商品详情的商品名
            $('.detail .p-parameter .parameter2 li span').eq(1).html(arr.shopname);//商品详情的店铺名
            $('.detail .p-parameter .parameter2 li span').eq(2).html(arr.othername);//商品详情的介绍
            $('.detail .p-parameter .parameter2 li span').eq(4).html(arr.price);//商品详情的价格
            var photo = arr.tu.split('&').map(function (item) {
                return ` <p><img src="${item}"></p>`;
            }).join('');
            $('.tab-con .photo').html(photo);//商品详情的图
        }
    });
    //用户登录就显示用户名
    if (lookCookie('username')) {//刷新页面就执行
        $('#shortcut ul a:first').html(lookCookie('username') + ',退出');
        $('#shortcut ul a:first').addClass('style-red');
        $('#shortcut ul a:first').click(function () {
            $('#shortcut ul a:first').html('你好，请登录');
            removeCookie('username');
            $('#shortcut ul a:first').removeClass('style-red');
            $('#shortcut ul a:first').click(function () {
                location.href = '04userdenglu.html';
            });
        });
    } else {//否则可以点击让用户跳转到登录页面
        $('#shortcut ul a:first').html('你好，请登录');
        $('#shortcut ul a:first').click(function () {
            location.href = '04userdenglu.html';
        });
    }
    //评论渲染
    function pinglun() {
        let contents = '';//存放评论
        $.ajax({
            type: 'get',
            url: '../PHP/usercontent.php',
            success: str => {
                var arr = JSON.parse(str).data;
                for (var i of arr) {
                    contents += `<tr>
                                <td class="com-i-column column2">
                                    <div class="p-comment-wrap">
                                        <div class="p-comment">
                                            <span
                                                class="desc">${i.content}</span>
                                        </div>
                                    </div>
                                    <div class="comment-operate">
                                        <span class="reply J-reply-trigger">踩（<span id="cai">${i.oppose}</span> ）</span>
                                        <span class="nice J-nice">点赞（<span id="zan">${i.support}</span> ）</span>
                                    </div>
                                </td>
                                <td class="com-i-column column5">
                                    <div class="user-item">
                                        用户：
                                        <span class="user-name">${i.uname}</span>
                                    </div>
                                </td>
                            </tr>`;
                };
                $('.com-item-main tbody').html(contents);//渲染评论
                var n = '罗大佑'
                ll();
            }
        });
    }
    pinglun();//刷新页面渲染
    function ll() {//总功能
        if (lookCookie('username')) {//登录的话
            liuyan();
            $('.send').click(function () {//发表评论 
                var icontent = $('.askAnswer .ask-wrap input').val().trim();//获取评论内容
                if (icontent) {//如果有评论内容
                    $.ajax({
                        type: 'post',
                        url: '../PHP/usercontent.php',
                        data: {
                            username: lookCookie('username'),
                            content: icontent
                        },
                        success: str => {
                            pinglun();//重新渲染评论
                            liuyan();//重启功能
                        }
                    });
                } else {//评论为空
                    $('.askAnswer .ask-wrap input').prop('placeholder', lookCookie('username') + ',请输入内容再发表意见！');
                }
            });
        } else {//没登录
            $('.askAnswer .ask-wrap input').prop('placeholder', '请登录后再发表意见！');
        }
    }


    //留言的功能
    function liuyan() {
        $('.reply').click(function () {//踩的功能
            var cainum = $(this).find('#cai').html() - 0;//获取踩的次数
            $(this).find('#cai').html(cainum + 1)//加1赋值回去并渲染
            if (cainum) {
                $.ajax({
                    type: 'get',
                    url: '../PHP/usercontent.php',
                    data: {
                        oppose: cainum + 1,//更新次数
                        username: $(this).parents('tr').find('.user-name').html()//被踩的用户名
                    },
                });
            }
        });
        $('.nice').click(function () {//顶的功能
            var zannum = $(this).find('#zan').html() - 0;//获取踩的次数
            $(this).find('#zan').html(zannum + 1)//加1赋值回去并渲染
            if (zannum) {
                $.ajax({
                    type: 'get',
                    url: '../PHP/usercontent.php',
                    data: {
                        support: zannum + 1,//更新次数
                        username: $(this).parents('tr').find('.user-name').html()//被踩的用户名
                    },
                });
            }
        })

    }


})()
