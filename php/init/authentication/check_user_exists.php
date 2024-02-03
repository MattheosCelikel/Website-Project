<?php
require_once(__DIR__ . '/../client.php');

session_start();

$rawData = file_get_contents("php://input");
$requestData = json_decode($rawData, true);

// Check if the POST request is made
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Check if the USERNAME and PASSWORD fields are set in the POST data
        if (isset($requestData['USERNAME']) && isset($requestData['PASSWORD'])) {
            // Retrieve the values from the POST data
            $username = $requestData['USERNAME'];
            $password = $requestData['PASSWORD'];


            //This would be where rabbitmq checks if the user exists
            $client = createRabbitMQClient();

            $requestToServer = array();
            $requestToServer['type'] = "login";
            $requestToServer['USERNAME'] = $username;
            $requestToServer['PASSWORD'] = $password;
            $response = sendRequest($client, $requestToServer);

            $data = array(
                'username' => $username,
                'password' => $password,
                'isValidLogin' => $response['isLoggedIn'],
                "firstName" => $response['FIRST_NAME'],
                "lastName" => $response['LAST_NAME'],
                "email" => $response['EMAIL'],
                "phoneNumber" => $response['PHONE_NUMBER']
            );

            //Preemptively stores session data if request goes through
            $_SESSION['userId'] = $response['USER_ID'];
            $_SESSION['username'] = $username;
            $_SESSION['isValidLogin'] = $response['isLoggedIn'];
            $_SESSION['firstName'] = $response['FIRST_NAME'];
            $_SESSION['lastName'] = $response['LAST_NAME'];
            $_SESSION['email'] = $response['EMAIL'];
            $_SESSION['phoneNumber'] = $response['PHONE_NUMBER'];

            // Set the Content-Type header to application/json
            header('Content-Type: application/json');

            // Encode the data as JSON and output it
            echo json_encode($data);
        } else {
            $data = array(
                'isValidLogin' => false,
                'error' => 'Post variables aren\'t being set',
                'var_dump' => $requestData
            );
            // Set the Content-Type header to application/json
            header('Content-Type: application/json');

            // Encode the data as JSON and output it
            echo json_encode($data);
        }
    } catch (Exception $e) {
        // Handle the exception (e.g., log the error)
        $errorData = array(
            'isValidLogin' => false,
            'error' => 'An internal server error occurred',
            'errorMessage' => $e->getMessage(),
            'errorTrace' => $e->getTraceAsString()
        );
        // Set the Content-Type header to application/json
        header('Content-Type: application/json');

        // Encode the error data as JSON and output it
        echo json_encode($errorData);
    }
} else {
    $data = array(
        'isValidLogin' => false,
        'data' => $requestData
    );
    // Set the Content-Type header to application/json
    header('Content-Type: application/json');

    // Encode the data as JSON and output it
    echo json_encode($data);
}
?>
