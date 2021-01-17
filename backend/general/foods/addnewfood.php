<?php
	require_once "../../prepared/foods.php";
	$prepared = new Foods;
	$details = JSON_decode(file_get_contents("php://input"));
	if(isset($details) && !empty($details) ){
		$food_name = $details->food_name;
		$available_from = $details->from;
		$available_to =$details->to;
		echo(JSON_encode($details));
		$prepared->NewFood(array($food_name, $available_from, $available_to));
	}
?>