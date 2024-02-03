#!/usr/bin/php
<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');
require_once('dbFunctions.php');

function requestProcessor($request)
{
  // echo "received request".PHP_EOL;
  if(!isset($request['type']))
  {
    return "ERROR: unsupported message type";
  }
  switch ($request['type'])
  {
    case "login":
      return doLogin($request['USERNAME'],$request['PASSWORD']);
    case "validate_session":
      return doValidate($request['sessionId']);
    case "create":
      return createUser($request['USERNAME'],$request['PASSWORD'],$request['FIRST_NAME'],$request['LAST_NAME'],$request['EMAIL'], $request['PHONE_NUMBER']);
    case "get_activity_list":
      return getActivityList();
    case "input_metrics":
      return inputMetrics($request['USER_ID'],$request['MEASUREMENT_HEIGHT_TYPE'],$request['MEASUREMENT_WEIGHT_TYPE'],$request['GENDER'],$request['AGE'],$request['HEIGHT'],$request['WEIGHT'],$request['BODYFAT'],$request['ACTIVITY'],$request['GOAL']);
    case "submit_blog_post":
      return submitBlogPost($request['USER_ID'],$request['USER_TEXT'], $request['BLOG_TITLE']);
    case "get_metrics":
      return getMetrics($request['USER_ID']);
    case "get_blog_posts":
      return getBlogPosts();
    case "submit_ratings":
      return submitRatings($request['USER_ID'],$request['RATING'],$request['MEAL_NAME'],$request['COMMENT']);
    case "get_ratings":
      return getRatings();
    case "submit_meals_and_excercises":
      return submitMealsAndExcercises($request['USER_ID'],$request['MEAL'],$request['EXERCISE']);
    case "get_meals_and_excercises":
      return getMealsAndExcercises($request['USER_ID']);
    case "get_meal_recommendation":
      return getMealRecommendation();
    case "get_blog_comments":
      return getBlogComments($request['BLOG_ID']);
    case "submit_blog_comments":
      return submitBlogComments($request['USER_ID'],$request['BLOG_DATE'],$request['BLOG_TEXT'],$request['BLOG_ID']);
    case "update_users":
      return updateUsers($request['USER_ID'],$request['USERNAME'],$request['FIRST_NAME'],$request['LAST_NAME'],$request['EMAIL'],$request['PHONE_NUMBER']);
    case "fetch_meal_data":
      return fetchMealData($request['CALORIES'], $request['FAT'], $request['TOTAL_CARBS'], $request['PROTEIN']);
    case "get_notification_data":
      return getNotificationData($request['USER_ID']);
    case "update_notification_data":
      return updateNotificationData($request['USER_ID'], $request['CAN_NOTIFY_USER'], $request['IS_NOTIFIED_BLOG'], $request['IS_NOTIFIED_JOURNAL']);
  }
  return array("returnCode" => '0', 'message'=>"Server received request and processed");
}

$server = new rabbitMQServer("testRabbitMQ.ini","testRabbitMQServer");

echo "testRabbitMQServer BEGIN".PHP_EOL;
$server->process_requests('requestProcessor');
echo "testRabbitMQServer END".PHP_EOL;
exit();
?>

