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
            $firstName = $requestData["FIRST_NAME"];
            $lastName = $requestData["LAST_NAME"];
            $email = $requestData["EMAIL"];
            $phoneNumber = $requestData["PHONE_NUMBER"];
            //This would be where rabbitmq checks if the user exists
            $client = createRabbitMQClient();

            $requestToServer = array();
            $requestToServer['type'] = "create";
            $requestToServer['USERNAME'] = $username;
            $requestToServer['PASSWORD'] = password_hash($password, PASSWORD_DEFAULT);
            $requestToServer['FIRST_NAME'] = $firstName;
            $requestToServer['LAST_NAME'] = $lastName;
            $requestToServer['EMAIL'] = $email;
            $requestToServer['PHONE_NUMBER'] = $phoneNumber;
            $response = sendRequest($client, $requestToServer);

            $data = array(
                'isCreated' => $response['isCreated']
            );
            // Set the Content-Type header to application/json
            header('Content-Type: application/json');

            // Encode the data as JSON and output it
            echo json_encode($data);
        } else {
            $data = array(
                'isCreated' => false,
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
            'isCreated' => false,
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
        'isCreated' => false,
        'data' => $requestData
    );
    // Set the Content-Type header to application/json
    header('Content-Type: application/json');

    // Encode the data as JSON and output it
    echo json_encode($data);
}
?>
