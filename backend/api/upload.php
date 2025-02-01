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

switch ($method) {
    case "POST":
        if (!isset($_POST['productid'], $_POST['productname'], $_POST['productprice'], $_POST['productdescription'], $_POST['productcategory'], $_POST['productstock'], $_POST['productdiscount'])) {
            echo json_encode(["status" => "error", "message" => "Missing required fields"]);
            exit;
        }

        if (!isset($_FILES["productimage"]) || $_FILES["productimage"]["error"] !== UPLOAD_ERR_OK) {
            echo json_encode(["status" => "error", "message" => "File upload failed"]);
            exit;
        }

        $productid = mysqli_real_escape_string($db_conn, $_POST['productid']);
        $productname = mysqli_real_escape_string($db_conn, $_POST['productname']);
        $productprice = mysqli_real_escape_string($db_conn, $_POST['productprice']);
        $productdescription = mysqli_real_escape_string($db_conn, $_POST['productdescription']);
        $productcategory = mysqli_real_escape_string($db_conn, $_POST['productcategory']);
        $productstock = mysqli_real_escape_string($db_conn, $_POST['productstock']);
        $productdiscount = mysqli_real_escape_string($db_conn, $_POST['productdiscount']);

        // Check if product ID already exists
        $checkQuery = "SELECT id FROM products WHERE id = '$productid'";
        $checkResult = mysqli_query($db_conn, $checkQuery);

        if (mysqli_num_rows($checkResult) > 0) {
            echo json_encode(["status" => "error", "message" => "Product ID already exists"]);
            exit;
        }

        // Convert image to base64
        $imageFile = $_FILES["productimage"]["tmp_name"];
        $imageBase64 = base64_encode(file_get_contents($imageFile));

        // Insert into database
        $query = "INSERT INTO products (id, name, price, description, category, stock_status, discount, image) 
                  VALUES ('$productid', '$productname', '$productprice', '$productdescription', '$productcategory', '$productstock', '$productdiscount', '$imageBase64')";

        if (mysqli_query($db_conn, $query)) {
            echo json_encode(["status" => "success", "message" => "Product Inserted Successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Product Not Inserted: " . mysqli_error($db_conn)]);
        }
        exit;
}
