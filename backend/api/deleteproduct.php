<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include('../database/connection.php');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Read and decode JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Validate and sanitize product ID (ensure it's not empty)
if (!isset($data['id']) || empty(trim($data['id']))) {
    http_response_code(400); // Bad Request
    echo json_encode(["success" => false, "message" => "Invalid or missing product ID."]);
    exit();
}

$product_id = trim($data['id']); // Keep as string

// Check if product exists before deleting
$check_query = "SELECT id FROM products WHERE id = ?";
$check_stmt = $conn->prepare($check_query);
$check_stmt->bind_param("s", $product_id);
$check_stmt->execute();
$check_stmt->store_result();

if ($check_stmt->num_rows === 0) {
    http_response_code(404); // Not Found
    echo json_encode(["success" => false, "message" => "Product not found."]);
    exit();
}

$check_stmt->close();

// Proceed with deletion
$sql_query = "DELETE FROM products WHERE id = ?";
$stmt = $conn->prepare($sql_query);
$stmt->bind_param("s", $product_id);

if ($stmt->execute() && $stmt->affected_rows > 0) {
    http_response_code(200); // OK
    echo json_encode(["success" => true, "message" => "Product deleted successfully."]);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(["success" => false, "message" => "Error deleting product."]);
}

$stmt->close();
$conn->close();
