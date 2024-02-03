<?php
function fetchMealData($optionalParameters)
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
    $mydb = new mysqli('127.0.0.1', 'testUser', '12345', 'testdb');

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
    $mydb = new mysqli('127.0.0.1', 'testUser', '12345', 'testdb');

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

// Example usage:
$optionalParameters = array(
    'fat' => 15.0,
    'carbs' => null,
    'protein' => 20.0
);

$result = isInMeals($optionalParameters);
print_r($result);

?>