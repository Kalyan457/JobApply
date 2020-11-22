<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->userId)){
		$userId = $postdata->userId;

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');
		$sql = "select distinct p.jobId,p.jobCompany,p.jobLocation,p.jobTitle,p.jobRequirements,p.jobVisa,a.jobStatus from jobspostings p,jobsapplied a where p.jobId in (select jobId from jobsapplied where userId = '$userId')";
		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>