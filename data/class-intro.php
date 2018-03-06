<?php
/**课程内容**/
header('Content-Type: application/json;charset=UTF-8');
require_once('init.php');
$cid=$_REQUEST['cid'];
$sql = "SELECT * FROM music_course WHERE course_id=$cid";
$result = mysqli_query($conn, $sql);
$arr=[];
if($result){
	$rows=mysqli_fetch_assoc($result);
	if($rows){
		foreach($rows as $row=>$val){
			$arr[$row]=$val;
		}
		echo json_encode($arr);
	}
}
