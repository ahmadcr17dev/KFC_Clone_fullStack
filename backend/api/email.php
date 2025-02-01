<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include('../database/connection.php');

// Decode the incoming JSON payload
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit();
}

// Validate email
$email = $data['email'] ?? null;

if (empty($email)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email is required"]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Valid Email is required"]);
    exit();
}

// Check if email already exists
$sql_query = 'SELECT * FROM email WHERE email = ?';
$sql_stmt = $conn->prepare($sql_query);
$sql_stmt->bind_param("s", $email);
$sql_stmt->execute();
$result = $sql_stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email is already registered"]);
} else {
    // Insert new email
    $new_query = 'INSERT INTO email (email) VALUES (?)';
    $stmt = $conn->prepare($new_query);
    $stmt->bind_param("s", $email);
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Email subscribed successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error in subscribing email"]);
    }
    $stmt->close();
}

$sql_stmt->close();
$conn->close();