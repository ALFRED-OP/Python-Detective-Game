<?php
require_once '../utils/cors.php';
require_once '../config/database.php';
require_once '../controllers/AuthController.php';
require_once '../controllers/CaseController.php';
require_once '../controllers/SubmissionController.php';

// Handle CORS
handleCors();

// Basic Router
$method = $_SERVER['REQUEST_METHOD'];

// Get the current script directory (e.g., /project/api/public)
$scriptDir = dirname($_SERVER['SCRIPT_NAME']);
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// If the URI starts with the script directory, strip it to get the relative path
if (strpos($requestUri, $scriptDir) === 0) {
    $requestUri = substr($requestUri, strlen($scriptDir));
}

$uriParts = explode('/', trim($requestUri, '/'));

$resource = isset($uriParts[0]) ? $uriParts[0] : null;
$action = isset($uriParts[1]) ? $uriParts[1] : null;

// Helper to get input
function getJsonInput()
{
    return json_decode(file_get_contents("php://input"), true);
}

// Helper to send response
function sendJson($data, $code = 200)
{
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

$db = new Database();
$conn = $db->getConnection();

if ($conn === null) {
    sendJson([
        'error' => 'Database connection failed',
        'message' => $db->last_error,
        'hint' => 'Please ensure your MySQL server is running and the "python_detective" database is created.'
    ], 500);
}

// --- ROUTING ---

// Auth Routes
if ($resource === 'auth') {
    $auth = new AuthController($conn);
    if ($method === 'POST' && $action === 'register') {
        $data = getJsonInput();
        $auth->register($data);
    }
    elseif ($method === 'POST' && $action === 'login') {
        $data = getJsonInput();
        $auth->login($data);
    }
    else {
        sendJson(['error' => 'Invalid Auth Endpoint'], 404);
    }
}
// Case Routes
elseif ($resource === 'cases') {
    $caseController = new CaseController($conn);
    if ($method === 'GET' && is_numeric($action)) {
        // Get single case
        $caseController->getCase($action);
    }
    elseif ($method === 'GET' && $action === null) {
        // Get all cases (list)
        $caseController->getAllCases();
    }
    else {
        sendJson(['error' => 'Invalid Case Endpoint'], 404);
    }
}
// Submission Routes
elseif ($resource === 'submit') {
    $submissionController = new SubmissionController($conn);
    if ($method === 'POST') {
        $data = getJsonInput();
        $submissionController->submit($data);
    }
    else {
        sendJson(['error' => 'Invalid Submission Endpoint'], 404);
    }
}
// Leaderboard Routes
elseif ($resource === 'leaderboard') {
    $submissionController = new SubmissionController($conn);
    if ($method === 'GET') {
        $submissionController->getLeaderboard();
    }
}
else {
    sendJson(['message' => 'Welcome to Python Detective API', 'status' => 'Running']);
}
?>
