<?php
//防止中文乱码
header("Content-type:text/html;charset=utf-8");
include 'conn.php';
// mysql_query('set NAMES UTF8');
$gid = empty($_REQUEST['gid']) ?'': $_REQUEST['gid'];

//查询整个数据库内容
//选择数据库内容
$sql = "SELECT * FROM goodsdata WHERE gid = $gid";

$GLOBALS['conn']->set_charset('utf8');
//执行语句
$res = $GLOBALS['conn']->query($sql);//结果集
// var_dump( $res);
//提取数据
$data = $res->fetch_all(MYSQLI_ASSOC);
//转成字符串传给前端

echo json_encode($data[0],JSON_UNESCAPED_UNICODE);

?>