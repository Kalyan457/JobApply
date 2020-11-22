<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->selectedTitle) && isset($postdata->selectedLocation)&& isset($postdata->selectedVisa)&& isset($postdata->userId)){
		$selectedTitle = $postdata->selectedTitle;
		$selectedLocation = $postdata->selectedLocation;
		$selectedVisa = $postdata->selectedVisa;
		$userId = $postdata->userId;

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		if($selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobLocation,jobTitle,jobRequirements,jobVisa,isActive from jobspostings where userId = '$userId'";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobLocation,jobTitle,jobRequirements,jobVisa,isActive from jobspostings where jobtitle = '$selectedTitle' and joblocation = '$selectedLocation' and jobvisa = '$selectedVisa' and userId = '$userId'";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobLocation,jobTitle,jobRequirements,jobVisa,isActive from jobspostings where jobtitle = '$selectedTitle' and joblocation = '$selectedLocation' and userId = '$userId'";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobLocation,jobTitle,jobRequirements,jobVisa,isActive from jobspostings where jobtitle = '$selectedTitle' and jobvisa = '$selectedVisa' and userId = '$userId'";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobLocation,jobTitle,jobRequirements,jobVisa,isActive from jobspostings where jobtitle = '$selectedTitle' and userId = '$userId'";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobLocation,jobTitle,jobRequirements,jobVisa,isActive from jobspostings where joblocation = '$selectedLocation' and jobvisa = '$selectedVisa' and userId = '$userId')";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobLocation,jobTitle,jobRequirements,jobVisa,isActive from jobspostings where joblocation = '$selectedLocation' and userId = '$userId')";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobLocation,jobTitle,jobRequirements,jobVisa,isActive from jobspostings where jobvisa = '$selectedVisa' and userId = '$userId')";
		}

		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>