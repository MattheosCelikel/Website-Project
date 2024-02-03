<?php
require_once(__DIR__ . '/../client.php');

session_start();


// Gets all ratings

try {
    //This would be where rabbitmq checks if the user exists
    $client = createRabbitMQClient();

    $requestToServer = array();
    $requestToServer['type'] = "get_activity_list";
    $response = sendRequest($client, $requestToServer);

    // Set the Content-Type header to application/json
    header('Content-Type: application/json');

    // Encode the data as JSON and output it
    echo json_encode($response);

} catch (Exception $e) {
    // Handle the exception (e.g., log the error)
    $errorData = array(
        'errorCode' => 1,
        'error' => 'An internal server error occurred',
        'errorMessage' => $e->getMessage(),
        'errorTrace' => $e->getTraceAsString()
    );
    // Set the Content-Type header to application/json
    header('Content-Type: application/json');

    // Encode the error data as JSON and output it
    echo json_encode($errorData);
}

?>
