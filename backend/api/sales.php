<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database Connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kicksandfits"; // Change this to your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    die(json_encode(["success" => false, "message" => "Invalid input"]));
}

// Assign variables
$firstName = $conn->real_escape_string($data["firstName"]);
$lastName = $conn->real_escape_string($data["lastName"]);
$city = $conn->real_escape_string($data["city"]);
$state = $conn->real_escape_string($data["state"]);
$zip = $conn->real_escape_string($data["zip"]);
$product_id = $conn->real_escape_string($data["product_id"]);
$product_name = $conn->real_escape_string($data["product_name"]);
$quantity = $conn->real_escape_string($data["quantity"]);
$product_price = $conn->real_escape_string($data["product_price"]);
$total_price = $conn->real_escape_string($data["total_price"]);

// Insert into database
$sql = "INSERT INTO sales (fname, lname, city, state, zip, product_id, product_name, quantity, product_price, pay_bill) 
        VALUES ('$firstName', '$lastName', '$city', '$state', '$zip', '$product_id', '$product_name', '$quantity', '$product_price', '$total_price')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Order placed successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
