; (function () {
    let tb = document.getElementById('tb');
    //渲染数据
    $.ajax({
        type: 'post',
        data: {
            ipage: 1
        },
        url: '../PHP/changeuserinformation.php',
        success: str => {
            var arr = JSON.parse(str)
            show(arr.data);
            page(arr.total);
        }
    });
    function show(arr) {//渲染内容函数
        var ht = '';//存放渲染的结构
        for (var k of arr) {
            ht += `<tr class='tr'>
            <td><input type="checkbox" name="1" class="con"> </td>`;
            for (var p in k) {
                ht += `<td contenteditable="true" class='inf'>${k[p]}</td>`;
            }
            ht += `<td> <a href="###" class="del">删除</a></td>
        </tr>`;
        }
        $('#tbd').html(ht)//渲染
    }
    function page(n) {//渲染页码函数
        var pagehtml = '';//存放页码结构
        for (var i = 0; i < n; i++) {
            pagehtml += `<span>${i + 1}</span>`;
        }
        $('.btn').prepend(pagehtml);
    }

    //全选不选
    tb.onclick = function (ev) {
        var con = tb.getElementsByClassName('con');
        var qx = tb.getElementsByClassName('qx')[0];
        if (ev.target.className == 'qx') {  //全选，con按钮全部选中
            for (var i = 0; i < con.length; i++) {
                con[i].checked = ev.target.checked;
            }
        }
        if (ev.target.className == 'con') {
            //若con点击数量满足con的长度那就全选选中
            if (check(con) == con.length) {
                qx.checked = true;
            } else {
                qx.checked = false;
            }
            if (ev.target.checked == false) {
                ev.target.parentNode.parentNode.className = 'tr';
            } else {
                ev.target.parentNode.parentNode.className = 'tr tractive';
            }
        }

        if (ev.target.tagName == 'TD') {  //点击任意单元格选中当前行并勾选当前复选框
            ev.target.parentNode.className = 'tr tractive';
            ev.target.parentNode.children[0].children[0].checked = true;
        }
        if (ev.target.className == 'del') {//删除表格行
            tbd.removeChild(ev.target.parentNode.parentNode);
            uid.push(ev.target.parentNode.parentNode.children[1].innerHTML);
        }
    }
    //封装判断con按钮选中个数的函数
    function check(con) {
        var num = 0;
        for (var i = 0; i < con.length; i++) {
            if (con[i].checked) {
                num++;
            }
            else {
                num--;
            }
        }
        return num;
    }
    var uid = [];//存放要删除的用户id
    var updateid = [];//要更新的id
    var updatename = [];//用户名
    var updatephone = [];//手机号
    var updatepsw = [];//密码
    //选中都删除
    $('#delchose').click(function () {
        $('.tr').each(function () {
            if ($(this).find('.con').prop('checked')) {
                $(this).remove();
                uid.push($(this).find('td').eq(1).html());//删除的uid存进数组uid里
            }
        });
    });

    //点击确认保存数据，修改数据库数据
    $('#confirm').click(function () {
        $('.tr').each(function () {
            updateid.push($(this).find('td').eq(1).html());
            updatename.push($(this).find('td').eq(2).html());
            updatephone.push($(this).find('td').eq(3).html());
            updatepsw.push($(this).find('td').eq(4).html());
        }
        );
        if (updateid.length) {
            console.log(uid);
            console.log(updatephone);
            $.ajax({
                type: 'post',
                url: '../PHP/changeuserinformation.php',
                data: {
                    uid: uid,
                    updateid: updateid,
                    updatename: updatename,
                    updatephone: updatephone,
                    updatepsw: updatepsw,
                },
                success: (str) => {
                    // console.log(str.updateid);
                    uid = [];
                    updateid = [];
                    updatename = [];
                    updatephone = [];
                    updatepsw = [];//清空
                }
            });
        }
    });

})();
