<?php
	include_once "header.php";
	class Orders Extends Header 
	{
		function __construct()
		{
			parent::__construct('../../vendor/autoload.php');
		}
		public function NewOrder($details)
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
					$queryorders = "INSERT into food_orders (order_note, qty, user_id, food_id) VALUES (?, ?, ?, ?)";
					$orderbinder = array('ssss', ...$details);
					$this->Query($queryorders, $orderbinder);
					$this->response['order_status']=true;
				} else {
					$this->response["verify_room"] = false;
				}
			} else {
				$this->response["verify_online"] = false;
			}
			echo JSON_encode($this->response);
		}


		public function AllOrders()
		{
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			$queryStaff = "SELECT unit_name, status, stage from staffs join units using(unit_id) WHERE email = ?";
			$staffbinder = array('s', $decodedinfo->email);
			$staff = $this->Query($queryStaff, $staffbinder)->fetch_assoc();
			if($decodedinfo->for == 'manager' || $decodedinfo->for == "staff" || $decodedinfo->for == "hr" ){
				$queryOrders = "SELECT * from food_orders join users using(user_id) join foods using(food_id)";
				$orders = $this->Query($queryOrders, null)->fetch_all(MYSQLI_ASSOC);
				$this->response['orders'] = $orders;
				$this->response['access'] = true;
			} else {
				$this->response['access'] = false;
			}
			echo JSON_encode($this->response);
		}



		public function AttendTo($order_id){
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			$queryStaff = "SELECT unit_name, staff_id, status, stage from staffs join units using(unit_id) WHERE email = ?";
			$staffbinder = array('s', $decodedinfo->email);
			$staff = $this->Query($queryStaff, $staffbinder)->fetch_assoc();
			if($decodedinfo->for == 'staff' && $staff['unit_name'] == "Kitchen" && $staff['status'] == "current"){
				$queryrequests = "UPDATE food_orders set status = ?, staff_id = ? WHERE order_id = ?";
				$servicebinder = array('sss', 'taken', $staff['staff_id'], $order_id);
				$this->Query($queryrequests, $servicebinder);
				$this->response['access'] = true;
			} else {
				$this->response['access'] = false;
			}
			echo JSON_encode($this->response);

		}


	}
?>