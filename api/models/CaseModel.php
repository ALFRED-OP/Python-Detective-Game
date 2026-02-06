<?php
class CaseModel
{
    private $conn;
    private $table_name = "cases";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll($user_id = null)
    {
        if ($user_id) {
            // Join with user_progress to get status. First case is unlocked by default.
            $query = "SELECT c.id, c.title, c.difficulty, c.category, c.xp_reward, 
                      CASE 
                        WHEN up.status IS NOT NULL THEN up.status
                        WHEN c.id = (SELECT MIN(id) FROM " . $this->table_name . ") THEN 'unlocked'
                        ELSE 'locked'
                      END as status 
                      FROM " . $this->table_name . " c 
                      LEFT JOIN user_progress up ON c.id = up.case_id AND up.user_id = :user_id 
                      ORDER BY c.id ASC";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
        }
        else {
            $query = "SELECT id, title, difficulty, category, xp_reward FROM " . $this->table_name . " ORDER BY id ASC";
            $stmt = $this->conn->prepare($query);
        }

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id, $user_id = null)
    {
        if ($user_id) {
            $query = "SELECT c.*, up.saved_code, 
                      CASE 
                        WHEN up.status IS NOT NULL THEN up.status
                        WHEN c.id = (SELECT MIN(id) FROM " . $this->table_name . ") THEN 'unlocked'
                        ELSE 'locked'
                      END as status 
                      FROM " . $this->table_name . " c 
                      LEFT JOIN user_progress up ON c.id = up.case_id AND up.user_id = :user_id 
                      WHERE c.id = :id LIMIT 0,1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':id', $id);
        }
        else {
            $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id LIMIT 0,1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
        }

        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function saveDraft($user_id, $case_id, $code)
    {
        // First check if the case is locked
        $query = "SELECT status FROM user_progress WHERE user_id = :user_id AND case_id = :case_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':case_id', $case_id);
        $stmt->execute();
        $progress = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$progress || $progress['status'] === 'locked') {
            return ['error' => 'Cannot save draft for a locked case', 'code' => 403];
        }

        // Update or insert saved_code
        $query = "UPDATE user_progress SET saved_code = :code WHERE user_id = :user_id AND case_id = :case_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':case_id', $case_id);
        return $stmt->execute();
    }
}
?>
