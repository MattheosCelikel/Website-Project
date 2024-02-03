#!/usr/bin/php
<?php
require_once('./server_config/path.inc');
require_once('./server_config/get_host_info.inc');
require_once('./server_config/rabbitMQLib.inc');
function requestProcessor($request)
{
  return $request;
}

$server = new rabbitMQServer("./server_config/testRabbitMQ.ini","RabbitMQServer");

echo "testRabbitMQServer BEGIN".PHP_EOL;
$server->process_requests('requestProcessor');
echo "testRabbitMQServer END".PHP_EOL;
exit();
?>

