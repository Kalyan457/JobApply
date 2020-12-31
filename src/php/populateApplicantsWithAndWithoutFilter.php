<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->selectedTitle) && isset($postdata->selectedLocation) && isset($postdata->selectedVisa) && isset($postdata->selectedStatus) && isset($postdata->userId) && isset($postdata->sortBy))
	{
		$selectedTitle = $postdata->selectedTitle;
		$selectedLocation = $postdata->selectedLocation;
		$selectedVisa = $postdata->selectedVisa;
		$selectedStatus = $postdata->selectedStatus;
		$sortBy = $postdata->sortBy;
		$userId = $postdata->userId; //userid is recruiter id

		if($sortBy=="name") {
			$orderByValue = 'u.firstname, u.lastname';
		}
		elseif ($sortBy == "jobid") {
			$orderByValue = 'jp.jobid';
		}
		elseif ($sortBy == "date") {
			$orderByValue = 'ja.applieddate';
		}

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		if($selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select distinct u.userid as 'applicantid', u.firstname, u.lastname, c.requirevisa, ja.applieddate, ja.jobstatus, jp.jobid, jp.jobtitle, jp.joblocation from userinfo as u INNER JOIN commoninfo as c on u.userid = c.userid INNER JOIN jobsapplied as ja on ja.userid=u.userid INNER JOIN jobspostings as jp on jp.jobid=ja.jobid where ja.jobstatus='$selectedStatus' and jp.userid=$userId ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select distinct u.userid as 'applicantid', u.firstname, u.lastname, c.requirevisa, ja.applieddate, ja.jobstatus, jp.jobid, jp.jobtitle, jp.joblocation from userinfo as u INNER JOIN commoninfo as c on u.userid = c.userid INNER JOIN jobsapplied as ja on ja.userid=u.userid INNER JOIN jobspostings as jp on jp.jobid=ja.jobid where jp.jobtitle = '$selectedTitle' and jp.joblocation = '$selectedLocation' and c.requirevisa = '$selectedVisa' and ja.jobstatus='$selectedStatus' and jp.userid=$userId ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select distinct u.userid as 'applicantid', u.firstname, u.lastname, c.requirevisa, ja.applieddate, ja.jobstatus, jp.jobid, jp.jobtitle, jp.joblocation from userinfo as u INNER JOIN commoninfo as c on u.userid = c.userid INNER JOIN jobsapplied as ja on ja.userid=u.userid INNER JOIN jobspostings as jp on jp.jobid=ja.jobid where jp.jobtitle = '$selectedTitle' and jp.joblocation = '$selectedLocation' and ja.jobstatus='$selectedStatus' and jp.userid=$userId ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select distinct u.userid as 'applicantid', u.firstname, u.lastname, c.requirevisa, ja.applieddate, ja.jobstatus, jp.jobid, jp.jobtitle, jp.joblocation from userinfo as u INNER JOIN commoninfo as c on u.userid = c.userid INNER JOIN jobsapplied as ja on ja.userid=u.userid INNER JOIN jobspostings as jp on jp.jobid=ja.jobid where jp.jobtitle = '$selectedTitle' and c.requirevisa = '$selectedVisa' and ja.jobstatus='$selectedStatus' and jp.userid=$userId ORDER BY $orderByValue";
		}
		else if($selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select distinct u.userid as 'applicantid', u.firstname, u.lastname, c.requirevisa, ja.applieddate, ja.jobstatus, jp.jobid, jp.jobtitle, jp.joblocation from userinfo as u INNER JOIN commoninfo as c on u.userid = c.userid INNER JOIN jobsapplied as ja on ja.userid=u.userid INNER JOIN jobspostings as jp on jp.jobid=ja.jobid where jp.jobtitle = '$selectedTitle' and ja.jobstatus='$selectedStatus' and jp.userid=$userId ORDER BY $orderByValue";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select distinct u.userid as 'applicantid', u.firstname, u.lastname, c.requirevisa, ja.applieddate, ja.jobstatus, jp.jobid, jp.jobtitle, jp.joblocation from userinfo as u INNER JOIN commoninfo as c on u.userid = c.userid INNER JOIN jobsapplied as ja on ja.userid=u.userid INNER JOIN jobspostings as jp on jp.jobid=ja.jobid where jp.joblocation = '$selectedLocation' and c.requirevisa = '$selectedVisa' and ja.jobstatus='$selectedStatus' and jp.userid=$userId ORDER BY $orderByValue";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select distinct u.userid as 'applicantid', u.firstname, u.lastname, c.requirevisa, ja.applieddate, ja.jobstatus, jp.jobid, jp.jobtitle, jp.joblocation from userinfo as u INNER JOIN commoninfo as c on u.userid = c.userid INNER JOIN jobsapplied as ja on ja.userid=u.userid INNER JOIN jobspostings as jp on jp.jobid=ja.jobid where jp.joblocation = '$selectedLocation' and ja.jobstatus='$selectedStatus' and jp.userid=$userId ORDER BY $orderByValue";
		}
		else if($selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select distinct u.userid as 'applicantid', u.firstname, u.lastname, c.requirevisa, ja.applieddate, ja.jobstatus, jp.jobid, jp.jobtitle, jp.joblocation from userinfo as u INNER JOIN commoninfo as c on u.userid = c.userid INNER JOIN jobsapplied as ja on ja.userid=u.userid INNER JOIN jobspostings as jp on jp.jobid=ja.jobid where c.requirevisa = '$selectedVisa' and ja.jobstatus='$selectedStatus' and jp.userid=$userId ORDER BY $orderByValue";
		}

		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>