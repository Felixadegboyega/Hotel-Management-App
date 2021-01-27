<?php
	require_once "../prepared/users.php";
	$prepared = new Users;
	if(isset($_FILES) && !empty($_FILES) ){
		$na = pathinfo($_FILES["profile_picture"]["name"], PATHINFO_EXTENSION);
		$randim = rand(10,10000);
		$profile_picture_name = 'userprofile'.$randim.".".$na;
		$profile_picture_tmp_name = $_FILES["profile_picture"]["tmp_name"];
		$prepared->UploadProfilePicture($profile_picture_name);
		move_uploaded_file($profile_picture_tmp_name, "../uploads/images/profile/".$profile_picture_name);
	}
?>