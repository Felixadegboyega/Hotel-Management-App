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
				$queryUser = 'SELECT room_id, user_id, email from users WHERE email = ?';
				$userbinder = array('s', $decodedinfo->email);
				$user = $this->Query($queryUser, $userbinder)->fetch_assoc();
				if($user['room_id']){
					$this->response["verify_room"] = true;
					$details[2] = $user['user_id'];
					$queryservice = "INSERT into cleaning_services (parts, service_note, user_id) VALUES (?, ?, ?)";
					$servicebinder = array('sss', ...$details);
					$this->Query($queryservice, $servicebinder);
					$this->response['request_status']=true;
				} else {
					$this->response["verify_room"] = false;
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
			if($decodedinfo->for == 'manager' || ($staff['unit_name'] == "Cleaning service" && $staff['status'] == "current")){
				$queryOrders = "SELECT * from cleaning_service";
				$orders = $this->Query($queryOrders, null)->fetch_all(MYSQLI_ASSOC);
				$this->response['orders'] = $orders;
			}
			echo JSON_encode($this->response);
		}


	}
?>