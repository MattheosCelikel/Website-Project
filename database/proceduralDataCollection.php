<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');
require_once('dbFunctions.php');


$client = new rabbitMQClient("proceduralDataCollection.ini","testRabbitMQServer");
if (isset($argv[2]))
{
  $msg = $argv[2];
}
else
{
  $msg = "test message";
}

if (isset($argv[1]))
{
  $type = $argv[1];
}
else
{
  $type = "test message";
}

$request = array();
$request[$type] = trim($msg, '"');
$response = $client->send_request($request);

if($type == 'foodGenericData'){
    echo json_encode($response['foods'][0]['revisionId']);
}
else{ 
    var_dump($response);
    $MEAL_NAME = $response['nutrients']['mealName'] ?? 0;
    $INGREDIENTS = $response['nutrients']['Ingredients'] ?? 0;
    $CALORIES = $response['nutrients']['calories'] ?? 0;
    $ENERGY = $response['nutrients']['energy'] ?? 0;
    $FAT = $response['nutrients']['fat'] ?? 0;
    $SATURATED_FAT = $response['nutrients']['satFat'] ?? 0;
    $TRANS_FAT = 0; // Assuming it's not available in your array
    $CHOLESTEROL = $response['nutrients']['cholesterol'] ?? 0;
    $SODIUM = $response['nutrients']['sodium'] ?? 0;
    $TOTAL_CARBOHYDRATE = $response['nutrients']['totalCarbs'] ?? 0;
    $FIBER = $response['nutrients']['fiber'] ?? 0;
    $SUGAR = $response['nutrients']['sugar'] ?? 0;
    $PROTEIN = $response['nutrients']['protein'] ?? 0;
    $VITAMIN_A = $response['nutrients']['vitaminA'] ?? 0;
    $VITAMIN_C = $response['nutrients']['vitaminC'] ?? 0;
    $CALCIUM = $response['nutrients']['calcium'] ?? 0;
    $IRON = $response['nutrients']['iron'] ?? 0;
    $POLY_UNSATURATED_FAT = $response['nutrients']['polyUnsatFat'] ?? 0;
    $MONO_UNATURATED_FAT = $response['nutrients']['monoUnsatFat'] ?? 0;
    $OMEGA3 = 0; // Assuming it's not available in your array
    $NET_CARBOHYDRATE = 0; // Assuming it's not available in your array
    $SUGAR_ALCOHOL = 0; // Assuming it's not available in your array
    $ALCOHOL = 0; // Assuming it's not available in your array
    $POTASSIUM = $response['nutrients']['potassium'] ?? 0;
    $CAFFEINE = $response['nutrients']['caffeine'] ?? 0;
    $IS_CUSTOM = 0;
    $REVISION_ID = $msg;

// Call the function with the extracted values
insertApiIntoMeals(
    $MEAL_NAME, $INGREDIENTS, $CALORIES, $ENERGY, $FAT, $SATURATED_FAT, $TRANS_FAT, $CHOLESTEROL, $SODIUM, $TOTAL_CARBOHYDRATE, 
    $FIBER, $SUGAR, $PROTEIN, $VITAMIN_A, $VITAMIN_C, $CALCIUM, $IRON, $POLY_UNSATURATED_FAT, 
    $MONO_UNATURATED_FAT, $OMEGA3, $NET_CARBOHYDRATE, $SUGAR_ALCOHOL, $ALCOHOL, $POTASSIUM, 
    $CAFFEINE, $IS_CUSTOM, $REVISION_ID, $argv[3]

);
}
?>