<?php
class SubmissionModel
{
    private $conn;
    private $table_name = "submissions";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create($user_id, $case_id, $code, $status, $output_log, $exec_time)
    {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET user_id=:user_id, case_id=:case_id, code=:code, status=:status, 
                      output_log=:output_log, execution_time=:execution_time";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":user_id", $user_id);
        $stmt->bindParam(":case_id", $case_id);
        $stmt->bindParam(":code", $code);
        $stmt->bindParam(":status", $status);
        $stmt->bindParam(":output_log", $output_log);
        $stmt->bindParam(":execution_time", $exec_time);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getLeaderboard()
    {
        // Top 10 users by XP
        $query = "SELECT username, rank_title, xp FROM users ORDER BY xp DESC LIMIT 10";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserProgress($user_id)
    {
        // Return list of completed case IDs
        $query = "SELECT case_id FROM user_progress WHERE user_id = ? AND completed = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $user_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public function markCaseCompleted($user_id, $case_id, $time_taken)
    {
        // Check if already completed
        $check = "SELECT * FROM user_progress WHERE user_id = ? AND case_id = ?";
        $stmt = $this->conn->prepare($check);
        $stmt->bindParam(1, $user_id);
        $stmt->bindParam(2, $case_id);
        $stmt->execute();

        if ($stmt->rowCount() == 0) {
            // New completion
            $insert = "INSERT INTO user_progress (user_id, case_id, completed, best_time, completed_at) VALUES (?, ?, 1, ?, NOW())";
            $istmt = $this->conn->prepare($insert);
            $istmt->bindParam(1, $user_id);
            $istmt->bindParam(2, $case_id);
            $istmt->bindParam(3, $time_taken);
            $istmt->execute();
            return true; // First time complete
        }
        else {
            // Already completed, maybe update time?
            return false; // Not first time
        }
    }

    public function updateUserXp($user_id, $xp_gain)
    {
        $query = "UPDATE users SET xp = xp + ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $xp_gain);
        $stmt->bindParam(2, $user_id);
        $stmt->execute();
    }
}
?>
