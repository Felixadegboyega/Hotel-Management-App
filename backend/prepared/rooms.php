<?php
	include_once "header.php";
	class Rooms Extends Header 
	{
		function __construct()
		{
			parent::__construct('../../vendor/autoload.php');
		}
		
		public function NewRoom($details)
		{
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			if($decodedinfo->for == 'manager'){
				$this->response["for"] = 'manager';
				$this->response["verify"]=true;
				$querydb = "INSERT into rooms (room_type, room_price, no_of_rooms_available, total_no_of_rooms, room_picture) VALUES (?, ?, ?, ?, ?)";
				$binder = array('sssss', ...$details);
				$this->Query($querydb, $binder);
			} else{
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);

		}

		
		public function allRooms(){
			$this->connection();
			$queryroom = "SELECT * from rooms";
			$rooms= $this->Query($queryroom, null)->fetch_all(MYSQLI_ASSOC);
			$this->response["rooms"] = $rooms;
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

		
		public function BookRoom($details){
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			if($decodedinfo->for = 'user'){
				$queryuser = "SELECT user_id, room_id from users where email = ?";
				$userbinder = array('s', $decodedinfo->email);
				$getuser = $this->Query($queryuser, $userbinder)->fetch_assoc();
				if($getuser){
					$details[3] = $getuser['user_id'] ;
					$querybooked = "INSERT into booked_rooms (check_in_date, check_out_date, room_id, user_id, booked_room_price) VALUES (?, ?, ?, ?, ?)";
					$bindbook = array("sssss", ...$details);
					$this->Query($querybooked, $bindbook);
					
					$queryuser = "UPDATE users set room_id = ? WHERE user_id = ?";
					$userbinder = array('ss', $details[2], $details[3]);
					$this->Query($queryuser, $userbinder);
				}
			}
			echo JSON_encode($this->response);
		}
	}
?>