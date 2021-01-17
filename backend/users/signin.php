<?php
	require_once "../prepared/users.php";
	$prepared = new Users;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$email = $details->email;
		$pass =  $details->password;
		$prepared->signin($email, $pass);
	}
?>