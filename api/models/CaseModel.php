<?php
class CaseModel
{
    private $conn;
    private $table_name = "cases";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll()
    {
        // Select summary fields only
        $query = "SELECT id, title, difficulty, category, xp_reward FROM " . $this->table_name . " ORDER BY id ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
