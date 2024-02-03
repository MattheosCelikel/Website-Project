#!/usr/bin/php
<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');
require_once('log.php');

function requestProcessor($request)
{
  // echo "received request".PHP_EOL;
  if(!isset($request['log']))
  {
    return "ERROR: unsupported message type";
  }
  $cl = new CustomLogger();
  switch ($request['log'])
  {
    case "log":
      $cl->logError($request['log']);
    
  }
  return array("returnCode" => '1', 'message'=>"Server received request and processed");
}

$server = new rabbitMQServer("testRabbitMQ.ini","testRabbitMQServer");

echo "testRabbitMQServer BEGIN".PHP_EOL;
$server->process_requests('requestProcessor');
echo "testRabbitMQServer END".PHP_EOL;
exit();
?>

