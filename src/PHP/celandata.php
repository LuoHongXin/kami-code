<?php
include 'conn.php';
header("Content-type:text/html;charset=utf-8");
$sql='select * FROM celandata';
$res = $GLOBALS['conn']->query($sql);//提取数据
$data=$res->fetch_all(MYSQLI_ASSOC);
echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>