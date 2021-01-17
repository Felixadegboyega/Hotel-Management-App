<?php
	require_once "../prepared/main_admin.php";
	$prepared = new MainAdmin;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$email = $details->email;
		$pass =  $details->password;
		$prepared->adminsignin($email, $pass);
	}
?>