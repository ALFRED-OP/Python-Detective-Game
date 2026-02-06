<?php
require_once 'api/config/database.php';
require_once 'api/models/User.php';

function sendJson($data, $code = 200)
{
    echo json_encode($data);
}

try {
    $db = new Database();
    $conn = $db->getConnection();

    $user = new User($conn);
    $user->username = "testuser_" . time();
    $user->password = "password123";

    echo "Attempting to create user: " . $user->username . "\n";
    if ($user->create()) {
        echo "SUCCESS: User created.\n";
    }
    else {
        echo "FAILURE: SQL Error Info: ";
        print_r($conn->errorInfo());
        echo "\n";
    }
}
catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
