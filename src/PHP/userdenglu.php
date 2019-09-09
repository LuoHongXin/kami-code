<?php
//防止中文乱码
header("Content-type:text/html;charset=utf-8");
include 'conn.php';
//接收前端传来的username
$username = isset($_REQUEST['username'])?$_REQUEST['username']:'';
$username = trim($username);
$password = isset($_REQUEST['password'])?$_REQUEST['password']:'';
$password =trim($password);
//执行sql语句
$res = $GLOBALS['conn']->query("SELECT * FROM user_information WHERE uname = '$username'");
$data = $res->fetch_all(MYSQLI_ASSOC);
function login($data,$password){
    if($data){//用户存在
    if($data[0]['upassword']==md5($password)){
        return $data[0]['uid'];
    }else{
        return 1;
    }
}else{//用户不存在
    return 2;
}
};
echo json_encode(login($data,$password));

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