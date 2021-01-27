<?php
	include_once "header.php";
	class MainAdmin Extends Header 
	{
		function __construct()
		{
			parent::__construct('../vendor/autoload.php');
		}
		public function adminsignup($fname, $lname, $pnumber, $email, $pass)
		{
			$this->connection();
			$confirmOneAdmin = $this->connect_to_db->query("SELECT * from main_admin")->fetch_all();
			if(!$confirmOneAdmin){
				$this->response["confirm_one_admin"] = true;
				$querydb = "INSERT into main_admin (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)";
				$binder = array('sssss', $fname, $lname, $pnumber, $email, $pass);
				$this->Query($querydb, $binder);
			} else{
				$this->response["query_status"] = false;
				$this->response["confirm_one_admin"] = false;
			}
			echo JSON_encode($this->response);
		}


		public function adminsignin($email, $enteredPass){
			$this->connection();
			$querydb = "SELECT email, password from main_admin where email = ?";
			$binder = array('s', $email);
			$fetched = $this->Query($querydb, $binder)->fetch_assoc();
			if($fetched != null){
				$this->UseJwt($enteredPass, $fetched['password'], $fetched['email'], 'main_admin');
				$this->response["email_verify"] = true;
			} else{
				$this->response["email_verify"] = false;
			}
			echo JSON_encode($this->response);
			
		}
		
		
		public function admindetails(){
			$this->connection();
			$decodedInfo = $this->decodeJwt();
			if($decodedInfo){
				$querydb = "SELECT first_name, last_name, email, phone_number, profile_picture from main_admin WHERE email = ?";
				$binder = array('s', $decodedInfo->email);
				$Info = $this->Query($querydb, $binder)->fetch_assoc();
				if($Info){ 
					$this->response["verify"]=true;
					$this->response["admin_details"] = $Info;
					$this->response["for"] = 'admin';
				} else{
					$this->response["admin_details"] = null;
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
			if($decodedInfo->for == 'main_admin'){
				$this->response["verify"]=true;
				$querydb = "UPDATE main_admin set profile_picture = ? WHERE email = ?";
				$binder = array('ss', $profile_picture, $decodedInfo->email);
				$this->Query($querydb, $binder);
			} else{
				$this->response["verify"]=false;
			}
			echo JSON_encode($this->response);
		}



		public function admineditDetails($fname, $lname, $profile_picture)
		{
			$this->connection();
			// $header = $this->getHeaders();
			$querydb = "UPDATE main_admin set first_name = ?, last_name = ?, profile_picture = ? WHERE email = $header";
			$binder = array('sss', $fname, $lname, $profile_picture);
			$this->Query($querydb, $binder);
			echo JSON_encode($this->response);
		}
	}
?>