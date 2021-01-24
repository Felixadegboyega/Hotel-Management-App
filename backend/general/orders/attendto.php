<?php
	require_once "../../prepared/orders.php";
	$prepared = new Orders;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){	
		$prepared->AttendTo($details->order_id);
	}
?>