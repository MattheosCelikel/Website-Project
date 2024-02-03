<?php
require_once('config.php'); 

function getGenericInfo($food){
    // Now, you can use the $api_token variable from config.php
    $access_token = getToken();
    $api_url_generic = "https://foodapi.calorieking.com/v1/foods?region=us&query=" . urlencode($food);

    $headers = array(
        "Authorization: Basic " . base64_encode($access_token . ":"),
    );

    // Initialize cURL
    $ch = curl_init();

    // Set the cURL configurations
    curl_setopt($ch, CURLOPT_URL, $api_url_generic);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($ch);

    //checks for false response
    if ($response === false) {
        echo "cURL Error: " . curl_error($ch);
    } 
    else {
        $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        //if proper response is received (200 authentication check)
        if ($http_status === 200) {
            $data = json_decode($response, true);

        return $data;
        }
        // Close the cURL session
        curl_close($ch);
        }
    }

function getDetailedInfo($revision_id){

    // Now, you can use the $api_token variable from config.php
    $access_token = getToken();

    // Define the API URL for fetching nutrients using revision_id
    $api_url_revisionID = "https://foodapi.calorieking.com/v1/foods/{$revision_id}";
    
    $headers = array(
        "Authorization: Basic " . base64_encode($access_token . ":"),
    );

    // Initialize cURL
    $ch = curl_init();

    // Set the cURL configurations
    curl_setopt($ch, CURLOPT_URL, $api_url_revisionID);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // Set up a new request to get nutrient data
    curl_setopt($ch, CURLOPT_URL, $api_url_revisionID);
    $response = curl_exec($ch);

    if ($response === false) {
        echo "cURL Error: " . curl_error($ch);
    } else {
        $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($http_status === 200) {
            $data = json_decode($response, true);
            // Process and use the nutrient data as needed
            return ($data["food"]);
            //
        } else {
            echo "Request failed with status code: $http_status\n";
            echo "Response: $response\n";
        }
    }
    // Close the cURL session
    curl_close($ch);
}

function getSimilarFoods($food) {
    $genericInfo = getGenericInfo($food);

    if (!empty($genericInfo['foods'])) {
        $firstResultGeneric = $genericInfo['foods'][0];
        $firstResultRevision = $firstResultGeneric['revisionId'];

        $similarFoods = array();

        // Iterating through foods array
        foreach ($genericInfo['foods'] as $foodItem) {
            //Makes sure it is not first food
            if ($foodItem['revisionId'] !== $firstResultRevision) {
                // Add the current food to the list of similar foods
                $similarFoods[] = array(
                    'name' => $foodItem['name'],
                    'revisionId' => $foodItem['revisionId'],
                );
            }
        }

        //returns their "pizza" as the first pizza in the array
        echo "Your first " . $food . " is " . $firstResultGeneric['name'] . "\n\n\n\n";

        //shows all other "pizza" names
        foreach ($similarFoods as $similarFood) {
            echo "Similar Food Name: " . $similarFood['name'] . "\n";
            echo "Similar Food RevisionId: " . $similarFood['revisionId'] . "\n\n\n";
        }

        return $similarFoods;

    } else {
        return "No search results for the food: $food";
    }
}
?>
