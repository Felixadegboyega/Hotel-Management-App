<?php

class Header 
{
	public $response = [];
	function __construct($dir)
	{
		header("Access-Control-Allow-Origin: http://localhost:4200");
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
		require_once $dir;
		$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
		$dotenv->load();
	}

	
	
	
	
	public function connection()
	{
		$this->connect_to_db = new mySqli($_ENV['HOST'], $_ENV['USERNAME'], $_ENV['PASSWORD'], $_ENV['DBNAME']);
		if(!$this->connect_to_db->connect_error){
			$this->response["connection_status"] = true;
			return true;
		} else{
			$this->response["connection_status"] = false;
			return false;
		}
	}
	

	public function Query($query, $binder)
	{
		if($this->connection()){
			$prepare = $this->connect_to_db->prepare($query);
			if($binder){
				$prepare->bind_param(...$binder);
			}
			if($prepare->execute()){
				$this->response['query_status'] = true;
				return $prepare->get_result();
			} else {
				$this->response['query_status'] = false;
				return false;
			};
		}
	}
	

	public function UseJwt($enteredPass, $dbpassword, $email, $for)
	{
		$verifypass = password_verify($enteredPass, $dbpassword);
		if ($verifypass) {
			$this->response["verify_password"] = true;
			$this->ConfirmUseJwt($email, $for);
		} else{
			$this->response["token"] = null;
			$this->response["verify_password"] = false;
		}
	}

	
	public function ConfirmUseJwt($email, $for)
	{
		$usertoken = [
			"iss" => 'localhost:4200',
			"iat" => time(),
			"nbf" => time(),
			"exp" => time()  + 3600,
			"info" => [
				'email'=>$email,
				'for'=>$for
			]
		];
		$token = \Firebase\JWT\JWT::encode($usertoken, $_ENV['TOKENPIN']);
		$this->response["token"] = $token;
	}
	
	
	public function decodeJwt()
	{
		if(isset(getallheaders()['authorization'])){
			$token = getallheaders()['authorization'];
			$myJwt = trim(substr($token, 7));
			$check = \Firebase\JWT\JWT::decode($myJwt, $_ENV['TOKENPIN'], ['HS256']);
			$info = $check->info;
			if($info){
				$this->response["online_status"] = true;
				return $info;
			} else {
				$this->response["online_status"] = false;
				return false;
			}
		} else{
			return false;
		}
	}



	public function AdminAuth()
	{
		$this->connection();
		$decodedInfo = $this->decodeJwt();
		if($decodedInfo){
			$this->response['for'] = $decodedInfo->for;
			if ($decodedInfo->for == 'main_admin') {
				$this->GetDetails('admin_id', 'main_admin', $decodedInfo->email);
			} else if($decodedInfo->for == 'manager'){
				$this->GetDetails('manager_id', 'manager', $decodedInfo->email);
			} else if($decodedInfo->for == 'hr'){
				$this->GetDetails('hr_id', 'hr', $decodedInfo->email);
			} else if($decodedInfo->for == 'staff'){
				$this->GetDetails('staff_id', 'staffs', $decodedInfo->email);
			}
		}
	}
	
	private function GetDetails($id_tag, $from, $email)
	{
		$queryDb = "SELECT first_name, last_name, $id_tag, profile_picture, status from $from WHERE email = ?";
		$binder = array('s', $email);
		$details = $this->Query($queryDb, $binder)->fetch_assoc();
		if($details){
			$this->response['details'] = $details;
		}
		echo JSON_encode($this->response);
		
	}
	
	
	
	public function TokenRefresh()
	{
		$this->connection();
		$decodedInfo = $this->decodeJwt();
		if($decodedInfo){
			$this->ConfirmUseJwt($decodedInfo->email, $decodedInfo->for);
		}
		echo JSON_encode($this->response);
	}


	public function adminSignin($email, $enteredPass){
		$this->connection();
		$querydb = "SELECT manager_id, email, password from manager where email = ?";
		$binder = array('s', $email);
		$fetched = $this->Query($querydb, $binder)->fetch_assoc();
		if($fetched != null){
			$this->UseJwt($enteredPass, $fetched['password'], $fetched['email'], 'manager');
			if($this-re)
			$this->response["email_verify"] = true;
			$this->response["id"] = $fetched['manager_id'];
		} else{
			$this->response["email_verify"] = false;
		}
		echo JSON_encode($this->response);
		
	}

	public function BookingStatus()
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
				$status = false;
				foreach ($booked as $each) {
					$out_date = new DateTime($each['check_out_date']);
					$current_date = new DateTime(date('Y-m-d'));
					$datediff = (float)$current_date->diff($out_date)->format("%r%a");
					if($datediff > 0){
						$status = true;
					}
				};
				if($status){
					$this->response["verify_room"] = true;
					$this->response["user_id"] = $user['user_id'];
				} else {	
					$this->response["verify_room"] = false;
				}
			}
			
		} else {
			$this->response["verify_online"] = false;
		}
	}

	public function getBookings()
	{
		$this->connection();
		$queryBookedRooms = 'SELECT * from booked_rooms join visits using(visit_id) join rooms using(room_id)';
		$booked = $this->Query($queryBookedRooms, null)->fetch_all(MYSQLI_ASSOC);
		$this->response['allbookings'] = $booked;
		echo JSON_encode($this->response);
	}
}

?>