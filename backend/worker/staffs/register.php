<?php
	require_once "../../prepared/staffs.php";
	$prepared = new Staffs;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$fname = $details->first_name;
		$lname = $details->last_name;
		$pnumber = $details->phone_number;
		$email = $details->email;
		$dob = $details->date_of_birth;
		$unit = $details->unit;
		$pass = password_hash($details->password, PASSWORD_DEFAULT);
		$prepared->staffsignup(array($fname, $lname, $pnumber, $email, $dob, $unit, $pass));
	}
?>