<?php
require_once '../models/User.php';

class AuthController
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function register($data)
    {
        if (!isset($data['username']) || !isset($data['password'])) {
            sendJson(['error' => 'Missing username or password'], 400);
        }

        $user = new User($this->conn);
        $user->username = $data['username'];
        $user->password = $data['password'];

        if ($user->usernameExists()) {
            sendJson(['error' => 'Username already exists'], 409);
        }

        if ($user->create()) {
            sendJson(['message' => 'User registered successfully']);
        }
        else {
            sendJson(['error' => 'Unable to register user'], 503);
        }
    }

    public function login($data)
    {
        if (!isset($data['username']) || !isset($data['password'])) {
            sendJson(['error' => 'Missing username or password'], 400);
        }

        $user = new User($this->conn);
        $user->username = $data['username'];
        $input_password = $data['password'];

        if ($user->usernameExists() && password_verify($input_password, $user->password)) {
            // Simple session/token mechanism. For hackathon/project, returning ID is often enough if insecure.
            // Preferably generating a JWT, but let's stick to basic ID return for simplicity unless requested otherwise.
            // Update: Project requirements ask for Auth. Let's return basic user info for the frontend to store in localStorage.

            $payload = [
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'xp' => $user->xp,
                    'rank' => $user->rank_title
                ]
            ];
            sendJson($payload);
        }
        else {
            sendJson(['error' => 'Invalid credentials'], 401);
        }
    }
}
?>
