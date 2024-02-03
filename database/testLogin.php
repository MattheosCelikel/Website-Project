#!/usr/bin/php
<?php

$mydb = new mysqli('25.37.15.9','testUser','12345','testdb');

if ($mydb->connect_error) {
    die("Connection failed: " . $mydb->connect_error);
}
if ($mydb->errno != 0)
{
	echo "failed to connect to database: ". $mydb->error . PHP_EOL;
	exit(0);
}

echo "successfully connected to database".PHP_EOL;

$query = "select * from students;";

$response = $mydb->query($query);
if ($mydb->errno != 0)
{
	echo "failed to execute query:".PHP_EOL;
	echo __FILE__.':'.__LINE__.":error: ".$mydb->error.PHP_EOL;
	exit(0);
}

echo($response);

?>
