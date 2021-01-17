<?php
	include_once "header.php";
	class Units Extends Header 
	
	{
		function __construct()
		{
			parent::__construct('../../vendor/autoload.php');
		}


		public function allUnits(){
			$this->connection();
			$queryunit = "SELECT * from units";
			$units= $this->Query($queryunit, null)->fetch_all(MYSQLI_ASSOC);
			$this->response["units"] = $units;
			echo JSON_encode($this->response);
		}
	}
?>