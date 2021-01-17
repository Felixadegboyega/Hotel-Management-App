<?php
	require_once "../prepared/users.php";
	$prepared = new Users;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$fname = $details->first_name;
		$lname = $details->last_name;
		$pnumber = $details->phone_number;
		$email = $details->email;
		$pass = password_hash($details->password, PASSWORD_DEFAULT);
		$prepared->signup(array($fname, $lname, $pnumber, $email, $pass));
	}
?>