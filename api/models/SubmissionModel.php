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

    public function saveDraft($user_id, $case_id, $code)
    {
        $check = "SELECT * FROM user_progress WHERE user_id = ? AND case_id = ?";
        $stmt = $this->conn->prepare($check);
        $stmt->bindParam(1, $user_id);
        $stmt->bindParam(2, $case_id);
        $stmt->execute();

        if ($stmt->rowCount() == 0) {
            $query = "INSERT INTO user_progress (user_id, case_id, saved_code) VALUES (?, ?, ?)";
        }
        else {
            $query = "UPDATE user_progress SET saved_code = ? WHERE user_id = ? AND case_id = ?";
        }

        $stmt = $this->conn->prepare($query);
        if ($stmt->rowCount() == 0) {
            $stmt->bindParam(1, $user_id);
            $stmt->bindParam(2, $case_id);
            $stmt->bindParam(3, $code);
        }
        else {
            $stmt->bindParam(1, $code);
            $stmt->bindParam(2, $user_id);
            $stmt->bindParam(3, $case_id);
        }
        return $stmt->execute();
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
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$row['completed']) {
                $update = "UPDATE user_progress SET completed = 1, best_time = ?, completed_at = NOW() WHERE user_id = ? AND case_id = ?";
                $ustmt = $this->conn->prepare($update);
                $ustmt->bindParam(1, $time_taken);
                $ustmt->bindParam(2, $user_id);
                $ustmt->bindParam(3, $case_id);
                $ustmt->execute();
                return true;
            }
            return false;
        }
    }

    public function updateUserXp($user_id, $xp_gain)
    {
        // 1. Update XP
        $query = "UPDATE users SET xp = xp + ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $xp_gain);
        $stmt->bindParam(2, $user_id);
        $stmt->execute();

        // 2. Recalculate Rank
        $this->updateRankTitle($user_id);
    }

    private function updateRankTitle($user_id)
    {
        // Fetch current XP
        $q = "SELECT xp FROM users WHERE id = ?";
        $s = $this->conn->prepare($q);
        $s->bindParam(1, $user_id);
        $s->execute();
        $xp = $s->fetchColumn();

        $rank = "Rookie Investigator";
        if ($xp >= 10000)
            $rank = "Master Detective";
        else if ($xp >= 5000)
            $rank = "Senior Inspector";
        else if ($xp >= 2500)
            $rank = "Agent Specialist";
        else if ($xp >= 1000)
            $rank = "Junior Detective";

        $upd = "UPDATE users SET rank_title = ? WHERE id = ?";
        $us = $this->conn->prepare($upd);
        $us->bindParam(1, $rank);
        $us->bindParam(2, $user_id);
        $us->execute();
    }
}
?>
