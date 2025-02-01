<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('../database/connection.php');

// Parse JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Check if the 'id' key exists in the input
if (isset($data['id'])) {
    $userId = $data['id'];

    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User deleted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error deleting user."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid or missing ID."]);
}
