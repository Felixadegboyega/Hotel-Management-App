<?php
	require_once "../../prepared/customercare.php";
	$prepared = new CustomerCare;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$prepared->AttendTo($details->careservice_id);
	}
?>