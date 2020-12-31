<?php

    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: POST");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $postdata = json_decode(file_get_contents("php://input"));

    if(isset($postdata->userId) && isset($postdata->postedDate)) {

    	$userId = $postdata->userId;
    	$orderDate = $postdata->postedDate;

		$json_array = array();

        $conn = mysqli_connect('localhost:8889', 'root', 'root', 'jobapply');

        $sql = "INSERT INTO orders(userid,orderdate,jobid) VALUES ('$userId', '$orderDate', (select max(jobid) as jobid from jobspostings where userid = $userId GROUP BY userid))";
	    

	    $result = mysqli_query($conn,$sql);
		if($result==false){
        	$json_array[] = "False";
        }
        else{
	        while($row = mysqli_fetch_assoc($result)){
				$json_array[] = $row;
			}
			$json_array = "True";
		}
		echo json_encode($json_array);
    }
?>