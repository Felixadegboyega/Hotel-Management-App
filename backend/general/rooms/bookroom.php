<?php
	require_once "../../prepared/rooms.php";
	$prepared = new Rooms;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$check_in_date = $details->check_in_date;
		$check_out_date = $details->check_out_date;
		$room_id = $details->room_id;
		$user_id = "";
		$booked_room_price = "";
		$prepared->BookRoom(array($check_in_date, $check_out_date, $room_id, $user_id, $booked_room_price));
		// echo(JSON_encode($details));
	}
?>