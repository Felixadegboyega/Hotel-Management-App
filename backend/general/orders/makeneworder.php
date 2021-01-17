<?php
	require_once "../../prepared/orders.php";
	$prepared = new Orders;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$order_note = $details->order_note;
		$qty = $details->qty;
		$user_id = '';
		$food_id = $details->food_id;
		$prepared->NewOrder(array($order_note, $qty, $user_id, $food_id));
	}
?>