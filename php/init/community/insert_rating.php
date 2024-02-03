<?php
require_once(__DIR__ . '/../client.php');

session_start();

$rawData = file_get_contents("php://input");
$requestData = json_decode($rawData, true);

// Check if the POST request is made
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Check if the USERNAME and PASSWORD fields are set in the POST data
        if (isset($requestData['RATING']) 
            && isset($requestData['MEAL_NAME'])
            && isset($requestData['COMMENT'])
        ) {
            // Retrieve the values from the POST data
            $rating = $requestData['RATING'];
            $mealName = $requestData['MEAL_NAME'];
            $comment = $requestData['COMMENT'];

            //This would be where rabbitmq checks if the user exists
            $client = createRabbitMQClient();

            $requestToServer = array();
            $requestToServer['type'] = "submit_ratings";
            $requestToServer['USER_ID'] = $_SESSION['userId'];
            $requestToServer['RATING'] = $rating;
            $requestToServer['MEAL_NAME'] = $mealName;
            $requestToServer['COMMENT'] = $comment;
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
                'errorCode' => 1,
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