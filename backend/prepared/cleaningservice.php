<?php
	include_once "header.php";
	class CleaningService Extends Header 
	{
		function __construct()
		{
			parent::__construct('../../vendor/autoload.php');
		}
		public function NewRequest($details)
		{
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			if($decodedinfo->for == 'user'){
				$queryUser = 'SELECT user_id, email from users WHERE email = ?';
				$userbinder = array('s', $decodedinfo->email);
				$user = $this->Query($queryUser, $userbinder)->fetch_assoc();
				if($user){
					$queryBookedRooms = 'SELECT * from booked_rooms join visits using(visit_id) WHERE user_id = ?';
					$BookedRoomsBinder = array('s', $user['user_id']);
					$booked = $this->Query($queryBookedRooms, $BookedRoomsBinder)->fetch_assoc();
					if($booked){
						$this->response["verify_room"] = true;
						$details[2] = $user['user_id'];
						$queryservice = "INSERT into cleaning_services (parts, service_note, user_id) VALUES (?, ?, ?)";
						$servicebinder = array('sss', ...$details);
						$this->Query($queryservice, $servicebinder);
						$this->response['request_status']=true;
					} else{
						$this->response["verify_room"] = false;
					}
				}
			} else {
				$this->response["verify_online"] = false;
			}
			echo JSON_encode($this->response);
		}


		public function AllRequest()
		{
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			$queryStaff = "SELECT unit_name, status, stage from staffs join units using(unit_id) WHERE email = ?";
			$staffbinder = array('s', $decodedinfo->email);
			$staff = $this->Query($queryStaff, $staffbinder)->fetch_assoc();
			if($decodedinfo->for == 'manager' || $decodedinfo->for == "staff" || $decodedinfo->for == "hr" ){
				$queryrequest = "SELECT service_id, service_time, service_time, service_note, user_id, first_name, last_name, phone_number, profile_picture, room_id, status, staff_id, parts, email, room_id, room_type from cleaning_services join users using(user_id) join rooms using(room_id)";
				$request = $this->Query($queryrequest, null)->fetch_all(MYSQLI_ASSOC);
				$this->response['requests'] = $request;
				$this->response['access'] = true;
			} else{
				$this->response['access'] = true;
			}
			echo JSON_encode($this->response);
		}



		public function AttendTo($service_id){
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			$queryStaff = "SELECT unit_name, staff_id, status, stage from staffs join units using(unit_id) WHERE email = ?";
			$staffbinder = array('s', $decodedinfo->email);
			$staff = $this->Query($queryStaff, $staffbinder)->fetch_assoc();
			if($decodedinfo->for == 'staff' && $staff['unit_name'] == "Cleaning service" && $staff['status'] == "current"){
				$queryrequests = "UPDATE cleaning_services set status = ?, staff_id = ? WHERE service_id = ?";
				$servicebinder = array('sss', 'taken', $staff['staff_id'], $service_id);
				$this->Query($queryrequests, $servicebinder);
				$this->response['access'] = true;
			} else {
				$this->response['access'] = false;
			}
			echo JSON_encode($this->response);

		}


	}
?>