<?php
	require_once "../prepared/main_admin.php";
	$prepared = new MainAdmin;
	if(isset($_FILES) && !empty($_FILES) ){
		$na = pathinfo($_FILES["profile_picture"]["name"], PATHINFO_EXTENSION);
		$randim = rand(10,10000);
		$profile_picture_name = 'adminprofile'.$randim.".".$na;
		$profile_picture_tmp_name = $_FILES["profile_picture"]["tmp_name"];
		$prepared->UploadProfilePicture($profile_picture_name);
		move_uploaded_file($profile_picture_tmp_name, "../uploads/images/profile/".$profile_picture_name);
	}
?>