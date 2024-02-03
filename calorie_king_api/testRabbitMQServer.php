#!/usr/bin/php
<?php

require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');
require_once('foodData.php');

function requestProcessor($request)
{
  echo "beginnging of the function";
  
    if (isset($request['foodGenericData'])) 
    {
        $foodGenericData = getGenericInfo($request['foodGenericData']);

        if ($foodGenericData === false) {
          return array("error" => "Failed to retrieve food data.");
      }
      return $foodGenericData;

    }

    if (isset($request['foodDetailedData'])) 
    {
        $foodDetailedData = getDetailedInfo($request['foodDetailedData']);

        if ($foodDetailedData === false) {
          return array("error" => "Failed to retrieve food data.");
      }
      return $foodDetailedData;
    }
  
    echo "end of the function";
  return array("invalid request" => "Retry with valid input."); 
}

$server = new rabbitMQServer("testRabbitMQ.ini", "testRabbitMQServer");

echo "testRabbitMQServer BEGIN" . PHP_EOL;
$server->process_requests('requestProcessor');
echo "testRabbitMQServer END" . PHP_EOL;
exit();
?>


