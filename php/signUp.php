<?php

    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $postdata = json_decode(file_get_contents("php://input"));

    if(isset($postdata->firstname) && isset($postdata->lastname) && isset($postdata->email) && isset($postdata->password) && isset($postdata->isHR)){

    	$firstname = $postdata->firstname;
        $lastname = $postdata->lastname;
        $email = $postdata->email;
        $password = $postdata->password;
        $isHR = $postdata->isHR;
		$companyname = $postdata->companyname;
		$companylocation = $postdata->companylocation;

		$password = password_hash($password, PASSWORD_DEFAULT);
		
		$json_array = array();

        $conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

        $sql = "select userId,firstname,lastname,emailid,isHR from userinfo where emailid = '$email'";
        $result = mysqli_query($conn,$sql);

        if($result->num_rows>0){
        	$json_array[] = "False";
        }
        else{
        	$userid='';
	        $sql = "insert into userinfo (firstname,lastname,isHR,emailid,password) values('$firstname','$lastname','$isHR','$email','$password')";
	        $result = mysqli_query($conn,$sql);

	        if($isHR==1){
				$sql = "select userId from userinfo where emailid = '$email'";
				$result = mysqli_query($conn,$sql);
				while ($row = mysqli_fetch_array($result)) {
					$userid = $row[0];
				}
				$sql = "insert into usercompany (userid,companyname,location) values('$userid','$companyname','$companylocation')";
				$result = mysqli_query($conn,$sql);
	        }


	       	$sql = "select userId, firstname, lastname, emailid, isHR from userinfo where emailid = '$email'";
	       	$result = mysqli_query($conn,$sql);
			while($row = mysqli_fetch_assoc($result)){
				$json_array[] = $row;
			}
			$json_array[] = "True";
		}
		echo json_encode($json_array);
    }
?>