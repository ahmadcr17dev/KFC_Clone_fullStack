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
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit();
}

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// Check if username and password are not empty
if (empty($username) || empty($password)) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit();
}

// Check in admin table
$sqladmin = "SELECT * FROM admin WHERE username = ?";
$stmtadmin = $conn->prepare($sqladmin);
$stmtadmin->bind_param("s", $username);
$stmtadmin->execute();
$resultadmin = $stmtadmin->get_result();

if ($resultadmin->num_rows > 0) {
    $adminrow = $resultadmin->fetch_assoc();
    // Match the password
    if ($password === $adminrow['password']) {
        echo json_encode([
            "success" => true,
            "role" => "admin",
            "user" => [
                "id" => $adminrow['id'],
                "username" => $adminrow['username'],
                "email" => $adminrow['email'] ?? null
            ],
            "message" => "Login successful"
        ]);
        exit();
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
        exit();
    }
}

// Check in users table
$sqluser = "SELECT * FROM users WHERE username = ?";
$stmtuser = $conn->prepare($sqluser);
$stmtuser->bind_param("s", $username);
$stmtuser->execute();
$resultuser = $stmtuser->get_result();

if ($resultuser->num_rows > 0) {
    $rowuser = $resultuser->fetch_assoc();
    // Match the password
    if (password_verify($password, $rowuser['password'])) {
        echo json_encode([
            "success" => true,
            "role" => "user",
            "user" => [
                "id" => $rowuser['id'],
                "username" => $rowuser['username'],
                "email" => $rowuser['email'] ?? null
            ],
            "message" => "Login successful"
        ]);
        exit();
    } else {
        echo json_encode(["success" => false, "message" => "Invalid password"]);
        exit();
    }
}

// If user not found in either table
echo json_encode(["success" => false, "message" => "User not found"]);
exit();
