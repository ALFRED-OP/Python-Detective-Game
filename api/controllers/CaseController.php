<?php
require_once '../models/CaseModel.php';

class CaseController
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAllCases()
    {
        $user_id = $_GET['user_id'] ?? null;
        $case = new CaseModel($this->conn);
        $result = $case->getAll($user_id);
        sendJson($result);
    }

    public function getCase($id)
    {
        $user_id = $_GET['user_id'] ?? null;
        $case = new CaseModel($this->conn);
        $result = $case->getById($id, $user_id);

        if ($result) {
            // Decode JSON fields for the frontend
            $result['suspects'] = json_decode($result['suspects_json']);
            $result['evidence'] = json_decode($result['evidence_json']);
            $result['hints'] = [
                'hint_1' => $result['hint_1'],
                'hint_2' => $result['hint_2']
            ];

            // If user has saved code (draft), we send it. 
            $result['draft_code'] = $result['saved_code'] ?? null;

            unset($result['hidden_test_code']);
            unset($result['expected_output']);
            unset($result['suspects_json']);
            unset($result['evidence_json']);
            unset($result['saved_code']);

            sendJson($result);
        }
        else {
            sendJson(['error' => 'Case not found'], 404);
        }
    }

    public function addCase($data)
    {
        if (!isset($data['title']) || !isset($data['starting_code'])) {
            sendJson(['error' => 'Missing required fields'], 400);
        }

        $case = new CaseModel($this->conn);
        if ($case->create($data)) {
            sendJson(['message' => 'New case file archived successfully']);
        }
        else {
            sendJson(['error' => 'Failed to archive case file'], 503);
        }
    }
}
?>
