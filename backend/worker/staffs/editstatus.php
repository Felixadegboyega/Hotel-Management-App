<?php
	require_once "../../prepared/staffs.php";
	$prepared = new Staffs;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$prepared->EditStatus($details->staff_id);
	}
?>