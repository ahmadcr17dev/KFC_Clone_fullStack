<?php

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-Type: application/json');

// Include database connection
include('../database/connection.php');

// Query to fetch data
$sql_query = "SELECT * FROM products WHERE category='pizza'";
$result = mysqli_query($conn, $sql_query);

// Check if query succeeded
if (!$result) {
    echo json_encode([
        "success" => false,
        "message" => "Error executing query",
        "error" => mysqli_error($conn)
    ]);
    exit();
}

// Fetch all rows into an array
$items = array();
while ($row = mysqli_fetch_assoc($result)) {
    if (isset($row['image'])) {
        // $row['image'] = base64_encode($row['image']); // Encode binary data
        $row['image'] = "data:image/jpeg;base64," . base64_encode($row['image']);

    }
    $items[] = $row;
}

// Output the data as JSON
echo json_encode($items);

// Close the database connection
mysqli_close($conn);
