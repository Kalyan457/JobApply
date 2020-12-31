<?php

    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $postdata = json_decode(file_get_contents("php://input"));

    if(isset($postdata->email) && isset($postdata->password)){

        $email = $postdata->email;
        $password = $postdata->password;
		
        $json_array = array();

        $conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

        $sql = "select userid, firstname, lastname, emailid, isHR from userinfo where emailid = '$email' and password = '$password'";
        $result = mysqli_query($conn,$sql);
        if($result->num_rows==0){
        	$json_array[] = "False";
        }
        else{
	        while($row = mysqli_fetch_assoc($result)){
				$json_array[] = $row;
			}
			$json_array[] = "True";
		}
		echo json_encode($json_array);
    }
?>