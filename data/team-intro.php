<?php
/**师资团队成员介绍**/
header('Content-Type: application/json;charset=UTF-8');
require_once('init.php');
$tid=$_REQUEST['tid'];
$sql = "SELECT * FROM music_team WHERE team_id=$tid";
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
