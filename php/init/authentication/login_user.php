<?php

session_start();

$_SESSION['isValidLogin'] = true;

$data = array(
    'isValidLogin' => $_SESSION['isValidLogin']
);
// Set the Content-Type header to application/json
header('Content-Type: application/json');

// Encode the data as JSON and output it
echo json_encode($data);
?>