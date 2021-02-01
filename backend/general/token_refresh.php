<?php
	include_once "../prepared/header.php";
	class TokenRefresh Extends Header
	{
		function __construct()
		{
			parent::__construct('../vendor/autoload.php');
			$this->TokenRefresh();
			
		}
	}
	$send = new TokenRefresh;

?>