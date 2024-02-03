<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

function doLogin($USERNAME,$PASSWORD)
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);
  var_dump($mydb);
  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "select * from USERS where USERNAME = '$USERNAME'";

  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  echo $USERNAME;
  echo $PASSWORD;
  if ($response->num_rows > 0) {
    $data = array(); // Initialize an empty array to store the results
    echo '$data';
    while ($row = $response->fetch_assoc()) {
      if(password_verify($PASSWORD, $row["PASSWORD"])){
        $data[] = $row; // Append each row to the array
      }
    }
    return array("returnCode" => '1', 
    'isLoggedIn'=>true, 
    "USER_ID"=>$data[0]["USER_ID"], 
    "USERNAME" =>$data[0]['USERNAME'], 
    "FIRST_NAME" =>$data[0]['FIRST_NAME'],
    "LAST_NAME" =>$data[0]['LAST_NAME'],
    "EMAIL" =>$data[0]['EMAIL'],
    "PHONE_NUMBER" =>$data[0]['PHONE_NUMBER']);  // Results found
  } 
  else {
      return array("returnCode" => '0', 'isLoggedIn'=>false); // No results found
  }
}

function createUser($USERNAME, $PASSWORD, $FIRST_NAME, $LAST_NAME, $EMAIL, $PHONE_NUMBER)
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "INSERT INTO USERS (USERNAME, PASSWORD, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER) VALUES ('$USERNAME', '$PASSWORD', '$FIRST_NAME', '$LAST_NAME', '$EMAIL', '$PHONE_NUMBER')";

  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    return array("returnCode" => '1', 'isCreated'=>true);  // Created
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>false); // Not created
  }
}
function inputMetrics($USER_ID, $MEASUREMENT_HEIGHT, $MEASUREMENT_WEIGHT, $GENDER,$AGE,$HEIGHT,$WEIGHT,$BODYFAT,$ACTIVITY,$GOAL)
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  $query = "select * from METRICS where USER_ID = '$USER_ID'";

  $response = $mydb->query($query);

  echo "successfully connected to database".PHP_EOL;
  //there is a user
  if($response->num_rows > 0){
    $query = "UPDATE METRICS SET 
      MEASUREMENT_HEIGHT_TYPE = '$MEASUREMENT_HEIGHT',
      MEASUREMENT_WEIGHT_TYPE = '$MEASUREMENT_WEIGHT',
      GENDER = '$GENDER', 
      AGE = '$AGE', 
      HEIGHT = '$HEIGHT', 
      WEIGHT = '$WEIGHT', 
      BODYFAT = '$BODYFAT', 
      ACTIVITY_ID = '$ACTIVITY',
      GOAL = '$GOAL'
    WHERE 
      USER_ID = '$USER_ID'";
    echo "SQL Query: $query" . PHP_EOL;
    $response = $mydb->query($query);
    if ($mydb->errno != 0)
    {
      echo "failed to execute query:".PHP_EOL;
      echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
      return false;
      exit(0);
    }
    $mydb->close();
    // Check if there are any results
    if ($response) {
      return array("returnCode" => '1', 'isUpdated'=>true);  // Created
    } 
    else {
        return array("returnCode" => '0', 'isUpdated'=>false); // Not created
    }
  }
  //there isnt a user
  else{
    $query = "INSERT INTO METRICS (USER_ID, MEASUREMENT_HEIGHT_TYPE, MEASUREMENT_WEIGHT_TYPE, GENDER, AGE, HEIGHT, WEIGHT, BODYFAT, ACTIVITY_ID, GOAL)
    VALUES ('$USER_ID', '$MEASUREMENT_HEIGHT', '$MEASUREMENT_WEIGHT', '$GENDER', '$AGE', '$HEIGHT', '$WEIGHT', '$BODYFAT', '$ACTIVITY', '$GOAL')";
    echo "SQL Query: $query" . PHP_EOL;
    $response = $mydb->query($query);
    if ($mydb->errno != 0)
    {
      echo "failed to execute query:".PHP_EOL;
      echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
      return false;
      exit(0);
    }
    $mydb->close();
    // Check if there are any results
    if ($response) {
      return array("returnCode" => '1', 'isCreated'=>'true');  // Created
    } 
    else {
        return array("returnCode" => '0', 'isCreated'=>'false'); // Not created
    }
  }
}

