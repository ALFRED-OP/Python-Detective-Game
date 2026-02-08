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
        $caseModel = new CaseModel($this->conn);
        $cases = $caseModel->getAll();

        // If user_id is provided, mark which cases are completed
        $userId = isset($_GET['user_id']) ? $_GET['user_id'] : null;
        if ($userId) {
            require_once '../models/SubmissionModel.php';
            $submissionModel = new SubmissionModel($this->conn);
            $completedCaseIds = $submissionModel->getUserProgress($userId);

            foreach ($cases as &$c) {
                $c['completed'] = in_array($c['id'], $completedCaseIds);
            }
        }
        else {
            foreach ($cases as &$c) {
                $c['completed'] = false;
            }
        }

        sendJson($cases);
    }

    public function getCase($id)
    {
        $case = new CaseModel($this->conn);
        $result = $case->getById($id);

        if ($result) {
            // Decode JSON fields for the frontend
            $result['suspects'] = json_decode($result['suspects_json']);
            $result['evidence'] = json_decode($result['evidence_json']);
            $result['hints'] = [
                'hint_1' => $result['hint_1'],
                'hint_2' => $result['hint_2']
            ];

            // Remove raw JSON strings and secrets if necessary
            // For now, keeping everything but maybe hiding hidden_test_code could be wise?
            // Actually, we NEVER send hidden_test_code to the client. That's for the backend only.
            unset($result['hidden_test_code']);
            unset($result['expected_output']); // Maybe hide this too? The user should not see the expected output directly in the API response?
            // Actually, for "expected output", sometimes it's shown in the UI "Target Output". But for "hidden test code", definitely hide.
            // Let's keep expected_output as it's often part of the problem description "Make it print X".

            unset($result['suspects_json']);
            unset($result['evidence_json']);

            sendJson($result);
        }
        else {
            sendJson(['error' => 'Case not found'], 404);
        }
    }
}
?>
