<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->jobId)) {
		$jobId = $postdata->jobId;

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		$sql = "select jobid, jobtitle, jobtype, jobdescription, joblocation, jobrequirements, posteddate, latestdate, isactive, visasponser from jobspostings where jobid = $jobId";
		
		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>