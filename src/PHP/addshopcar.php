<?php
//防止中文乱码
header("Content-type:text/html;charset=utf-8");
include 'conn.php';
// mysql_query('set NAMES UTF8');
$gid =isset($_POST['gid'])?$_POST['gid']:'';
$username =isset($_POST['username'])?$_POST['username']:'';
$gnum =isset($_POST['gnum'])?$_POST['gnum']:'';

//查询整个数据库内容
//选择数据库内容
$GLOBALS['conn']->set_charset('utf8');
$sql1="select * from shopcar where gid='$gid' and username = '$username'";//查询数据是否有记录了
$sql4="select * from goodsdata where gid='$gid'";//根据gid查找商品信息
$res1 =  $GLOBALS['conn']->query($sql1);//结果集
$res4 =  $GLOBALS['conn']->query($sql4);//结果集
// var_dump ($res1);
$data = $res4->fetch_all(MYSQLI_ASSOC);//找到gid商品信息
$gtu = $data[0]['tu'];
$gprice = $data[0]['price'];
$gshopname = $data[0]['shopname'];
$gtitle = $data[0]['gtitle'];
if($res1->num_rows==1){//若存在数据则更新
$sql3="update shopcar set gnum = '$gnum' where gid='$gid' and username = '$username'";
$res3 = $GLOBALS['conn']->query($sql3);//结果集
echo json_encode('更新成功',JSON_UNESCAPED_UNICODE);
}else{//不存在就插入数据
    $sql2 = "INSERT INTO shopcar(gid,username,gnum,gtu,gprice,gshopname,gtitle) VALUES ('$gid','$username','$gnum','$gtu','$gprice','$gshopname','$gtitle')";
$res2 = $GLOBALS['conn']->query($sql2);//结果集
echo json_encode('插入成功',JSON_UNESCAPED_UNICODE);
}

?>