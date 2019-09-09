<?php
//防止中文乱码
header("Content-type:text/html;charset=utf-8");
include 'conn.php';
//接收前端传来的username
$username = isset($_REQUEST['username'])?$_REQUEST['username']:'123';
$username = trim($username);
$password = isset($_REQUEST['password'])?$_REQUEST['password']:'';
// $password =trim($password);
//用户名验证函数
function verifyUserName($username){
//执行SQL语句
$res = $GLOBALS['conn']->query("SELECT * FROM user_information WHERE uname = '$username'");
$data = $res->fetch_all(MYSQLI_ASSOC);
if($data) return 1;
return 0;
};
//用户注册函数
function login($username,$password){
if(verifyUserName($username)==0 && $password !=''){//用户名通过或密码不为空
   $password = md5($password);//加密
	$res2 = $GLOBALS['conn']->query("INSERT INTO user_information (uname,upassword) VALUES ('$username','$password')");
	return 0;
   
}else{
    return 1;
};
};

$obj=array(
'login'=>login($username,$password),
'verifyUserName'=>verifyUserName($username)
);
echo json_encode($obj,JSON_UNESCAPED_UNICODE);
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
							0:用户名验证成功,但密码不符合规范（3-16位不为空）
		}
	*/
?>