function getActivityList()
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "select * from ACTIVITY_LEVEL";

  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  var_dump($response);
  echo "this is working";
  if ($response->num_rows > 0) {
    $data = array(); // Initialize an empty array to store the results

    while ($row = $response->fetch_assoc()) {
        $data[] = $row; // Append each row to the array
    }
    return $data;  // Results found
  } 
  else {
      return array("returnCode" => '0'); // No results found
  }
}

function submitBlogPost($USER_ID, $USER_TEXT, $BLOG_TITLE)
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "INSERT INTO BLOG_POSTS (USER_ID, USER_TEXT, BLOG_TITLE)
  VALUES ('$USER_ID', '$USER_TEXT', '$BLOG_TITLE')";
  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    return array("returnCode" => '1', 'isCreated'=>true);  // Created
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>false); // Not created
  }
}

function getMetrics($USER_ID)
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "SELECT * FROM METRICS WHERE USER_ID = '$USER_ID'";
  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    $data = array(); // Initialize an empty array to store the results

    while ($row = $response->fetch_assoc()) {
        $data = $row; // Append each row to the array
    }
    return $data;  // Results found
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>'false'); // Not created
  }
}

function getBlogPosts()
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "SELECT BLOG_ID, USERNAME, USER_TEXT, BLOG_TITLE FROM BLOG_POSTS BP INNER JOIN USERS U ON BP.USER_ID = U.USER_ID";
  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    $data = array(); // Initialize an empty array to store the results

    while ($row = $response->fetch_assoc()) {
        $data[] = $row; // Append each row to the array
    }
    return $data;  // Results found
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>false); // Not created
  }
}

function submitRatings($USER_ID, $RATING, $MEAL_NAME, $COMMENT)
{
  //come back to this
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "INSERT INTO RATINGS (USER_ID, RATING, MEAL_NAME, COMMENT)
  VALUES ('$USER_ID', '$RATING', '$MEAL_NAME', '$COMMENT')";
  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    return array("returnCode" => '1', 'isCreated'=>true);  // Created
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>false); // Not created
  }
}

function getRatings()
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "SELECT RATING_ID, USERNAME, RATING, MEAL_NAME, COMMENT FROM RATINGS BP INNER JOIN USERS U ON BP.USER_ID = U.USER_ID";
  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    $data = array(); // Initialize an empty array to store the results

    while ($row = $response->fetch_assoc()) {
        $data[] = $row; // Append each row to the array
    }
    return $data;  // Results found
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>'false'); // Not created
  }
}

function submitMealsAndExcercises($USER_ID, $MEAL, $EXERCISE)
{
  //come back to this
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "INSERT INTO MEALS_EATEN (USER_ID, MEAL) VALUES ('$USER_ID', '$MEAL')";
  $query2 = "INSERT INTO EXERCISES (USER_ID, EXERCISE) VALUES ('$USER_ID', '$EXERCISE')";
  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  $response2 = $mydb->query($query2);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response && $response2) {
    return array("returnCode" => '1', 'isCreated'=>'true');  // Created
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>'false'); // Not created
  }
}

function getMealsAndExcercises($USER_ID)
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "Select * from MEALS_EATEN WHERE USER_ID = '$USER_ID'";
  $query2= "Select * from EXERCISES WHERE USER_ID = '$USER_ID'";
  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  $response2 = $mydb->query($query2);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response && $response2) {
    $data = array(
      "MEALS_EATEN" => array(), // Initialize an empty array for MEALS_EATEN
      "EXERCISES" => array() // Initialize an empty array for EXERCISES
    );
    
    while ($row = $response->fetch_assoc()) {
        $data["MEALS_EATEN"][] = $row; // Append each row to the MEALS_EATEN array
    }
    
    while ($row = $response2->fetch_assoc()) {
        $data["EXERCISES"][] = $row; // Append each row to the EXERCISES array
    }  
    return $data;
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>'false'); // Not created
  }
}

function getMealRecommendation()
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "SELECT * FROM MEALS";
  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    $data = array(); // Initialize an empty array to store the results

    while ($row = $response->fetch_assoc()) {
        $data[] = $row; // Append each row to the array
    }
    return $data;  // Results found
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>'false'); // Not created
  }
}

