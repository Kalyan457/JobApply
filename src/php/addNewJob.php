<?php

    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $postdata = json_decode(file_get_contents("php://input"));

    if(isset($postdata->userId) && isset($postdata->jobTitle) && isset($postdata->jobType) && isset($postdata->jobDesc) &&isset($postdata->jobLocation) && isset($postdata->jobReq) && isset($postdata->postedDate) && isset($postdata->latestDate) && isset($postdata->isActive) && isset($postdata->visa)) {

    	$userId = $postdata->userId;
        $jobTitle = $postdata->jobTitle;
        $jobType = $postdata->jobType;
        $jobDesc = $postdata->jobDesc;
        $jobLocation = $postdata->jobLocation;
		$jobReq = $postdata->jobReq;
		$postedDate = $postdata->postedDate;
		$latestDate = $postdata->latestDate;
		$isActive = $postdata->isActive;
		$visa = $postdata->visa;

		$json_array = array();

        $conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

        $sql = "INSERT INTO jobspostings(userid,jobtitle,jobtype,jobdescription,joblocation,jobrequirements,posteddate,latestdate,isactive,visasponser) VALUES ('$userId', '$jobTitle', '$jobType', '$jobDesc', '$jobLocation', '$jobReq', '$postedDate', '$latestDate', '$isActive', '$visa')";
	    

	    $result = mysqli_query($conn,$sql);
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