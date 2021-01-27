<?php
	include_once "header.php";
	class Users Extends Header 
	{
		function __construct()
		{
			parent::__construct('../vendor/autoload.php');
		}
		public function signup($details)
		{
			$this->connection();
			$querydb = "INSERT into users (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)";
			$binder = array('sssss', ...$details);
			$this->Query($querydb, $binder);
			echo JSON_encode($this->response);
		}


		public function signin($email, $enteredPass){
			$this->connection();
			$querydb = "SELECT user_id, email, password from users where email = ?";
			$binder = array('s', $email);
			$fetched = $this->Query($querydb, $binder)->fetch_assoc();
			if($fetched != null){
				$this->UseJwt($enteredPass, $fetched['password'], $fetched['email'], 'user');
				$this->response["email_verify"] = true;
				$this->response["id"] = $fetched['user_id'];
			} else{
				$this->response["email_verify"] = false;
			}
			echo JSON_encode($this->response);
			
		}
		
		
		public function UsersDetails(){
			$this->connection();
			$decodedInfo = $this->decodeJwt();
			if($decodedInfo->for == 'user' || $decodedInfo->for == 'manager'){
				$querydb = "SELECT user_id, first_name, last_name, email, phone_number, profile_picture, room_id from users";
				$Info = $this->Query($querydb, null)->fetch_all(MYSQLI_ASSOC);
				// if($Info){ 
					$this->response["verify"]=true;
					$this->response["users_details"] = $Info;
					$this->response["for"] = 'user';
				// } else{
					// $this->response["users_details"] = null;
					// $this->response["verify"]=false;
				// }
			} else {
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);
		}
		

		public function OnlineUsersDetails(){
			$this->connection();
			$decodedInfo = $this->decodeJwt();
			if($decodedInfo->for == 'user'){
				$querydb = "SELECT user_id, first_name, last_name, email, phone_number, profile_picture, room_id from users WHERE email = ?";
				$binder = array('s', $decodedInfo->email);
				$Info = $this->Query($querydb, $binder)->fetch_assoc();
				if($Info){ 
					$this->response["verify"]=true;
					$this->response["user_details"] = $Info;
					$this->response["for"] = 'user';
				} else{
					$this->response["user_details"] = null;
					$this->response["verify"]=false;
				}
			} else {
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);
		}



		public function UploadProfilePicture($profile_picture)
		{
			$this->connection();
			$decodedInfo = $this->decodeJwt();
			if($decodedInfo->for == 'user'){
				$this->response["verify"]=true;
				$querydb = "UPDATE users set profile_picture = ? WHERE email = ?";
				$binder = array('ss', $profile_picture, $decodedInfo->email);
				$this->Query($querydb, $binder);
			} else{
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);
		}
		
			
			
		public function editDetails($fname, $lname, $pnumber, $email, $profile_picture)
		{
			$this->connection();
			// $header = $this->getHeaders();
			$querydb = "UPDATE users set first_name = ?, last_name = ?, phone_number = ?, email = ?, profile_picture = ? WHERE email = $header";
			$binder = array('sssss', $fname, $lname, $pnumber, $email, $profile_picture);
			$this->Query($querydb, $binder);
			echo JSON_encode($this->response);
		}
		
		
		public function editRoomNumber()
		{
			// $header = $this->getHeaders();
			$this->connection();
			$querydb = "UPDATE users set room_id = ? WHERE email = $header";
			$binder = array('s', $room_id);
			$this->Query($querydb, $binder);
			echo JSON_encode($this->response);
		}
	}
?>