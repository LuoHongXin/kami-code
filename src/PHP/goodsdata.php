
<?php
//防止中文乱码
header("Content-type:text/html;charset=utf-8");
include 'conn.php';
// mysql_query('set NAMES UTF8');
$ipages = empty($_GET['ipages']) ?'1': $_GET['ipages'];
$num = empty($_GET['num']) ? '20':$_GET['num'];
$order = empty($_GET['order']) ? '':$_GET['order'];
$tex = empty($_GET['tex']) ? '':$_GET['tex'];
$lp =  empty($_GET['lp']) ? 0:$_GET['lp'];
$hp = empty($_GET['hp']) ? 999999:$_GET['hp'];
// echo $tex;
//查询整个数据库内容
$ipages2=($ipages-1)*$num;
//选择数据库内容
$sql = "SELECT * FROM goodsdata WHERE  price BETWEEN $lp AND $hp AND (gtitle LIKE  '%$tex%'  OR shopname LIKE  '%$tex%') ORDER BY price $order  limit $ipages2,$num";
// $sql = "SELECT * FROM goodsdata WHERE  price BETWEEN 10 AND 12 AND (gtitle LIKE  '%%'  OR shopname LIKE  '%%') ORDER BY price   limit $ipages,$num";
$sql2 = "SELECT * FROM goodsdata WHERE  price BETWEEN $lp AND $hp AND (gtitle LIKE  '%$tex%'  OR shopname LIKE  '%$tex%') ORDER BY price $order";
$sql3="SELECT * FROM goodsdata WHERE  price BETWEEN $lp AND $hp AND (gtitle LIKE  '%$tex%'  OR shopname LIKE  '%$tex%') ORDER BY judgenum DESC limit $ipages2,$num";
$GLOBALS['conn']->set_charset('utf8');
//执行语句
$res = $GLOBALS['conn']->query($sql);//结果集
$res2 = $GLOBALS['conn']->query($sql2);//结果集
$res3 = $GLOBALS['conn']->query($sql3);//结果集
// var_dump( $res);
//提取数据
$data = $res->fetch_all(MYSQLI_ASSOC);
$data3=$res3->fetch_all(MYSQLI_ASSOC);
$data2=array(
    'data'=>$data,//得到的数据对象数组
    'total'=>ceil(($res2->num_rows/$num)),//含价格升降序总页数
    'ipages'=>$ipages,
    'num'=>$num,
    'judge'=>$data3,
    'num3'=>ceil(($res3->num_rows/$num))//含评论升降序总页数
);
//转成字符串传给前端

echo json_encode($data2,JSON_UNESCAPED_UNICODE);
$res->close();
$GLOBALS['conn']->close();
// echo $data;
?>