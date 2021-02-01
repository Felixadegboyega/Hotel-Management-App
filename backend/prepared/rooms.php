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
		
		
		public function BookRoom($details, $rand){
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			if($decodedinfo->for = 'user'){
				$count = count($details);
				$queryuser = "SELECT user_id, room_id from users where email = ?";
				$userbinder = array('s', $decodedinfo->email);
				$getuser = $this->Query($queryuser, $userbinder)->fetch_assoc();
				if($getuser){
					for ($i = 0; $i < $count; $i++) {
						$check_in_date = $details[$i]->check_in_date;
						$check_out_date = $details[$i]->check_out_date;
						$room_id = $details[$i]->room->room_id;
						$booked_room_price = "";
						$bookingInfo = array($check_in_date, $check_out_date, $room_id, $booked_room_price, $rand);
						// $prepared->BookRoom($bookingInfo);
						$queryvisit = "INSERT into visits (visit_id, user_id) VALUES (?, ?)";
						$bindvisit = array("ss", $rand, $getuser['user_id']);
						$this->Query($queryvisit, $bindvisit);
						$querybooked = "INSERT into booked_rooms (check_in_date, check_out_date, room_id, booked_room_price, visit_id) VALUES (?, ?, ?, ?, ?)";
						$bindbook = array("sssss", ...$bookingInfo);
						$this->Query($querybooked, $bindbook);
					}
				}
			}
			echo JSON_encode($this->response);
		}
	}
	// ALTER TABLE `booked_rooms` ADD CONSTRAINT `visit_fk` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
?>