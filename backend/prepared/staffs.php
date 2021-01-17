<?php
	include_once "header.php";
	class Staffs Extends Header 
	
	{
		function __construct()
		{
			parent::__construct('../../vendor/autoload.php');
		}
		public function staffsignup($details)
		{
			$this->connection();
			$decodedInfo = $this->decodeJwt();
			if($decodedInfo->for == 'manager'){
				$unitq = "SELECT * from units where unit_name = ?";
				$unitbinder = array('s', $details[5]);
				$unit = $this->Query($unitq, $unitbinder)->fetch_assoc();
				$this->response["verifiedFor"] = 'manager';
				// $this->response["unitid"] = $details;
				if($unit){
					$staffInfo = $details;
					$staffInfo[5] = $unit['unit_id'];
					$this->response["verify"]=true;
					$querydb = "INSERT into staffs (first_name, last_name, phone_number, email, date_of_birth, unit_id, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
					$binder = array('sssssss', ...$staffInfo);
					$this->Query($querydb, $binder);
				}
			} else{
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);
		}


		public function staffsignin($email, $enteredPass)
		{
			$this->connection();
			$querydb = "SELECT staff_id, email, password from staffs where email = ?";
			$binder = array('s', $email);
			$fetched = $this->Query($querydb, $binder)->fetch_assoc();
			if($fetched != null){
				$this->UseJwt($enteredPass, $fetched['password'], $fetched['email'], 'staff');
				$this->response["email_verify"] = true;
				$this->response["id"] = $fetched['staff_id'];
			} else{
				$this->response["email_verify"] = false;
			}
			echo JSON_encode($this->response);
			
		}


		public function allStaffsDetails()
		{
			$this->connection();
			$decodedInfo = $this->decodeJwt();
			if($decodedInfo->for == 'main_admin' || $decodedInfo->for == 'hr' || $decodedInfo->for == 'manager' || $decodedInfo->for == 'staff'){
				$querystaff = "SELECT staff_id, first_name, last_name, email, phone_number, profile_picture, status, date_of_birth, date_employed, unit_id, unit_name from staffs join units using(unit_id)";
				$staffs = $this->Query($querystaff, null)->fetch_all(MYSQLI_ASSOC);
				$this->response["verify"]=true;
				$this->response["staffs_details"] = $staffs;
				if($decodedInfo->for == 'main_admin'){ 
					$this->response["verifiedFor"] = 'admin';
				} else if($decodedInfo->for == 'manager'){ 
					$this->response["verifiedFor"] = 'manager';
				} else if($decodedInfo->for == 'staff'){ 
					$this->response["verifiedFor"] = 'staff';
				} else if($decodedInfo->for == 'main_admin'){ 
					$this->response["verifiedFor"] = 'admin';
				} else if($decodedInfo->for == 'hr'){
					$this->response["verifiedFor"] = 'hr';
				} else {
					$this->response["verify"]=false;
				}
			} else{
				$this->response["verify"]=false;
				$this->response["staffs_details"] = null;
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