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

// Validate fields
$username = $data['username'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;
$role = 'user';

if (empty($username) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid Email Format']);
    exit();
}

// Check for existing users
$check_query = 'SELECT * FROM users WHERE username = ? OR email = ?';
$stmt = $conn->prepare($check_query);
$stmt->bind_param("ss", $username, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['username'] === $username) {
        echo json_encode(['status' => 'error', 'message' => 'Username or Email is already registered']);
        exit();
    }
    if ($row['email'] === $email) {
        echo json_encode(['status' => 'error', 'message' => 'Username or Email is already registered']);
        exit();
    }
}

// Validate password
$uppercase = preg_match('@[A-Z]@', $password);
$lowercase = preg_match('@[a-z]@', $password);
$numbers = preg_match('@[0-9]@', $password);
$special_characters = preg_match('@[^\w]@', $password);

if (strlen($password) <= 7 || !$uppercase || !$lowercase || !$numbers || !$special_characters) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Password does not meet requirements']);
    exit();
}

// Insert user into database
$hash_password = password_hash($password, PASSWORD_BCRYPT);
$sql_query = 'INSERT INTO users(username, email, password, role) VALUES(?, ?, ?, ?)';
$stmt = $conn->prepare($sql_query);
$stmt->bind_param('ssss', $username, $email, $hash_password, $role);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => "$username is registered successfully"]);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Error registering user']);
}

// Close connections
$stmt->close();
$conn->close();
