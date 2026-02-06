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
        // Select summary fields only
        $query = "SELECT c.id, c.title, c.difficulty, c.category, c.xp_reward, 
                         p.completed as is_completed
                  FROM " . $this->table_name . " c
                  LEFT JOIN user_progress p ON c.id = p.case_id AND p.user_id = :user_id
                  ORDER BY c.id ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id, $user_id = null)
    {
        $query = "SELECT c.*, p.saved_code 
                  FROM " . $this->table_name . " c
                  LEFT JOIN user_progress p ON c.id = p.case_id AND p.user_id = :user_id
                  WHERE c.id = :id LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET title=:title, description=:description, difficulty=:difficulty, 
                      category=:category, starting_code=:starting_code, 
                      expected_output=:expected_output, xp_reward=:xp_reward,
                      suspects_json=:suspects_json, evidence_json=:evidence_json";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":title", $data['title']);
        $stmt->bindParam(":description", $data['description']);
        $stmt->bindParam(":difficulty", $data['difficulty']);
        $stmt->bindParam(":category", $data['category']);
        $stmt->bindParam(":starting_code", $data['starting_code']);
        $stmt->bindParam(":expected_output", $data['expected_output']);
        $stmt->bindParam(":xp_reward", $data['xp_reward']);

        $suspects = json_encode($data['suspects'] ?? []);
        $evidence = json_encode($data['evidence'] ?? []);

        $stmt->bindParam(":suspects_json", $suspects);
        $stmt->bindParam(":evidence_json", $evidence);

        return $stmt->execute();
    }
}
?>
