<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->userId)) {
		$userId = $postdata->userId; //userid is candidate id

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		$sql = "select u.firstname, u.lastname, u.emailid, c.dob, c.address, c.phone, c.gender, c.race, c.requirevisa, c.protectedveteran, c.hispaniclatino from userinfo as u INNER JOIN commoninfo as c ON u.userid = c.userid where u.userid = $userId";
		
		$result = mysqli_query($conn,$sql);
		$json_array = array();
		while($row = mysqli_fetch_assoc($result)){
			$json_array[] = $row;
		}
		echo json_encode($json_array);
	}
?>