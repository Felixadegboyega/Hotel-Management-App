<?php
	require_once "../../prepared/manager.php";
	$prepared = new Manager;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$fname = $details->first_name;
		$lname = $details->last_name;
		$pnumber = $details->phone_number;
		$email = $details->email;
		$dob = $details->date_of_birth;
		$pass = password_hash($details->password, PASSWORD_DEFAULT);
		$prepared->managersignup(array($fname, $lname, $pnumber, $email, $dob, $pass));
	}
?>