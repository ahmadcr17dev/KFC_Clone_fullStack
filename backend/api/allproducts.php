<?php

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Respond to preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Include database connection
include('../database/connection.php');

$sql_query = "SELECT id, name, price, category, stock_status, discount, date FROM products";
$result = $conn->query($sql_query);

if(!$result){
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database query failed']);
    exit();
}

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Return JSON response
http_response_code(200);
echo json_encode(['success' => true, 'products' => $data]);

// Close the database connection
$conn->close();

?>