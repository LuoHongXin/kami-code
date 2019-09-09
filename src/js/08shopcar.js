(function () {
    $('#shopcar_head').load('08.1shopcarhead.html');//导入头部
    $('#w-footer').load('0319footer.html');//导入尾部
    var fun = {//所有的功能,面向对象的写法
        allshopnum: () => { //已选择商品个数.toolbar-wrap .amount-sum em
            var allnum = 0;
            var allprice = 0;//总价.toolbar-wrap .price-sum .price em
            $singleshop.each(function () {//遍历单个选择
                if ($(this).is(':checked')) {
                    $(this).parents('.item-item').addClass('item-selected');//选中的商品变粉色
                    allnum += $(this).parents('.item-item').find('.itxt').val() - 0;
                    allprice += ($(this).parents('.item-item').find('.itxt').val() - 0) * ($(this).parents('.item-item').find('.p-price strong span').html() - 0);
                } else {//否则白色
                    $(this).parents('.item-item').removeClass('item-selected');
                }
            });
            $('.toolbar-wrap .amount-sum em').html(allnum);
            $('.toolbar-wrap .price-sum .price em:last').html(allprice);
        },
        shopdel: () => {//若商品为空，删除整个店铺
            $shop.each(function () {//遍历店铺节点
                if ($(this).find($('.item-item')).length == 0) {//若有店铺没有商品节点
                    $(this).remove();//删除该店铺
                }
            })
        },
        subshop: n => {//获取商品的单价和数量，得到的数渲染在小计中
            var price = n.parents('.item-item').find(' .p-price strong span').html();
            var shopnum = n.parents('.item-item').find('.itxt').val();
            n.parents('.item-item').find('.p-sum strong').html(price * shopnum);
        },
        testbuynum: n => {//控制buynum最低为1，最高不过200
            if (n <= 1) {
                n = 1;
            } else if (n >= 200) {
                n = 200;
            }
            return n;
        },
        sgshopeach: () => {//遍历所有单个商品是否全选
            var len = $singleshop.length;
            var num = 0;
            $singleshop.each(function () {//遍历单个选择
                if ($(this).is(':checked')) {
                    num++;
                }
            });
            if (num == len) {//全选就返回true
                return true;
            } else {
                return false;
            }
        },
        updateshopcar: (n) => {//传入节点,更新数据库购物车数据
            if (lookCookie('username')) {//前提是登录才能修改数据库购物车
                $.ajax({
                    type: 'post',
                    url: '../PHP/addshopcar.php',
                    data: {
                        gid: n.parents('.item-item').attr('gid'),
                        username: lookCookie('username'),
                        gnum: n.parents('.item-item').find('.itxt').val()
                    }
                });
            }
        },
        removeshopcar: (n) => {//删除数据库数据
            if (lookCookie('username')) {//前提是登录才能修改数据库购物车
                $.ajax({
                    type: 'post',
                    url: '../PHP/removeshopcar.php',
                    data: {
                        gid: n.parents('.item-item').attr('gid'),
                        username: lookCookie('username'),
                    }
                });
            }
        },
        nogoodsinshopcar: () => {//空的购物车功能
            $('.btn-1').click(function () {
                location.href = '04userdenglu.html';
            });
            $('.cart-empty .message ul li .ftx-05 ').click(function () {
                location.href = '03main.html';
            });
        }
    }
    /*=====================数据渲染========================================*/
    if (lookCookie('username')) {//用户登录
        $.ajax({
            type: 'get',
            url: '../PHP/shopcar.php',
            data: {
                username: lookCookie('username')
            },
            success: str => {
                var arr = JSON.parse(str);
                if (arr.data.length) {//若用户数据库有购物车商品
                    var shopname = [];//存储店铺名
                    arr.data.forEach(function (item) {//遍历数组
                        if (!shopname.includes(item.gshopname)) {//去重
                            shopname.push(item.gshopname);
                        }
                    });
                    var shopnamedata = '';//先渲染店铺
                    shopnamedata = shopname.map(function (item) {
                        return `  <div class="cart-item-list">
                        <div class="cart-tbody">
                            <div class="shop">
                                <div class="cart-checkbox">
                                    <input type="checkbox" class="jdcheckbox allshop">
                                </div>
                                <div class="shop-txt">
                                    <a href="###" class="shop-name">${item}</a>
                                </div>
                            </div>
                            <div class="item-list">  </div>
                        </div>
                    </div>`;
                    });
                    $('#cart-list').html(shopnamedata);//渲染店铺结构
                    var data = '';//存储商品渲染
                    arr.data.forEach(function (item) {//遍历后端传过来的数据
                        $('.shop-name').each(function () {//遍历已经渲染的店铺名
                            if (item.gshopname == $(this).html()) {//如果遍历到的arr.data的店铺名和节点的店铺名一样就渲染
                                data = ` <div class="item-item " gid = ${item.gid}>
                                    <div class="item-form">
                                        <div class="cell p-checkbox">
                                            <div class="cart-checkbox">
                                                <input type="checkbox" class="jdcheckbox singleshop">
                                            </div>
                                        </div>
                                        <div class="cell p-goods">
                                            <div class="goods-item">
                                                <div class="p-img">
                                                    <img src="${item.gtu.split('&')[0]}">
                                                </div>
                                                <div class="item-msg">
                                                    <div class="p-name">
                                                        <em class="jdint-icon"></em>
                                                        ${item.gtitle}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cell p-props p-props-new">
                                        </div>
                                        <div class="cell p-price"><strong>单价<span>${item.gprice}</span> </strong></div>
                                        <div class="cell p-quantity">
                                            <div class="quantity-form">
                                                <a href="###" class="decrement ">-</a>
                                                <input type="text" class="itxt" value="${item.gnum}"
                                                    onkeyup="(function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)">
                                                <a href="###" class="increment">+</a>
                                            </div>
                                        </div>
                                        <div class="cell p-sum">
                                            <strong>${item.gprice * item.gnum}</strong>
                                        </div>
                                        <div class="cell p-ops"><a href="###">删除</a></div>
                                    </div>
                                </div>`;
                                $(this).parents('.cart-item-list').find('.item-list').append(data);
                            }
                        });
                    })
                    gn();//渲染完后启用功能
                } else {//购物车没有商品
                    $('#jd-cart').css('display', 'none');
                    $('#cart-floatbar').css('display', 'none');
                    $('.cart-empty').css('display', 'block');
                    fun.nogoodsinshopcar();
                }

            }
        });
    } else {//未登录
        //查看缓存
        var gid = [];//存放gid
        var gnum = new Object();//存放gnum
        // function checkCookie() {//得到gid和gnum对应的数组
        var cookie = document.cookie.split(';');
        cookie.forEach(function (item) {
            var arr2 = item.split('=');
            if (arr2[0].indexOf('gid') != -1) {//若缓存名有gid，则找到gid缓存
                gid.unshift(arr2[0].trim().slice(3));//去除前后空格，从d之后的第一个数字开始截取，得到gid
                // gnum.unshift(arr2[1]);
                gnum[arr2[0].trim().slice(3)] = arr2[1];//存放gnum
            }
        });
        gid = gid.reverse();//倒过来，按时间从第一个往后排
        if (gid.length) {//有商品才渲染
            $.ajax({
                type: 'get',
                url: '../PHP/shopcar.php',
                data: {
                    gid: gid//传gid数组过去
                },
                success: str => {
                    var arr = JSON.parse(str);
                    var shopname = [];//存储店铺名
                    arr.data2.forEach(function (item) {//遍历数组
                        if (!shopname.includes(item.shopname)) {//去重
                            shopname.push(item.shopname);
                        }
                    });
                    var shopnamedata = '';//先渲染店铺
                    shopnamedata = shopname.map(function (item) {
                        return `  <div class="cart-item-list">
                        <div class="cart-tbody">
                            <div class="shop">
                                <div class="cart-checkbox">
                                    <input type="checkbox" class="jdcheckbox allshop">
                                </div>
                                <div class="shop-txt">
                                    <a href="###" class="shop-name">${item}</a>
                                </div>
                            </div>
                            <div class="item-list">  </div>
                        </div>
                    </div>`;
                    });
                    $('#cart-list').html(shopnamedata);//渲染店铺结构
                    var data = '';//存储商品渲染
                    var i = 0;
                    arr.data2.forEach(function (item) {//遍历后端传过来的数据
                        $('.shop-name').each(function () {//遍历已经渲染的店铺名
                            if (item.shopname == $(this).html()) {//如果遍历到的arr.data的店铺名和节点的店铺名一样就渲染
                                data = ` <div class="item-item " gid = ${item.gid}>
                                    <div class="item-form">
                                        <div class="cell p-checkbox">
                                            <div class="cart-checkbox">
                                                <input type="checkbox" class="jdcheckbox singleshop">
                                            </div>
                                        </div>
                                        <div class="cell p-goods">
                                            <div class="goods-item">
                                                <div class="p-img">
                                                    <img src="${item.tu.split('&')[0]}">
                                                </div>
                                                <div class="item-msg">
                                                    <div class="p-name">
                                                        <em class="jdint-icon"></em>
                                                        ${item.gtitle}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cell p-props p-props-new">
                                        </div>
                                        <div class="cell p-price"><strong>单价<span>${item.price}</span> </strong></div>
                                        <div class="cell p-quantity">
                                            <div class="quantity-form">
                                                <a href="###" class="decrement ">-</a>
                                                <input type="text" class="itxt" value="${gnum[item.gid]}"
                                                    onkeyup="(function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)">
                                                <a href="###" class="increment">+</a>
                                            </div>
                                        </div>
                                        <div class="cell p-sum">
                                            <strong>${item.price * gnum[item.gid]}</strong>
                                        </div>
                                        <div class="cell p-ops"><a href="###">删除</a></div>
                                    </div>
                                </div>`;
                                $(this).parents('.cart-item-list').find('.item-list').append(data);
                            }
                        });
                        i++;
                    })
                    gn();//渲染完后启用功能
                }
            });
        } else {//没有商品就来购物车的话
            $('#jd-cart').css('display', 'none');
            $('#cart-floatbar').css('display', 'none');
            $('.cart-empty').css('display', 'block');
            fun.nogoodsinshopcar();
        }
    }
    function gn() {//页面内的所有功能
        //全选按钮的id为allall
        //店铺全选的按钮class为allshop,单个商品的选择class为singleshop
        //jq方式绑定节点
        var $allall = $('.allall');//全选节点
        $allshop = $('.allshop')//店铺全选节点
        $singleshop = $('.singleshop')//单个商品选择节点
        $shop = $('.cart-item-list')//店铺为单位的整个盒子节点
        /*==================点击全选按钮，全部按钮状态和全选一致==============*/
        $allall.click(function () {
            $allshop.prop('checked', $(this).is(':checked'));//is判断当前事件对象的checked，并返回布尔值
            $singleshop.prop('checked', $(this).is(':checked'));
            fun.allshopnum()
        });
        /*=============店铺全选按钮的点击=====================*/
        $allshop.click(function () {
            //点击的当前店铺全选，当前店铺商品全选
            $(this).parents('.cart-item-list').find('.singleshop').prop('checked', $(this).is(':checked'));
            //全选按钮判断是否要全选
            $allall.prop('checked', fun.sgshopeach());
            fun.allshopnum()
        });
        /*=============单个商品按钮的点击控制全选=====================*/
        $singleshop.click(function () {
            $allall.prop('checked', fun.sgshopeach());//全局全选选中
            $allshop.prop('checked', fun.sgshopeach());//当然店铺全选也要选中
            //遍历当前单选按钮所在店铺的所有单选是否全选，若有则店铺全选选中
            var len = $(this).parents('.cart-item-list').find('.singleshop').length;//当前所在店铺。所有的单选长度
            var num = 0;
            $(this).parents('.cart-item-list').find('.singleshop').each(function () {
                if ($(this).is(':checked')) {
                    num++;
                }
            });
            if (num == len) {
                $(this).parents('.cart-item-list').find('.allshop').prop('checked', true);
            } else {
                $(this).parents('.cart-item-list').find('.allshop').prop('checked', false);
            }
            fun.allshopnum()
        });

        /*========================商品数量==============================*/

        //点加增加购买数量，最低为1，最高为200，不能为数字以外的字符串
        $('.increment').click(function () {//点击增加
            var buynum = $(this).prev().val();
            buynum++;
            buynum = fun.testbuynum(buynum);
            $(this).prev().val(buynum);//改变商品数量
            fun.subshop($(this));
            fun.allshopnum();
            fun.updateshopcar($(this));//更新数据库
        });

        $('.decrement ').click(function () {//点击减少
            var buynum = $(this).next().val();
            buynum--;
            buynum = fun.testbuynum(buynum);
            $(this).next().val(buynum);//改变商品数量
            fun.subshop($(this));
            fun.allshopnum()
            fun.updateshopcar($(this));
        });

        //键盘输入时也要控制购买数量范围
        $('.itxt').keyup(function () {
            var buynum = $(this).val();
            buynum = fun.testbuynum(buynum);
            $(this).val(buynum);
            fun.subshop($(this));
            fun.allshopnum();
            fun.updateshopcar($(this));
        });
        //选中商品删除
        $('.remove-batch').click(function () {
            $singleshop.each(function () {//遍历单个选择
                if ($(this).is(':checked')) {
                    $(this).parents('.item-item').remove();//删除选中的商品
                    $singleshop = $('.singleshop')//并重新声明节点
                    fun.removeshopcar($(this));//数据库删除
                    removeCookie('gid' + $(this).parents('.item-item').attr('gid'));//删除缓存
                }
            });
            fun.shopdel();
            fun.allshopnum();

        });
        //点击删除，删除当前所在商品
        $('.cart-tbody .item-item .p-ops a').click(function () {
            $(this).parents('.item-item').remove();//删除选中的商品
            $singleshop = $('.singleshop')//并重新声明节点
            fun.shopdel();
            fun.allshopnum();
            fun.removeshopcar($(this));
            removeCookie('gid' + $(this).parents('.item-item').attr('gid'));
        });
        //点击去结算
        $('.toolbar-wrap .btn-area .submit-btn').click(function () {
            $('#tishi').css('display', 'block');//提示框显示
            if (lookCookie('username')) {//若登陆
                $('#tishi .tsbody').css('display', 'block');
                $('#tishi .title span').html('扫码支付');
            } else {//没登录
                $('#tishi .qdl').css('display', 'block').click(function () {
                    setCookie('baby', '08shopcar.html');
                    location.href = '04userdenglu.html';
                });
            }
            $('#tishi .no').click(function () {
                $('#tishi').css('display', 'none');//提示框显示
            });
        });


    }
})();