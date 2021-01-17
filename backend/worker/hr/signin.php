<?php
	require_once "../../prepared/hr.php";
	$prepared = new HR;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$email = $details->email;
		$pass =  $details->password;
		$prepared->hrsignin($email, $pass);
	}
?>