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
		$searchText = $postdata->searchText;
		$userId = $postdata->userId; //userid is candidate id

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		if($selectedCompany == "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where jp.jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where uc.companyname = '$selectedCompany' and jp.jobtitle = '$selectedTitle' and jp.joblocation = '$selectedLocation' and jp.visasponser = '$selectedVisa' and jp.jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where uc.companyname = '$selectedCompany' and jp.jobtitle = '$selectedTitle' and jp.joblocation = '$selectedLocation' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where uc.companyname = '$selectedCompany' and jp.jobtitle = '$selectedTitle' and jp.visasponser = '$selectedVisa' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where uc.companyname = '$selectedCompany' and jp.jobtitle = '$selectedTitle' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where uc.companyname = '$selectedCompany' and jp.joblocation = '$selectedLocation' and jp.visasponser = '$selectedVisa' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where uc.companyname = '$selectedCompany' and jp.joblocation = '$selectedLocation' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where uc.companyname = '$selectedCompany' and jp.visasponser = '$selectedVisa' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany != "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where uc.companyname = '$selectedCompany' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where jp.jobtitle = '$selectedTitle' and jp.joblocation = '$selectedLocation' and jp.visasponser = '$selectedVisa' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where jp.jobtitle = '$selectedTitle' and jp.joblocation = '$selectedLocation' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where jp.jobtitle = '$selectedTitle' and jp.visasponser = '$selectedVisa' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle != "allTitles" && $selectedLocation == "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where jp.jobtitle = '$selectedTitle' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where jp.joblocation = '$selectedLocation' and jp.visasponser = '$selectedVisa' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation != "allLocations" && $selectedVisa == "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where jp.joblocation = '$selectedLocation' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		else if($selectedCompany == "allCompanies" && $selectedTitle == "allTitles" && $selectedLocation == "allLocations" && $selectedVisa != "allVisa"){
			$sql = "select jp.jobid, uc.companyname, jp.joblocation, jp.jobtitle,jp.jobrequirements, jp.posteddate,jp.visasponser from jobspostings as jp INNER JOIN usercompany as uc ON jp.userid=uc.userid where jp.visasponser = '$selectedVisa' and jobid not in (select jobid from jobsapplied where userid = '$userId')";
		}
		$text = "and jobTitle like '%$searchText%' and jp.isactive = 1";
		$sql = $sql.$text;
		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>