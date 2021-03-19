<?php
	include_once "../prepared/header.php";
	class Bookings Extends Header
	{
		function __construct()
		{
			parent::__construct('../vendor/autoload.php');
			$this->getBookings();
			
		}
	}
	$send = new Bookings;

?>