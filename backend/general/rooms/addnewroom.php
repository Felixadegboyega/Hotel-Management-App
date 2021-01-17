<?php
	require_once "../../prepared/rooms.php";
	$prepared = new Rooms;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$room_type = $details->room_type;
		$room_price = $details->room_price;
		$no_of_rooms_available = $details->total_no_of_rooms;
		$total_no_of_rooms = $details->total_no_of_rooms;
		$prepared->NewRoom(array($room_type, $room_price, $no_of_rooms_available, $total_no_of_rooms));
	}
?>