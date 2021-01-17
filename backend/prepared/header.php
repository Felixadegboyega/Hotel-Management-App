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
		if($verifypass){
			$this->response["verify_password"] = true;
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
		} else{
			$this->response["token"] = null;
			$this->response["verify_password"] = false;
		}
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
}

?>