function fetchMealData($CALORIES, $FAT, $TOTAL_CARBS, $PROTEIN)
{
    // Start building the base query
    $query = "SELECT * FROM MEALS WHERE 1";

    // Add conditions for optional parameters
    if ($CALORIES !== null) {
      $query .= " AND CALORIES <= " . $CALORIES;
    }
    
    if ($FAT !== null) {
        $query .= " AND FAT <= " . $FAT;
    }

    if ($TOTAL_CARBS !== null) {
        $query .= " AND TOTAL_CARBS <= " . $TOTAL_CARBS;
    }

    if ($PROTEIN !== null) {
        $query .= " AND PROTEIN <= " . $PROTEIN;
    }

    // Add LIMIT 1 to get only the first result
    $query .= " LIMIT 1";

    // Establish the database connection
    $mydb = new mysqli('127.0.0.1', 'testUser', '12345', 'testdb', 2500);

    // Check the connection
    if ($mydb->connect_error) {
        die("Connection failed: " . $mydb->connect_error);
    }

    // Execute the query and fetch the result
    $result = $mydb->query($query);

    // Check if the query was successful
    if ($result) {
        // Fetch the first row from the result set
        $row = $result->fetch_assoc();

        // Close the result set
        $result->close();
    } else {
        // Handle the case where the query fails
        echo "Error executing query: " . $mydb->error;
        $row = null;
    }

    // Close the database connection
    $mydb->close();

    // Return the fetched data
    return $row;
}

function isInMeals($optionalParameters)
{
    // Start building the base query
    $query = "SELECT * FROM MEALS WHERE 1";

    // Add conditions for optional parameters
    if ($optionalParameters['fat'] !== null) {
        $query .= " AND FAT <= " . $optionalParameters['fat'];
    }

    if ($optionalParameters['carbs'] !== null) {
        $query .= " AND TOTAL_CARBS <= " . $optionalParameters['carbs'];
    }

    if ($optionalParameters['protein'] !== null) {
        $query .= " AND PROTEIN <= " . $optionalParameters['protein'];
    }

    // Add LIMIT 1 to get only the first result
    $query .= " LIMIT 1";

    // Establish the database connection
    $mydb = new mysqli('127.0.0.1', 'testUser', '12345', 'testdb', 2500);

    // Check the connection
    if ($mydb->connect_error) {
        die("Connection failed: " . $mydb->connect_error);
    }

    // Execute the query and fetch the result
    $result = $mydb->query($query);

    // Check if the query was successful
    if ($result) {
        // Check the number of rows fetched
        $rowCount = $result->num_rows;

        // Close the result set
        $result->close();
    } else {
        // Handle the case where the query fails
        echo "Error executing query: " . $mydb->error;
        $rowCount = 0;
    }

    // Close the database connection
    $mydb->close();

    // Return true if the number of rows is greater than 0, false otherwise
    return $rowCount > 0;
}

function createCustomMeals($ENERGY, $FAT, $SATURATED_FAT, $TRANS_FAT, $CHOLESTROL, $SODIUM, $TOTAL_CARBOHYDRATE, $FIBER, $SUGAR, 
$PROTEIN, $VITAMIN_A, $VITAMIN_C, $CALCIUM, $IRON, $POLY_UNSATURATED_FAT, $MONO_UNATURATED_FAT, 
$OMEGA3, $NET_CARBOHYDRATE, $SUGAR_ALCOHOL, $ALCOHOL, $POTASSIUM, $CAFFEINE, $IS_CUSTOM){
  $mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "INSERT INTO MEALS (ENERGY, FAT, SATURATED_FAT, TRANS_FAT, CHOLESTROL, SODIUM, TOTAL_CARBOHYDRATE, FIBER, SUGAR, 
  PROTEIN, VITAMIN_A, VITAMIN_C, CALCIUM, IRON, POLY_UNSATURATED_FAT, MONO_UNATURATED_FAT, 
  OMEGA3, NET_CARBOHYDRATE, SUGAR_ALCOHOL, ALCOHOL, POTASSIUM, CAFFEINE, IS_CUSTOM) VALUES ('$ENERGY', '$FAT', '$SATURATED_FAT', '$TRANS_FAT', '$CHOLESTROL', '$SODIUM', '$TOTAL_CARBOHYDRATE', '$FIBER', '$SUGAR', '$PROTEIN', '$VITAMIN_A', '$VITAMIN_C', '$CALCIUM', '$IRON', '$POLY_UNSATURATED_FAT', '$MONO_UNATURATED_FAT', '$OMEGA3', '$NET_CARBOHYDRATE', '$SUGAR_ALCOHOL', '$ALCOHOL', '$POTASSIUM', '$CAFFEINE', 1)";

  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    return array("returnCode" => '1', 'isCreated'=>'true');  // Created
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>'false'); // Not created
  }
}

