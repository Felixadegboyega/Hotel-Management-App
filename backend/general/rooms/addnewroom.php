 <?php
	require_once "../../prepared/rooms.php";
	$prepared = new Rooms;
	// $_POST['room_type'] = JSON_decode(file_get_contents("php://input"));
	if(isset($_POST) && !empty($_POST)){
		$room_type = $_POST['room_type'];
		$room_price = $_POST['room_price'];
		$no_of_rooms_available = $_POST['total_no_of_rooms'];
		$total_no_of_rooms = $_POST['total_no_of_rooms'];
		$na = pathinfo($_FILES["room_picture"]["name"], PATHINFO_EXTENSION);
		$randim = rand(10,10000);
		$room_pics_name = 'room'.$randim.".".$na;
		$room_pics_tmp_name = $_FILES["room_picture"]["tmp_name"];

		
		$prepared->NewRoom(array($room_type, $room_price, $no_of_rooms_available, $total_no_of_rooms, $room_pics_name));
			move_uploaded_file($room_pics_tmp_name, "../../uploads/images/rooms/".$room_pics_name);

	}
?>