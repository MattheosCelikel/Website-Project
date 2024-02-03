<?php
require_once(__DIR__ . '/../client.php');

session_start();

$rawData = file_get_contents("php://input");
$requestData = json_decode($rawData, true);

// Check if the POST request is made
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Check fields are set in the post data
        if (isset($requestData['HEIGHT']) &&
            isset($requestData['HEIGHT_TYPE']) &&
            isset($requestData['WEIGHT']) &&
            isset($requestData['WEIGHT_TYPE']) &&
            isset($requestData['GENDER']) &&
            isset($requestData['AGE']) &&
            isset($requestData['BODY_FAT']) &&
            isset($requestData['ACTIVITY_ID']) &&
            isset($requestData['GOAL'])
            ) {
            // Retrieve the values from the POST data
            $height = $requestData['HEIGHT'];
            $heightType = $requestData['HEIGHT_TYPE'];
            $weight = $requestData['WEIGHT'];
            $weightType = $requestData['WEIGHT_TYPE'];
            $gender = $requestData['GENDER'];
            $age = $requestData['AGE'];
            $bodyFat = $requestData['BODY_FAT'];
            $activityId = $requestData['ACTIVITY_ID'];
            $goal = $requestData['GOAL'];

            //This would be where rabbitmq checks if the user exists
            $client = createRabbitMQClient();

            $requestToServer = array(
                'type' => "input_metrics",
                'USER_ID' => $_SESSION['userId'],
                'HEIGHT' => $height,
                'MEASUREMENT_HEIGHT_TYPE' => $heightType,
                'WEIGHT' => $weight,
                'MEASUREMENT_WEIGHT_TYPE' => $weightType,
                'GENDER' => $gender,
                'AGE' => $age,
                'BODYFAT' => $bodyFat,
                'ACTIVITY' => $activityId,
                'GOAL' => $goal
            );
            $response = sendRequest($client, $requestToServer);

            $data = array(
                'isUpdated' => $response['isUpdated']
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