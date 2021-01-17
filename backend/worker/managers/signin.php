<?php
	require_once "../../prepared/manager.php";
	$prepared = new Manager;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$email = $details->email;
		$pass =  $details->password;
		$prepared->managersignin($email, $pass);
	}
?>