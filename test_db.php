<?php
require_once 'api/config/database.php';
try {
    $db = new Database();
    $conn = $db->getConnection();
    if ($conn) {
        echo "SUCCESS: Connected to database 'python_detective'\n";
    }
    else {
        echo "FAILURE: Connection returned null\n";
    }
}
catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
