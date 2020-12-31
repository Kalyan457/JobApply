<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->userId)){
		$userId = $postdata->userId; //userid is candidate id

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		$sql = "select DISTINCT jp.jobid,uc.companyname,jp.jobtitle,jp.joblocation,jp.jobrequirements,jp.posteddate,jp.visasponser from jobspostings jp, usercompany uc where jp.userid = uc.userid and jp.jobid in (SELECT jobid from savedjobs WHERE userid='$userId') and jobid not in (SELECT jobid from jobsapplied where userid='$userId')";

		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>