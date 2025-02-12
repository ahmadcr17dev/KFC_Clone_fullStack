<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

// Database connection
$db_conn = mysqli_connect("localhost", "root", "", "kicksandfits");
if (!$db_conn) {
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . mysqli_connect_error()]);
    exit;
}

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

if ($method !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

// Check if required fields are present
if (!isset($_POST['id'], $_POST['name'], $_POST['price'], $_POST['stock_status'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$id = mysqli_real_escape_string($db_conn, $_POST['id']);
$name = mysqli_real_escape_string($db_conn, $_POST['name']);
$price = mysqli_real_escape_string($db_conn, $_POST['price']);
$stock = mysqli_real_escape_string($db_conn, $_POST['stock_status']);

// Handle image upload
$imageBase64 = null;
if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
    $imageFile = $_FILES["image"]["tmp_name"];
    $imageBinary = addslashes(file_get_contents($imageFile)); // 🔹 Use addslashes() for binary data
}

// Prepare SQL query
$query = "UPDATE products SET name = '$name', price = '$price', stock_status = '$stock', image = '$imageBinary' WHERE id = '$id'";

// Execute query
if (mysqli_query($db_conn, $query)) {
    echo json_encode(["status" => "success", "message" => "Product updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Product update failed: " . mysqli_error($db_conn)]);
}

// Close connection
mysqli_close($db_conn);
exit;
