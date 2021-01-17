<?php
	require_once "../../prepared/staffs.php";
	$prepared = new staffs;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$email = $details->email;
		$pass =  $details->password;
		$prepared->staffsignin($email, $pass);
	}
?>