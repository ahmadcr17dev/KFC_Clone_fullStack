<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include('../database/connection.php');

// Parse JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!isset($data['id']) || empty($data['id'])) {
    echo json_encode(["success" => false, "message" => "Invalid or missing ID."]);
    exit;
}

$product_id = $data['id'];

$sql_query = "DELETE FROM products WHERE id = ?";
$stmt = $conn->prepare($sql_query);
$stmt->bind_param("s", $product_id); // Change 's' to 'i' for integer binding

if ($stmt->execute() && $stmt->affected_rows > 0) {
    echo json_encode(["success" => true, "message" => "Product deleted successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Product not found or already deleted."]);
}

$stmt->close();
$conn->close();
