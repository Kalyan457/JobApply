<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->phonenumber)&& isset($postdata->address)&& isset($postdata->university)&& isset($postdata->degree)&& isset($postdata->major)&& isset($postdata->startdateUniv)&& isset($postdata->enddateUniv)&& isset($postdata->companyWorkExName)&& isset($postdata->startdateWorkEx)&& isset($postdata->enddateWorkEx)&& isset($postdata->jobdescription)&& isset($postdata->gender)&& isset($postdata->hispaniclatino)&& isset($postdata->race)&& isset($postdata->veteran)&& isset($postdata->userid)&& isset($postdata->visa)&& isset($postdata->dob)&& isset($postdata->cgpa)){
        $userid=$postdata->userid;
		$veteran=$postdata->veteran;
		$visa=$postdata->visa;
		$gender=$postdata->gender;
        $hispaniclatino=$postdata->hispaniclatino;
        $race=$postdata->race;
		$phonenumber=$postdata->phonenumber;
        $address=$postdata->address;
		$dob=$postdata->dob;
		$university=$postdata->university;
        $degree=$postdata->degree;
        $cgpa=$postdata->cgpa;
        $major=$postdata->major;
        $attendedfrom=$postdata->startdateUniv;
        $graduationdate=$postdata->enddateUniv;
        $companyWorkExName=$postdata->companyWorkExName;
        $startdateWorkEx=$postdata->startdateWorkEx;
        $enddateWorkEx=$postdata->enddateWorkEx;
        $jobdescription=$postdata->jobdescription;

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		$sql = "select * from commoninfo where userid = '$userid'";
		$result = mysqli_query($conn,$sql);
		echo $sql;
		if($result->num_rows>0){
			$sql = "update commoninfo
					set protectedveteran='$veteran',
						requirevisa='$visa',
						hispaniclatino='$hispaniclatino',
						race='$race',
						gender='$gender',
						phone='$phonenumber',
						address='$address',
						dob='$dob'
					where userid='$userid'";
			$result = mysqli_query($conn,$sql);
			echo "update";

			$sql = "update academics
					set degreetype='$degree',
						university='$university',
						major='$major',
						cgpa='$cgpa',
						attendedfrom='$attendedfrom',
						graduationdate='$graduationdate'
					where userid = '$userid'";
			$result = mysqli_query($conn,$sql);

			$sql = "update workexperience
					set workexcompanyname='$companyWorkExName',
						workexdescription='$jobdescription',
						workedfrom='$startdateWorkEx',
						workedto='$enddateWorkEx'
					where userid = '$userid'";
			$result = mysqli_query($conn,$sql);
        }
        else{
        	$sql = "insert into commoninfo (userid,protectedveteran,requirevisa,hispaniclatino,race,gender,phone,address,dob)
					values ('$userid','$veteran','$visa','$hispaniclatino','$race','$gender','$phonenumber','$address','$dob')";
			$result = mysqli_query($conn,$sql);
			echo $sql;
			$sql = "insert into academics (userid,degreetype,university,major,cgpa,attendedfrom,graduationdate)
					values ('$userid','$degree','$university','$major','$cgpa','$attendedfrom','$graduationdate')";
			$result = mysqli_query($conn,$sql);
			echo $sql;
			$sql = "insert into workexperience (userid,workexcompanyname,workexdescription,workedfrom,workedto)
					values ('$userid','$companyWorkExName','$jobdescription','$startdateWorkEx','$enddateWorkEx')";
			$result = mysqli_query($conn,$sql);
			echo $sql;
        }
	}

?>