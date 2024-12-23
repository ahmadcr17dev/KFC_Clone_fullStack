<?php

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: X-Requested-With');
// header('Content-Type: application/json');

// Include database connection
include('../database/connection.php');

$sql_query = "SELECT * FROM home_items";
$result = mysqli_query($conn, $sql_query);
$items = array();
while ($row = mysqli_fetch_assoc($result)) {
    $items[] = $row;
}
echo json_encode(['result'=>$result]);
$conn->close();