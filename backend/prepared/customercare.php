<?php
	include_once "header.php";
	class CustomerCare Extends Header 
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
					$booked = $this->Query($queryBookedRooms, $BookedRoomsBinder)->fetch_all(MYSQLI_ASSOC);

					foreach ($booked as $each) {
						$out_date = $each['check_out_date'];
						$current_date = NOW()->format('Y M D');

						# code...
						$this->response['det'] = ['out'=>$out_date, 'current'=>$current_date];
					};

					// if($booked){
					// 	$this->response["verify_room"] = true;
					// 	$details[2] = $user['user_id'];
					// 	$queryrequests = "INSERT into customer_care_services (type, careservice_note, user_id) VALUES (?, ?, ?)";
					// 	$orderbinder = array('sss', ...$details);
					// 	$this->Query($queryrequests, $orderbinder);
					// 	$this->response['request_status']=true;
					// }else {	
					// 	$this->response["verify_room"] = false;
					// }
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
			// if($decodedinfo->for == 'manager' || $decodedinfo->for == "staff" || $decodedinfo->for == "hr" ){
				$queryrequests = "SELECT careservice_id, careservice_time, careservice_time, careservice_note, user_id, first_name, last_name, phone_number, profile_picture, room_id, status, staff_id, type, email, room_id, room_type from customer_care_services join users using(user_id) join rooms using(room_id)";
				$requests = $this->Query($queryrequests, null)->fetch_all(MYSQLI_ASSOC);
				$this->response['requests'] = $requests;
				$this->response['access'] = true;
			// } else {
			// 	$this->response['access'] = false;
			// }
			echo JSON_encode($this->response);
		}
		
		
		
		public function AttendTo($careservice_id){
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			$queryStaff = "SELECT unit_name, staff_id, status, stage from staffs join units using(unit_id) WHERE email = ?";
			$staffbinder = array('s', $decodedinfo->email);
			$staff = $this->Query($queryStaff, $staffbinder)->fetch_assoc();
			if($decodedinfo->for == 'staff' && $staff['unit_name'] == "Customer care service" && $staff['status'] == "current"){
				$queryrequests = "UPDATE customer_care_services set status = ?, staff_id = ? WHERE careservice_id = ?";
				$servicebinder = array('sss', 'taken', $staff['staff_id'], $careservice_id);
				$this->Query($queryrequests, $servicebinder);
				$this->response['access'] = true;
			} else {
				$this->response['access'] = false;
			}
			echo JSON_encode($this->response);

		}
	}
?>