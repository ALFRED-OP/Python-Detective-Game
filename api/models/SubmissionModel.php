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
        // 1. Update current case status to 'completed' and clear saved_code
        $query = "INSERT INTO user_progress (user_id, case_id, completed, best_time, status, saved_code, completed_at) 
                  VALUES (:user_id, :case_id, 1, :time, 'completed', NULL, NOW())
                  ON DUPLICATE KEY UPDATE 
                  completed = 1, 
                  best_time = LEAST(best_time, :time_update), 
                  status = 'completed', 
                  saved_code = NULL,
                  completed_at = NOW()";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':case_id', $case_id);
        $stmt->bindParam(':time', $time_taken);
        $stmt->bindParam(':time_update', $time_taken);
        $stmt->execute();

        $rowsAffected = $stmt->rowCount();

        // 2. Unlock the next case
        $nextCaseQuery = "SELECT id FROM cases WHERE id > :case_id ORDER BY id ASC LIMIT 1";
        $nstmt = $this->conn->prepare($nextCaseQuery);
        $nstmt->bindParam(':case_id', $case_id);
        $nstmt->execute();
        $nextCase = $nstmt->fetch(PDO::FETCH_ASSOC);

        if ($nextCase) {
            $next_id = $nextCase['id'];
            // Check if already unlocked/completed
            $ucheck = "SELECT status FROM user_progress WHERE user_id = :user_id AND case_id = :next_id";
            $ustmt = $this->conn->prepare($ucheck);
            $ustmt->bindParam(':user_id', $user_id);
            $ustmt->bindParam(':next_id', $next_id);
            $ustmt->execute();
            $nextStatus = $ustmt->fetch(PDO::FETCH_ASSOC);

            if (!$nextStatus || $nextStatus['status'] === 'locked') {
                $unlock = "INSERT INTO user_progress (user_id, case_id, status) VALUES (:user_id, :next_id, 'unlocked')
                           ON DUPLICATE KEY UPDATE status = 'unlocked'";
                $ustmt = $this->conn->prepare($unlock);
                $ustmt->bindParam(':user_id', $user_id);
                $ustmt->bindParam(':next_id', $next_id);
                $ustmt->execute();
            }
        }

        return $rowsAffected > 0;
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
