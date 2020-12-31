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

		$sql = "select distinct p.jobid, p.joblocation, p.jobtitle, p.jobrequirements, p.posteddate, p.visasponser, a.jobstatus, uc.companyname from jobspostings p, usercompany uc, jobsapplied a where p.userid = uc.userid and p.jobid in (SELECT a1.jobid from jobsapplied a1 where a1.userid='$userId') ORDER BY p.jobid";

		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>