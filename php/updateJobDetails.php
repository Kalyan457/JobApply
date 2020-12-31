<?php

    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $postdata = json_decode(file_get_contents("php://input"));

    if(isset($postdata->jobId) && isset($postdata->userId) && isset($postdata->jobTitle) && isset($postdata->jobType) && isset($postdata->jobDesc) &&isset($postdata->jobLocation) && isset($postdata->jobReq) && isset($postdata->latestDate) && isset($postdata->visa)) {

    	$jobId = $postdata->jobId;
    	$userId = $postdata->userId;
        $jobTitle = $postdata->jobTitle;
        $jobType = $postdata->jobType;
        $jobDesc = $postdata->jobDesc;
        $jobLocation = $postdata->jobLocation;
		$jobReq = $postdata->jobReq;
		$latestDate = $postdata->latestDate;
		$visa = $postdata->visa;

        $conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

        $sql = "UPDATE jobspostings set jobtitle='$jobTitle', jobtype='$jobType', jobdescription = '$jobDesc', joblocation = '$jobLocation', jobrequirements = '$jobReq', latestdate = '$latestDate', visasponser = '$visa' where jobid = $jobId and userid = $userId";
	    

	    $result = mysqli_query($conn,$sql);
	    
	    $json_array = array();
		if($result==false){
        	$json_array[] = "False";
        }
        else{
	        while($row = mysqli_fetch_assoc($result)){
				$json_array[] = $row;
			}
			$json_array = "True";
		}
		echo json_encode($json_array);
    }
?>