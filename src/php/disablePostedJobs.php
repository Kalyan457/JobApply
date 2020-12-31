<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->jobId) && isset($postdata->userId) && isset($postdata->jobStatus)) {

		$jobId = $postdata->jobId;
		$userId = $postdata->userId;
		if($postdata->jobStatus == 1){
			$jobStatus = 0;
		} else {
			$jobStatus = 1;
		}

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		$sql = "update jobspostings set isactive = $jobStatus where jobid = $jobId and userid = $userId";
		
		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>