function insertApiIntoMeals($MEAL_NAME, $INGREDIENTS, $CALORIES, $ENERGY, $FAT, $SATURATED_FAT, $TRANS_FAT, $CHOLESTROL, $SODIUM, $TOTAL_CARBOHYDRATE, $FIBER, $SUGAR, 
$PROTEIN, $VITAMIN_A, $VITAMIN_C, $CALCIUM, $IRON, $POLY_UNSATURATED_FAT, $MONO_UNATURATED_FAT, 
$OMEGA3, $NET_CARBOHYDRATE, $SUGAR_ALCOHOL, $ALCOHOL, $POTASSIUM, $CAFFEINE, $IS_CUSTOM, $REVISION_ID, $MEAL){
  $mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "INSERT INTO MEALS (MEAL_NAME, INGREDIENTS, CALORIES, ENERGY, FAT, SAT_FAT, 
  CHOLESTEROL, SODIUM, TOTAL_CARBS, FIBER, SUGAR, 
  PROTEIN, VITAMIN_A, VITAMIN_C, CALCIUM, IRON, POLY_UNSAT_FAT, MONO_UNSAT_FAT, 
  ALCOHOL, POTASSIUM, CAFFEINE, IS_CUSTOM, REVISION_ID) VALUES ('$MEAL_NAME','$INGREDIENTS','$CALORIES','$ENERGY', '$FAT', '$SATURATED_FAT', 
  '$CHOLESTROL', '$SODIUM', '$TOTAL_CARBOHYDRATE', '$FIBER', '$SUGAR', '$PROTEIN', '$VITAMIN_A', '$VITAMIN_C', '$CALCIUM', '$IRON', 
  '$POLY_UNSATURATED_FAT', '$MONO_UNATURATED_FAT', '$ALCOHOL', '$POTASSIUM', '$CAFFEINE', 0, $REVISION_ID)";

 
  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $DAY_OF_MONTH = date('d');      // Day with leading zeros (01 - 31)
  $MONTH_OF_YEAR = date('m');    // Month with leading zeros (01 - 12)
  $YEAR = date('Y');   

  $query = "INSERT INTO ALL_MEALS_NAMES (REVISION_ID, MEAL, DAY_OF_MONTH, MONTH_OF_YEAR, YEAR)
  VALUES ('$REVISION_ID','$MEAL', '$DAY_OF_MONTH', '$MONTH_OF_YEAR', '$YEAR')";

  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
    exit(0);
  }

    $mydb->close();
    // Check if there are any results
    if ($response) {
      return array("returnCode" => '1', 'isCreated'=>'true');  // Created
    } 
    else {
        return array("returnCode" => '0', 'isCreated'=>'false'); // Not created
    }
}

function getBlogComments($BLOG_ID)
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "SELECT U.USERNAME, BC.BLOG_TEXTS, DATE_FORMAT(BC.BLOG_DATE, '%m/%d/%Y') AS BLOG_DATE
          FROM BLOG_COMMENTS BC
          INNER JOIN USERS U ON BC.USER_ID = U.USER_ID
          WHERE BC.BLOG_ID = $BLOG_ID";

  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    $data = array(); // Initialize an empty array to store the results

    while ($row = $response->fetch_assoc()) {
        $data[] = $row; // Append each row to the array
    }
    return $data;  // Results found
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>false); // Not created
  }
}

function submitBlogComments($USER_ID, $BLOG_DATE, $BLOG_TEXT, $BLOG_ID)
{
  //come back to this
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "INSERT INTO BLOG_COMMENTS (USER_ID, BLOG_DATE, BLOG_TEXTS, BLOG_ID)
  VALUES ('$USER_ID', '$BLOG_DATE', '$BLOG_TEXT', '$BLOG_ID')";
  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    return array("returnCode" => '1', 'isCreated'=>true);  // Created
  } 
  else {
      return array("returnCode" => '0', 'isCreated'=>false); // Not created
  }
}

