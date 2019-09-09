<?php
//防止中文乱码
header("Content-type:text/html;charset=utf-8");
include 'conn.php';
$ipage = isset($_POST['ipage'])?$_POST['ipage']:'1';
$uid=isset($_POST['uid'])?$_POST['uid']:'';//传了uid就要删除
$updateid=isset($_POST['updateid'])?$_POST['updateid']:'';//
$updatename=isset($_POST['updatename'])?$_POST['updatename']:'';//
$updatephone=isset($_POST['updatephone'])?$_POST['updatephone']:'';//
$updatepsw=isset($_POST['updatepsw'])?$_POST['updatepsw']:'';//
$ipage = ($ipage - 1)*10;
if($uid!=''){//如果有传用户
    $uid2 = '';
    foreach($uid as $item){//遍历uid数组
        $uid2 .= 'uid = '. $item.' or ';//拼接uid
        };
        $uid2=substr($uid2,0,strlen($uid2)-3);//去除最后的 or
        $res3=  $GLOBALS['conn']->query("DELETE FROM user_information WHERE  $uid2");//删除用户
}
if($updateid!=''){
    for($i=0;$i<count($updateid);$i++){
        $uname = $updatename[$i];
        $uphone =$updatephone[$i];
        $upassword =md5($updatepsw[$i]) ;
        $id =$updateid[$i];
        $GLOBALS['conn']->query("update  user_information set uname = ' $uname' ,uphone = '$uphone' , upassword = '$upassword'  WHERE uid = $id");//更新用户
    };
}
   

//执行SQL语句
$res = $GLOBALS['conn']->query("SELECT * FROM user_information limit $ipage,10");//根据页数选择10个
$res2=  $GLOBALS['conn']->query("SELECT * FROM user_information");//选择全部

$data = $res->fetch_all(MYSQLI_ASSOC);
$obj=array(
    'data'=>$data,
    'total'=>ceil($res2->num_rows/10),//能够生成的总页数
    // 'updateid'=>$updateid
);
echo json_encode($obj,JSON_UNESCAPED_UNICODE);
?>