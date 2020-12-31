<?php

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$postdata = json_decode(file_get_contents("php://input"));

	if(isset($postdata->userid)){

        $userid=$postdata->userid;

		$conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

		$sql = "select * from commoninfo where userid = '$userid'";
		$result = mysqli_query($conn,$sql);

		$json_array = array();

		if($result->num_rows>0){
			$sql = "select distinct phone,address,university,degreetype,major,attendedfrom,graduationdate,workexcompanyname,
					workedfrom,workedto,workexdescription,gender,hispaniclatino,race,protectedveteran,requirevisa,cgpa,dob
					from commoninfo c, academics a, workexperience w where c.userid=a.userid and c.userid=w.userid and c.userid = '$userid'";
			$result = mysqli_query($conn,$sql);
			while($row = mysqli_fetch_assoc($result)){
				$json_array[] = $row;
			}
        }
        else{
			$json_array[] = "Empty";
        }
		echo json_encode($json_array);
	}

?>