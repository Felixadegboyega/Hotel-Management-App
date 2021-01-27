<?php
	include_once "../prepared/header.php";
	class AdminAuth Extends Header
	{
		function __construct()
		{
			parent::__construct('../vendor/autoload.php');
			$this->AdminAuth();
			
		}
	}
	$send = new AdminAuth;

?>