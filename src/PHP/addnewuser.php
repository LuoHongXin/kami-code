<?php
//接收前端传来的username
$username = isset($_REQUEST['username'])?$_REQUEST['username']:'';
$username = trim($username);
$password = isset($_REQUEST['password'])?$_REQUEST['password']:'';
$password =md5($password);
$phonenum = isset($_REQUEST['phonenum'])?$_REQUEST['phonenum']:'';
$phonenum =trim($phonenum);
include 'conn.php';
function verifyUserName($username){
//执行SQL语句
$res = $GLOBALS['conn']->query("SELECT * FROM user_information WHERE uname = '$username'");
$data = $res->fetch_all(MYSQLI_ASSOC);
 if(count($data)) return 1;
return 0;
};
//用户注册函数
function login($username,$password,$phonenum){
if(verifyUserName($username)==1){
	return 1;
}else if(!empty($password)&&!empty($username)&&!empty($phonenum)){
	$res2 = $GLOBALS['conn']->query("INSERT INTO user_information (uname,upassword,uphone) VALUES ('$username','$password','$phonenum')");
	return 0;
}
};

$obj=array(
'login'=>login($username,$password,$phonenum),
'verifyUserName'=>verifyUserName($username)
);
// echo json_encode($data) ;
echo json_encode($obj);
		/*API
	用户注册
	post
		sign in.php
			username : 要验证的用户名
			password : 用户注册的密码
		返回 {
			login：0：注册成功，1：注册失败，
			verifyUserName：
							1:用户名已存在
							0:用户名验证成功
		}
	*/