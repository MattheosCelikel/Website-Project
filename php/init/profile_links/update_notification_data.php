<?php
require_once(__DIR__ . '/../client.php');

session_start();

$rawData = file_get_contents("php://input");
$requestData = json_decode($rawData, true);

// Check if the POST request is made
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        // Check fields are set in the post data
        if (isset($requestData['CAN_NOTIFY_USER']) &&
            isset($requestData['IS_NOTIFIED_BLOG']) &&
            isset($requestData['IS_NOTIFIED_JOURNAL'])
        ) {
            // Retrieve the values from the POST data
            $canNotifyUser = $requestData['CAN_NOTIFY_USER'];
            $isNotifiedBlog = $requestData['IS_NOTIFIED_BLOG'];
            $isNotifiedJournal = $requestData['IS_NOTIFIED_JOURNAL'];

            // This would be where rabbitmq checks if the user exists
            $client = createRabbitMQClient();

            $requestToServer = array(
                'type' => "update_notification_data",
                'USER_ID' => $_SESSION['userId'],
                'CAN_NOTIFY_USER' => $canNotifyUser,
                'IS_NOTIFIED_BLOG' => $isNotifiedBlog,
                'IS_NOTIFIED_JOURNAL' => $isNotifiedJournal
                // Add other variables if needed
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
                'error' => 'Required variables are not being set',
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
