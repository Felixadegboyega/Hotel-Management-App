<?php
	include_once "header.php";
	class HR Extends Header 
	
	{
		function __construct()
		{
			parent::__construct('../../vendor/autoload.php');
		}
		public function hrsignup($details)
		{
			$this->connection();
			$decodedInfo = $this->decodeJwt();
			if($decodedInfo->for == 'main_admin'){
				$this->response["verifiedFor"] = 'main_admin';
				$this->response["verify"]=true;
				$querydb = "INSERT into hr (first_name, last_name, phone_number, email, date_of_birth, password) VALUES (?, ?, ?, ?, ?, ?)";
				$binder = array('ssssss', ...$details);
				$this->Query($querydb, $binder);
			} else{
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);
		}


		public function UploadProfilePicture($profile_picture)
		{
			$this->connection();
			$decodedInfo = $this->decodeJwt();
			if($decodedInfo->for == 'hr'){
				$this->response["verify"]=true;
				$querydb = "UPDATE hr set profile_picture = ? WHERE email = ?";
				$binder = array('ss', $profile_picture, $decodedInfo->email);
				$this->Query($querydb, $binder);
			} else{
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);
		}


		public function hrsignin($email, $enteredPass){
			$this->connection();
			$querydb = "SELECT hr_id, email, password from hr where email = ?";
			$binder = array('s', $email);
			$fetched = $this->Query($querydb, $binder)->fetch_assoc();
			if($fetched != null){
				$this->UseJwt($enteredPass, $fetched['password'], $fetched['email'], 'hr');
				$this->response["email_verify"] = true;
				$this->response["id"] = $fetched['hr_id'];
			} else{
				$this->response["email_verify"] = false;
			}
			echo JSON_encode($this->response);
			
		}


		public function allhrDetails(){
			$this->connection();
			$decodedInfo = $this->decodeJwt();
			if($decodedInfo->for == 'main_admin' || $decodedInfo->for == 'hr'){
				$queryhr = "SELECT hr_id, first_name, last_name, email, phone_number, profile_picture, status, date_of_birth, date_employed from hr";
				$hr= $this->Query($queryhr, null)->fetch_all(MYSQLI_ASSOC);
				if($decodedInfo->for == 'main_admin'){ 
					$this->response["verify"]=true;
					$this->response["hr_details"] = $hr;
					$this->response["verifiedFor"] = 'admin';
				} else if($decodedInfo->for == 'hr'){
					$this->response["verify"]=true;
					$this->response["hr_details"] = $hr;
					$this->response["verifiedFor"] = 'hr';
				} else {
					$this->response["hr_details"] = null;
					$this->response["verify"]=false;
				}
			} else{
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);
		}
		
		
		
			
		public function hreditDetails($fname, $lname, $profile_picture)
		{
			$this->connection();
			// $header = $this->getHeaders();
			$querydb = "UPDATE hr set first_name = ?, last_name = ?, profile_picture = ? WHERE email = $header";
			$binder = array('sssss', $fname, $lname, $profile_picture);
			$this->Query($querydb, $binder);
			echo JSON_encode($this->response);

		}
	}
?>