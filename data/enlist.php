<?php
/**在线报名**/
header('Content-Type: application/json;charset=UTF-8');
require_once('init.php');
/*音乐机构的介绍*/
$sql = "SELECT * FROM music_intro WHERE intro_id=1";
$result = mysqli_query($conn, $sql);
$arrs=[];
if($result){
	$rows=mysqli_fetch_assoc($result);
	if($rows){
		foreach($rows as $row=>$val){
			$arrs[$row]=$val;
		}
	}
}
/*课程的对应内容和时段*/
@$course_id=$_REQUEST['course_id'];
@$period=$_REQUEST['period'];
$str="";
/*进行筛选*/
if($course_id){
	$str="course_id=$course_id";
}else if($period==='0' || $period==true){
	$str="period LIKE '%$period/%' OR period LIKE '%/$period'";
}
if($str){
	$sql="SELECT course_id,title,period FROM music_course WHERE ".$str;
}else{
	$sql="SELECT course_id,title,period FROM music_course";
}
$result = mysqli_query($conn, $sql);
$arr=[];
$len=0;
if($result){
	$rows=mysqli_fetch_all($result,MYSQL_ASSOC);
	if($rows){
		foreach($rows as $row=>$val){
			foreach($val as $key=>$value){
				$arr[$key]=$value;
			}
			$arrs[$row]=$arr;
			$len++;
		}
		$arrs["length"]=$len;
	}
}
echo json_encode($arrs);
