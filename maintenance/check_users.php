<?php
require_once 'api/config/database.php';
$db = new Database();
$conn = $db->getConnection();
$stmt = $conn->query("SELECT username FROM users");
$users = $stmt->fetchAll(PDO::FETCH_COLUMN);
echo "EXISTING USERS: " . implode(", ", $users) . "\n";
