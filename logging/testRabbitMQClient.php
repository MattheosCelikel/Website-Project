#!/usr/bin/php
<?php
require_once('path.inc');
require_once('get_host_info.inc');
require_once('rabbitMQLib.inc');

$client = new rabbitMQClient("testRabbitMQ.ini","testRabbitMQServer");
if (isset($argv[1]))
{
  $msg = $argv[1];
}
else
{
  $msg = "log Error Not Sent";
}
echo "client starting response: ";
$request = array();
$request['log'] = "This is a test";
$response = $client->send_request($request);

echo "client received response: ".PHP_EOL;
print_r($response);
echo "\n\n";

echo $argv[0]." END".PHP_EOL;

