<?php
//防止中文乱码
header("Content-type:text/html;charset=utf-8");
include 'conn.php';
// mysql_query('set NAMES UTF8');
$gid = isset($_REQUEST['gid']) ?$_REQUEST['gid']:'';
$gnum =isset($_REQUEST['gnum'])?$_REQUEST['gnum']:'';
$username =isset($_REQUEST['username'])?$_REQUEST['username']:'';

//查询整个数据库内容
//选择数据库内容
if($username==''){//未登录
    $gid2='';
foreach($gid as $item){//遍历gid数组
$gid2 .= 'gid = '. $item.' or ';//拼接gid
};
$gid2=substr($gid2,0,strlen($gid2)-3);//去除最后的 or
$sql2="SELECT * FROM goodsdata WHERE $gid2";//查找gid的信息
$res2 = $GLOBALS['conn']->query($sql2);//结果集
$data2 = $res2->fetch_all(MYSQLI_ASSOC);//找到购物车商品在商品表的所有信息
$obj = array(
    'data2'=>$data2,
);
}else{//登录状态
$sql="SELECT * FROM shopcar WHERE username = '$username'";
$res = $GLOBALS['conn']->query($sql);//结果集
$data = $res->fetch_all(MYSQLI_ASSOC);//找到该用户购物车的所有商品id和数量
$obj = array(
    'data'=>$data
);
};
// $GLOBALS['conn']->set_charset('utf8');

//转成字符串传给前端
echo json_encode($obj,JSON_UNESCAPED_UNICODE);

?>