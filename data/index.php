<?php
/**课程内容**/
header('Content-Type: application/json;charset=UTF-8');
require_once('init.php');
$sql = "SELECT * FROM music_carousel";
$result = mysqli_query($conn, $sql);
$arr=[];
$arrs=[];
if($result){
	$rows=mysqli_fetch_all($result,MYSQL_ASSOC);
	if($rows){
		foreach($rows as $row=>$val){
			foreach($val as $key=>$value){
				$arr[$key]=$value;
			}
			$arrs[$row]=$arr;
		}
		echo json_encode($arrs);
	}
}
