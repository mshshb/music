<?php
/**在线报名->学员登记**/
header('Content-Type: application/json;charset=UTF-8');
require_once('init.php');
@$period=$_REQUEST['period'];
@$title=$_REQUEST['title'];
@$degree=$_REQUEST['degree'];
@$age=$_REQUEST['age'];
@$uname=$_REQUEST['uname'];
@$tel=$_REQUEST['tel'];
@$details=$_REQUEST['details'];
if(!$tel){
	$tel='00000000';
}
/*检测是否已有该条记录*/
$sql="SELECT COUNT(*) AS num FROM music_user WHERE uname='$uname' AND age='$age' 
		AND degree='$degree' AND phone='$tel' AND title='$title' 
		AND period='$period' AND details='$details'";
$result=mysqli_query($conn,$sql);
$count=mysqli_fetch_assoc($result);
if(!$count["num"]){//没有记录时插入该记录
	$sql="INSERT INTO music_user VALUES(NULL,'$uname','$age','$degree','$tel','$title','$period','$details')";
	$result=mysqli_query($conn,$sql);
	echo json_encode(["code"=>1,"msg"=>"我们会尽快联系您，定课是否成功以电话沟通情况为准。再次感谢！"]);
}else{
	echo json_encode(["code"=>0,"msg"=>"后台已有完全一样的信息，您可能重复定课了。再次感谢！"]);	
}
