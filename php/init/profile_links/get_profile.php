<?php

session_start();

$data = array(
    'USERNAME' => $_SESSION['username'],
    'FIRST_NAME' => $_SESSION['firstName'],
    'LAST_NAME' => $_SESSION['lastName'],
    'EMAIL' => $_SESSION['email'],
    'PHONE_NUMBER' => $_SESSION['phoneNumber']
);
// Set the Content-Type header to application/json
header('Content-Type: application/json');

// Encode the data as JSON and output it
echo json_encode($data);
?>