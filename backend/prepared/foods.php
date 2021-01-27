<?php
	include_once "header.php";
	class Foods Extends Header 
	{
		function __construct()
		{
			parent::__construct('../../vendor/autoload.php');
		}
		
		public function NewFood($details)
		{
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			if($decodedinfo->for == 'staff'){
				$querystaff = "SELECT stage, status, unit_name from staffs join units using(unit_id) WHERE email = ?";
				$staffbinder = array('s', 'ade@gmail.com');
				$staffM = $this->Query($querystaff, $staffbinder)->fetch_assoc();
				if($staffM['status'] == 'current' && $staffM['stage'] == 'manager'){
					$this->response["access"]=true;
					$querydb = "INSERT into foods (food_name, available_from, available_to, food_picture) VALUES (?, ?, ?, ?)";
					$binder = array('ssss', ...$details);
					$this->Query($querydb, $binder);
				} else{
					$this->response["access"]=false;
				}
			} else {
				$this->response["access"]=false;
			}
			echo JSON_encode($this->response);

		}

		
		public function allFoods(){
			$this->connection();
			$queryfood = "SELECT * from foods";
			$foods= $this->Query($queryfood, null)->fetch_all(MYSQLI_ASSOC);
			$this->response["foods"] = $foods;
			echo JSON_encode($this->response);
		}
			
		// public function editDetails($fname, $lname, $pnumber, $email, $profile_picture)
		// {
		// 	$this->connection();
		// 	$querydb = "UPDATE users set first_name = ?, last_name = ?, phone_number = ?, email = ?, profile_picture = ?";
		// 	$binder = array('sssss', $fname, $lname, $pnumber, $email, $profile_picture);
		// 	$this->Query($querydb, $binder);
		// 	echo JSON_encode($this->response);
		// }

		
		public function addBookedRooms(){
			$this->connection();
			// $header = $this->getHeaders();
			// $querydb = "UPDATE booked_rooms set room_id = ? WHERE email = $header";
			$binder = array('s', $room_id);
			$this->Query($querydb, $binder);
			echo JSON_encode($this->response);
		}
	}
?>