#!/usr/bin/php

<?php
require_once('foodData.php');

$foodName = "pizza";
//var_dump(getGenericInfo($foodName));
// var_dump(getDetailedInfo("63cbb677-e76c-43a6-b93d-e1ef9772548e"));
var_dump(getSimilarFoods($foodName));
?>