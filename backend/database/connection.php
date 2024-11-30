<?php

$servername = 'localhost';
$username = 'root';
$password = '';
$database = 'kicksandfits';

// create a connection
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die('connection failed to kicksandfits database' . $conn->connect_error);
}
