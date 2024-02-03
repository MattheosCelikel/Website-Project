<?php

    require_once(__DIR__ . '/../../config/get_host_info.inc');

    require_once(__DIR__ . '/../../config/rabbitMQLib.inc');

    function createRabbitMQClient(): rabbitMQClient{
        return new rabbitMQClient(__DIR__ . "/../../config/testRabbitMQ.ini","RabbitMQServer");
    }

    function sendRequest($client, $array): array{
        $response = $client->send_request($array);
        return $response;
    }

?>