<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->selectedTitle) && isset($postdata->selectedLocation)&& isset($postdata->selectedVisa)&& isset($postdata->userId) && isset($postdata->selectedType) && isset($postdata->selectedStatus) && isset($postdata->sortBy) && isset($postdata->searchText)){

		$selectedTitle = $postdata->selectedTitle;
		$selectedLocation = $postdata->selectedLocation;
		$selectedVisa = $postdata->selectedVisa;
		$selectedStatus = $postdata->selectedStatus;
		$selectedType = $postdata->selectedType;
		$searchText = $postdata->searchText;
		$sortBy = $postdata->sortBy;
		$userId = $postdata->userId; //userid is recruiterid

		if($sortBy=="jobid") {
			$orderByValue = 'jobid';
		}
		elseif ($sortBy == "date") {
			$orderByValue = 'posteddate';
		}

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		if($selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa" && $selectedType == "allTypes"){
			$sql = "select jobid,joblocation,jobtype,jobtitle,posteddate,visasponser,isactive from jobspostings where userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa" && $selectedType == "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where jobtitle = '$selectedTitle' and joblocation = '$selectedLocation' and visasponser = '$selectedVisa' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa" && $selectedType == "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where jobtitle = '$selectedTitle' and joblocation = '$selectedLocation' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa" && $selectedType == "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where jobtitle = '$selectedTitle' and visasponser = '$selectedVisa' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa" && $selectedType == "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where jobtitle = '$selectedTitle' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa" && $selectedType == "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where joblocation = '$selectedLocation' and visasponser = '$selectedVisa' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa" && $selectedType == "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where joblocation = '$selectedLocation' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa" && $selectedType == "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where visasponser = '$selectedVisa' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}

		else if($selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa" && $selectedType != "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where jobtype = '$selectedType' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa" && $selectedType != "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where jobtitle = '$selectedTitle' and joblocation = '$selectedLocation' and visasponser = '$selectedVisa' and jobtype = '$selectedType' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa" && $selectedType != "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where jobtitle = '$selectedTitle' and jobtype = '$selectedType' and joblocation = '$selectedLocation' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa" && $selectedType != "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where jobtitle = '$selectedTitle' and jobtype = '$selectedType' and visasponser = '$selectedVisa' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa" && $selectedType != "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where jobtitle = '$selectedTitle' and jobtype = '$selectedType' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa" && $selectedType != "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where joblocation = '$selectedLocation' and jobtype = '$selectedType' and visasponser = '$selectedVisa' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa" && $selectedType != "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where joblocation = '$selectedLocation' and jobtype = '$selectedType' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa" && $selectedType != "allTypes"){
			$sql = "select jobid,joblocation,jobtitle,jobtype,posteddate,visasponser,isactive from jobspostings where visasponser = '$selectedVisa' and jobtype = '$selectedType' and userid = $userId and isactive = $selectedStatus and jobtitle like '%$searchText%' ORDER BY $orderByValue";
		}
		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>