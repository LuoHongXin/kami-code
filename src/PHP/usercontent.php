<?php
//防止中文乱码
header("Content-type:text/html;charset=utf-8");
include 'conn.php';
//接收前端传来的username
$username = isset($_REQUEST['username'])?$_REQUEST['username']:'';
$oppose = isset($_REQUEST['oppose'])?$_REQUEST['oppose']:'';
$support = isset($_REQUEST['support'])?$_REQUEST['support']:'';
$content = isset($_REQUEST['content'])?$_REQUEST['content']:'';
//执行sql语句
if($content!=''){
    $GLOBALS['conn']->query("INSERT INTO user_content (uname,content,support,oppose) VALUES ('$username','$content',0,0)");
}
if($oppose!=''){
    $GLOBALS['conn']->query("UPDATE user_content SET oppose = $oppose WHERE uname = '$username'; ");
};
if($support!=''){
    $GLOBALS['conn']->query("UPDATE user_content SET support = $support WHERE uname = '$username'; ");
};
//插入新的之后再获取新内容选
$res = $GLOBALS['conn']->query("SELECT * FROM user_content ");
$data = $res->fetch_all(MYSQLI_ASSOC);
// function login($data,$password){
//     if($data){//用户存在
//     if($data[0]['upassword']==md5($password)){
//         return $data[0]['uid'];
//     }else{
//         return 1;
//     }
// }else{//用户不存在
//     return 2;
// }
// };
$obj = array(
    'data'=>$data,
);
echo json_encode($obj);

?>