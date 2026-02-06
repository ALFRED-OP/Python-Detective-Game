<?php
require_once '../models/SubmissionModel.php';
require_once '../models/CaseModel.php';

class SubmissionController
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function submit($data)
    {
        // Expect: user_id, case_id, code
        if (!isset($data['user_id']) || !isset($data['case_id']) || !isset($data['code'])) {
            sendJson(['error' => 'Missing fields'], 400);
        }

        $user_id = $data['user_id'];
        $case_id = $data['case_id'];
        $code = $data['code'];

        // 1. Get Case Details (Expected Output)
        $caseModel = new CaseModel($this->conn);
        $caseData = $caseModel->getById($case_id);

        if (!$caseData) {
            sendJson(['error' => 'Case not found'], 404);
        }

        // 2. Run Python Code
        $runnerPath = realpath(__DIR__ . '/../../engine/runner.py');
        $pythonCmd = "python"; // Assume 'python' is in PATH. Adjust if 'python3' needed.

        // Construct payload
        $payload = json_encode(['code' => $code]);

        // Use descriptorspec to pass stdin
        $descriptorspec = [
            0 => ["pipe", "r"], // stdin
            1 => ["pipe", "w"], // stdout
            2 => ["pipe", "w"] // stderr
        ];

        $process = proc_open("$pythonCmd \"$runnerPath\"", $descriptorspec, $pipes);

        $executionResult = [];

        if (is_resource($process)) {
            // Write to stdin
            fwrite($pipes[0], $payload);
            fclose($pipes[0]);

            // Read stdout
            $stdout = stream_get_contents($pipes[1]);
            fclose($pipes[1]);

            // Read stderr
            $stderr = stream_get_contents($pipes[2]);
            fclose($pipes[2]);

            $return_value = proc_close($process);

            // Parse Runner JSON Output
            // runner.py prints json to stdout
            $executionResult = json_decode($stdout, true);

            // If json decode fails (maybe runner crashed or printed garbage), fallback
            if (!$executionResult) {
                $executionResult = [
                    'stdout' => $stdout,
                    'stderr' => $stderr . "\nJSON Parse Error from Runner",
                    'error' => 'Runner Output Invalid'
                ];
            }
        }
        else {
            $executionResult = ['error' => 'Failed to start runner process'];
        }

        // 3. Compare Output
        $status = 'Failed';
        $user_output = trim($executionResult['stdout'] ?? '');
        $expected = trim($caseData['expected_output']);

        // Normalize line endings
        $user_output = str_replace("\r\n", "\n", $user_output);
        $expected = str_replace("\r\n", "\n", $expected);

        // Check for runtime errors
        if (!empty($executionResult['error'])) {
            $status = 'Error';
        }
        elseif ($user_output === $expected) {
            $status = 'Passed';
        }

        // 4. Save Submission
        $submissionModel = new SubmissionModel($this->conn);
        $exec_time = 0.5; // Placeholder, or calculate from start/end time of proc_open

        $submissionModel->create(
            $user_id,
            $case_id,
            $code,
            $status,
            $user_output . ($executionResult['stderr'] ? "\nSTDERR: " . $executionResult['stderr'] : ""),
            $exec_time
        );

        // 5. Update Progress & XP if passed
        $xp_gained = 0;
        $first_completion = false;

        if ($status === 'Passed') {
            $is_new = $submissionModel->markCaseCompleted($user_id, $case_id, $exec_time);
            if ($is_new) {
                $xp_gained = $caseData['xp_reward'];
                $submissionModel->updateUserXp($user_id, $xp_gained);
                $first_completion = true;
            }
        }

        // 6. Return Response
        sendJson([
            'status' => $status,
            'output' => $user_output,
            'error' => $executionResult['error'] ?? null,
            'stderr' => $executionResult['stderr'] ?? null,
            'expected' => $expected,
            'xp_gained' => $xp_gained,
            'first_completion' => $first_completion
        ]);
    }

    public function getLeaderboard()
    {
        $model = new SubmissionModel($this->conn);
        $data = $model->getLeaderboard();
        sendJson($data);
    }
}
?>
