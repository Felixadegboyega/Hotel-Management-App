<?php
	require_once "../../prepared/cleaningservice.php";
	$prepared = new CleaningService;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$parts = $details->parts;
		$service_note = $details->service_note;
		$user_id = '';
		$prepared->NewRequest(array($parts, $service_note, $user_id));
	}
?>