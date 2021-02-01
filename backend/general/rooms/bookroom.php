<?php
	require_once "../../prepared/rooms.php";
	$prepared = new Rooms;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$rand = rand();
		$prepared->BookRoom($details, $rand);
	}
?>