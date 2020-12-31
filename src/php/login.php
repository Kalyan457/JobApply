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

        $sql = "select userId,firstname,lastname,emailid,isHR,password from userinfo where emailid = '$email'";
        $result = mysqli_query($conn,$sql);

        if($result->num_rows==0){
            $json_array[] = "False";
        }
        else{
            while ($row = mysqli_fetch_array($result)) {
                $passwordReturned = $row['password'];
                $sentToFront = $row;
            }
            if(password_verify($password, $passwordReturned)) {
                $json_array[] = $sentToFront;
                $json_array[] = "True";
            }
            else{
                $json_array[] = "False";
            }
        }
        echo json_encode($json_array);
    }
?>