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
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;
        $case = new CaseModel($this->conn);
        $result = $case->getAll($user_id);
        sendJson($result);
    }

    public function getCase($id)
    {
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;
        $case = new CaseModel($this->conn);
        $result = $case->getById($id, $user_id);

        if ($result) {
            // Check if case is locked for this user
            if (isset($result['status']) && $result['status'] === 'locked') {
                sendJson(['error' => 'Case is locked. Complete previous cases to unlock.'], 403);
            }

            // Decode JSON fields for the frontend
            $result['suspects'] = json_decode($result['suspects_json']);
            $result['evidence'] = json_decode($result['evidence_json']);
            $result['hints'] = [
                'hint_1' => $result['hint_1'],
                'hint_2' => $result['hint_2']
            ];

            unset($result['hidden_test_code']);
            // If user has already solved it, we might want to return the expected output for reference?
            // But let's keep it consistent.

            unset($result['suspects_json']);
            unset($result['evidence_json']);

            sendJson($result);
        }
        else {
            sendJson(['error' => 'Case not found'], 404);
        }
    }

    public function saveDraft($id, $data)
    {
        if (!isset($data['user_id']) || !isset($data['code'])) {
            sendJson(['error' => 'Missing fields'], 400);
        }

        $user_id = $data['user_id'];
        $code = $data['code'];

        // Size limit: 50KB
        if (strlen($code) > 50 * 1024) {
            sendJson(['error' => 'Draft exceeds size limit (50KB)'], 400);
        }

        $case = new CaseModel($this->conn);
        $result = $case->saveDraft($user_id, $id, $code);

        if ($result === true) {
            sendJson(['message' => 'Draft saved successfully']);
        }
        elseif (isset($result['error'])) {
            sendJson(['error' => $result['error']], $result['code'] ?? 500);
        }
        else {
            sendJson(['error' => 'Failed to save draft'], 500);
        }
    }
}
?>
