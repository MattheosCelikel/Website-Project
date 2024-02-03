<?php

session_start();

$_SESSION['isValidLogin'] = false;

$data = array(
    'isValidLogin' => $_SESSION['isValidLogin']
);

//Clears all session data
session_unset();

// Set the Content-Type header to application/json
header('Content-Type: application/json');

// Encode the data as JSON and output it
echo json_encode($data);
?>