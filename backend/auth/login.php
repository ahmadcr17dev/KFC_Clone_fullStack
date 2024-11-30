<?php

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Respond to preflight option request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Include database connection
include('../database/connection.php');

// Parse JSON input
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit();
}

$username = $data['username'] ?? null;
$password = $data['password'] ?? null;

// check username and password is not empty
if (empty($username) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit();
} else {
    // check username exists or not
    $check_query = 'SELECT * FROM users WHERE username = ?';
    $stmt = $conn->prepare($check_query);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // match the password
        if (password_verify($password, $row['password'])) {
            echo json_encode(["status" => "success", "message" => "Login Successful"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid Password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "user not found"]);
    }
    $stmt->close();
}
$conn->close();
