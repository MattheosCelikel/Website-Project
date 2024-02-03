<?php
require_once(__DIR__ . '/../client.php');

session_start();

$rawData = file_get_contents("php://input");
$requestData = json_decode($rawData, true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Gets all Comments from id

    try {
        //This would be where rabbitmq checks if the user exists
        $client = createRabbitMQClient();

        $requestToServer = array();
        $requestToServer['type'] = "get_blog_comments";
        $requestToServer['BLOG_ID'] = $requestData['BLOG_ID'];
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

} else {
    $data = array(
        'errorCode' => 1,
        'data' => $requestData
    );
    // Set the Content-Type header to application/json
    header('Content-Type: application/json');

    // Encode the data as JSON and output it
    echo json_encode($data);
}

?>
