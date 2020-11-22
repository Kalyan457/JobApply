<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->userId) && isset($postdata->jobId)){
		$userId = $postdata->userId;
		$jobId = $postdata->jobId;

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		$sql = "delete from savedjobs where userId ='$userId' and jobId = '$jobId'";

		$result = mysqli_query($conn,$sql);

		echo $sql;
	}
?>