<?php
//防止中文乱码
header("Content-type:text/html;charset=utf-8");
include 'conn.php';
//接收前端传来的username
$mname = isset($_REQUEST['mname'])?$_REQUEST['mname']:'';
$mname = trim($mname);
$mpassword = isset($_REQUEST['mpassword'])?$_REQUEST['mpassword']:'';
$mpassword =trim($mpassword);
//执行sql语句
$res = $GLOBALS['conn']->query("SELECT * FROM manage_information WHERE mname = '$mname'");
$data = $res->fetch_all(MYSQLI_ASSOC);
function login($data,$mpassword){
    if($data){//用户存在
    if($data[0]['mpassword']==($mpassword)){
        return '登录成功';
    }else{
        return '密码错误';
    }
}else{//用户不存在
    return '用户不存在';
}
};
echo json_encode(login($data,$mpassword),JSON_UNESCAPED_UNICODE);
// echo json_encode($mname);
/*API
	用户登录
	post
		login.php
			username : 登录的用户名
			password : 用户登录密码
		返回 
			1:密码错误
			2:用户不存在
			0:登录成功
		
	*/
?>