<?php
	require_once "../../prepared/customercare.php";
	$prepared = new CustomerCare;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$type = $details->type;
		$careservice_note = $details->careservice_note;
		$user_id = '';
		$prepared->NewRequest(array($type, $careservice_note, $user_id));
	}
?>