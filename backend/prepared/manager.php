<?php
	include_once "header.php";
	class Manager Extends Header 
	
	{
		function __construct()
		{
			parent::__construct('../../vendor/autoload.php');
		}	
		public function managersignup($details)
		{
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			if($decodedinfo->for == 'main_admin'){
				$this->response["for"] = 'manager';
				$this->response["verify"]=true;
				$querydb = "INSERT into manager (first_name, last_name, phone_number, email, date_of_birth, password) VALUES (?, ?, ?, ?, ?, ?)";
				$binder = array('ssssss', ...$details);
				$this->Query($querydb, $binder);
			} else{
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);
		}


		public function managersignin($email, $enteredPass){
			$this->connection();
			$querydb = "SELECT manager_id, email, password from manager where email = ?";
			$binder = array('s', $email);
			$fetched = $this->Query($querydb, $binder)->fetch_assoc();
			if($fetched != null){
				$this->UseJwt($enteredPass, $fetched['password'], $fetched['email'], 'manager');
				$this->response["email_verify"] = true;
				$this->response["id"] = $fetched['manager_id'];
			} else{
				$this->response["email_verify"] = false;
			}
			echo JSON_encode($this->response);
			
		}


		public function UploadProfilePicture($profile_picture)
		{
			$this->connection();
			$decodedInfo = $this->decodeJwt();
			if($decodedInfo->for == 'manager'){
				$this->response["verify"]=true;
				$querydb = "UPDATE manager set profile_picture = ? WHERE email = ?";
				$binder = array('ss', $profile_picture, $decodedInfo->email);
				$this->Query($querydb, $binder);
			} else{
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);
		}


		public function allManagerDetails(){
			$this->connection();
			$decodedinfo = $this->decodeJwt();
			if($decodedinfo->for == 'manager' || $decodedinfo->for == 'main_admin' ||  $decodedinfo->for == 'hr'){
				$queryManager = "SELECT manager_id, first_name, last_name, email, phone_number, profile_picture, status, date_of_birth, date_employed from manager";
				$Manager= $this->Query($queryManager, null)->fetch_all(MYSQLI_ASSOC);
				$this->response["verify"]=true;
				$this->response["managers_details"] = $Manager;
				if($decodedinfo->for == 'manager'){ 
					$this->response["verifiedFor"] = 'manager';
				} else if($decodedinfo->for == 'manager'){
					$this->response["verifiedFor"] = 'admin';
				} else {
					$this->response["manager_details"] = null;
					$this->response["verify"]=false;
				}
			} else{
				die('loggedOut');
			}
			echo JSON_encode($this->response);
		}
		
		
		
			
		public function managereditDetails($fname, $lname, $profile_picture)
		{
			$this->connection();
			// $header = $this->getHeaders();
			$querydb = "UPDATE manager set first_name = ?, last_name = ?, profile_picture = ? WHERE email = $header";
			$binder = array('sssss', $fname, $lname, $profile_picture);
			$this->Query($querydb, $binder);
			echo JSON_encode($this->response);

		}
	}
?>