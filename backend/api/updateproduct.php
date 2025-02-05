<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

ob_start(); // Start output buffering

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kicksandfits";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    ob_end_clean();
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : "";

    $sql = "SELECT * FROM products WHERE id='$search' OR name LIKE '%$search%'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        ob_end_clean();
        echo json_encode(["success" => true, "products" => $products]);
    } else {
        ob_end_clean();
        echo json_encode(["success" => false, "message" => "No products found"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id']) || !isset($data['name']) || !isset($data['price']) || !isset($data['description']) || !isset($data['category']) || !isset($data['stock'])) {
        ob_end_clean();
        echo json_encode(["success" => false, "message" => "Missing required fields"]);
        exit();
    }

    $sql = "UPDATE products SET 
                name='{$data['name']}', 
                price='{$data['price']}', 
                description='{$data['description']}', 
                category='{$data['category']}', 
                stock_status='{$data['stock']}' 
            WHERE id='{$data['id']}'";

    if ($conn->query($sql) === TRUE) {
        ob_end_clean();
        echo json_encode(["success" => true, "message" => "Product updated successfully"]);
    } else {
        ob_end_clean();
        echo json_encode(["success" => false, "message" => "Error updating product: " . $conn->error]);
    }
}

$conn->close();
ob_end_flush(); // Flush output buffer
