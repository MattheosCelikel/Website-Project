<?php

session_start();


if(isset($_SESSION['isValidLogin'])){
    if($_SESSION['isValidLogin'] == true){
        $_SESSION['isValidLogin'] = true;
    }
    else if($_SESSION['isValidLogin'] == false){
        $_SESSION['isValidLogin'] = false;
    }
}
else{
    
    //Clears all session data
    session_unset();
    $_SESSION['isValidLogin'] = false;
}

$data = array(
    'isValidLogin' => $_SESSION['isValidLogin']
);
// Set the Content-Type header to application/json
header('Content-Type: application/json');

// Encode the data as JSON and output it
echo json_encode($data);
?>