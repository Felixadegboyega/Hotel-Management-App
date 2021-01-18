<?php
	require_once "../../prepared/cleaningservice.php";
	$prepared = new CleaningService;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$prepared->AttendTo($details->service_id);
	}
?>