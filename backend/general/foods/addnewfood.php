<?php
	require_once "../../prepared/foods.php";
	$prepared = new Foods;
	// $_POST = JSON_decode(file_get_contents("php://input"));
	if(isset($_POST) && !empty($_POST) ){
		$food_name = $_POST['food_name'];
		$available_from = $_POST['from'];
		$available_to =$_POST['to'];
		$na = pathinfo($_FILES["food_picture"]["name"], PATHINFO_EXTENSION);
		$randim = rand(10,10000);
		$food_pics_name = 'food'.$randim.".".$na;
		$food_pics_tmp_name = $_FILES["food_picture"]["tmp_name"];
		// echo(JSON_encode($_POST));
		$prepared->NewFood(array($food_name, $available_from, $available_to, $food_pics_name));
		move_uploaded_file($food_pics_tmp_name, "../../uploads/images/foods/".$food_pics_name);
	}
?>