function updateUsers($USER_ID, $USERNAME, $FIRST_NAME, $LAST_NAME, $EMAIL, $PHONE_NUMBER)
{
	$mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);

  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "UPDATE USERS SET 
              USERNAME = '$USERNAME', 
              FIRST_NAME = '$FIRST_NAME', 
              LAST_NAME = '$LAST_NAME', 
              EMAIL = '$EMAIL', 
              PHONE_NUMBER = '$PHONE_NUMBER'
          WHERE USER_ID = $USER_ID";


  echo "SQL Query: $query" . PHP_EOL;
  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  if ($response) {
    return array("returnCode" => '1', 'isUpdated'=>true);
  } 
  else {
      return array("returnCode" => '0', 'isUpdated'=>false); // Not created
  }
}

function getNotificationData($USER_ID){
  $mydb = new mysqli('127.0.0.1','testUser','12345','testdb', 2500);
  var_dump($mydb);
  if ($mydb->errno != 0)
  {
    echo "failed to connect to database: ". $mydb->error . PHP_EOL;
  	exit(0);
  }

  echo "successfully connected to database".PHP_EOL;

  $query = "select * from NOTIFICATIONS where USER_ID = '$USER_ID'";

  $response = $mydb->query($query);
  if ($mydb->errno != 0)
  {
    echo "failed to execute query:".PHP_EOL;
    echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
    return false;
  	exit(0);
  }
  $mydb->close();
  // Check if there are any results
  echo $USER_ID . PHP_EOL;
  if ($response->num_rows > 0) {
    $data = array(); // Initialize an empty array to store the results
    echo '$data';
    while ($row = $response->fetch_assoc()) {
      $data[] = $row; // Append each row to the array
    }
    return array("returnCode" => '0', 
    "USER_ID"=>$data[0]["USER_ID"], 
    "CAN_NOTIFY_USER" =>$data[0]['CAN_NOTIFY_USER'] == 1? true: false, 
    "IS_NOTIFIED_BLOG" =>$data[0]['IS_NOTIFIED_BLOG'] == 1? true: false,
    "IS_NOTIFIED_JOURNAL" =>$data[0]['IS_NOTIFIED_JOURNAL'] == 1? true: false
  );  // Results found
  } 
  else {
    return array("returnCode" => '1', 
    "USER_ID"=>$USER_ID, 
    "CAN_NOTIFY_USER" => false, 
    "IS_NOTIFIED_BLOG" => false,
    "IS_NOTIFIED_JOURNAL" => false
  );// No results found
  }
}

function updateNotificationData($USER_ID, $CAN_NOTIFY_USER, $IS_NOTIFIED_BLOG, $IS_NOTIFIED_JOURNAL) {
  $mydb = new mysqli('127.0.0.1', 'testUser', '12345', 'testdb', 2500);

  if ($mydb->errno != 0) {
      echo "failed to connect to database: " . $mydb->error . PHP_EOL;
      exit(0);
  }

  echo "successfully connected to the database" . PHP_EOL;

  // Use the INSERT ... ON DUPLICATE KEY UPDATE syntax
  $query = "INSERT INTO NOTIFICATIONS (USER_ID, CAN_NOTIFY_USER, IS_NOTIFIED_BLOG, IS_NOTIFIED_JOURNAL)
            VALUES ('$USER_ID', '$CAN_NOTIFY_USER', '$IS_NOTIFIED_BLOG', '$IS_NOTIFIED_JOURNAL')
            ON DUPLICATE KEY UPDATE
            CAN_NOTIFY_USER = VALUES(CAN_NOTIFY_USER),
            IS_NOTIFIED_BLOG = VALUES(IS_NOTIFIED_BLOG),
            IS_NOTIFIED_JOURNAL = VALUES(IS_NOTIFIED_JOURNAL)";

  $response = $mydb->query($query);

  if ($mydb->errno != 0) {
      echo "failed to execute query:" . PHP_EOL;
      echo __FILE__ . ':' . __LINE__ . ":error: " . $mydb->error . PHP_EOL;
      return false;
      exit(0);
  }

  $mydb->close();

  // Check if there are any results
  if ($response) {
      return array("returnCode" => '0', 'isUpdated' => true);  // Created or updated
  } else {
      return array("returnCode" => '1', 'isUpdated' => false); // Not created or updated
  }
}

?>