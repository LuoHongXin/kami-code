<?php
//防止中文乱码
header("Content-type:text/html;charset=utf-8");
include 'conn.php';
// mysql_query('set NAMES UTF8');
$gid =isset($_POST['gid'])?$_POST['gid']:'11';
$username =isset($_POST['username'])?$_POST['username']:'11';

//查询整个数据库内容
//选择数据库内容
$GLOBALS['conn']->set_charset('utf8');
$sql1=" DELETE FROM shopcar WHERE gid='$gid' and username = '$username'";//查询数据是否有记录了

$res1 =  $GLOBALS['conn']->query($sql1);//结果集

?>