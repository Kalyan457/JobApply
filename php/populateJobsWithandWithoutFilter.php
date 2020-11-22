<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->selectedCompany) && isset($postdata->selectedTitle) && isset($postdata->selectedLocation)&& isset($postdata->selectedVisa)&& isset($postdata->userId)){
		$selectedCompany = $postdata->selectedCompany;
		$selectedTitle = $postdata->selectedTitle;
		$selectedLocation = $postdata->selectedLocation;
		$selectedVisa = $postdata->selectedVisa;
		$userId = $postdata->userId;

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		if($selectedCompany == "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobcompany = '$selectedCompany' and jobtitle = '$selectedTitle' and joblocation = '$selectedLocation' and jobvisa = '$selectedVisa' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobcompany = '$selectedCompany' and jobtitle = '$selectedTitle' and joblocation = '$selectedLocation' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobcompany = '$selectedCompany' and jobtitle = '$selectedTitle' and jobvisa = '$selectedVisa' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobcompany = '$selectedCompany' and jobtitle = '$selectedTitle' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobcompany = '$selectedCompany' and joblocation = '$selectedLocation' and jobvisa = '$selectedVisa' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobcompany = '$selectedCompany' and joblocation = '$selectedLocation' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobcompany = '$selectedCompany' and jobvisa = '$selectedVisa' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobcompany = '$selectedCompany' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobtitle = '$selectedTitle' and joblocation = '$selectedLocation' and jobvisa = '$selectedVisa' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobtitle = '$selectedTitle' and joblocation = '$selectedLocation' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobtitle = '$selectedTitle' and jobvisa = '$selectedVisa' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobtitle = '$selectedTitle' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where joblocation = '$selectedLocation' and jobvisa = '$selectedVisa' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where joblocation = '$selectedLocation' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jobId,jobCompany,jobLocation,jobTitle,jobRequirements,jobVisa from jobspostings where jobvisa = '$selectedVisa' and jobId not in (select jobId from jobsapplied where userId = '$userId')";
		}

		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>