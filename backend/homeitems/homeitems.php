<?php

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Respond to preflight option request
// if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
//     http_response_code(204);
//     exit();
// }

// Include database connection
include('../database/connection.php');

$sql_query = "SELECT * FROM home_items";
$result = $conn->query($sql_query);
$items = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    echo json_encode($items);
} else {
    echo json_encode([]);
}

$conn -> close();
