<?php
	require_once "../prepared/users.php";
	$prepared = new Users;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$fname = $details->first_name;
		$lname = $details->last_name;
		$pnumber = $details->phone_number;
		$email = $details->email;
		$profile_picture = $details->email;
		$prepared->editDetails($fname, $lname, $pnumber, $email, $profile_picture);
	}
?>