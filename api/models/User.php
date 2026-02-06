<?php
class User
{
    private $conn;
    private $table_name = "users";

    public $id;
    public $username;
    public $password;
    public $xp;
    public $rank_title;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create()
    {
        $query = "INSERT INTO " . $this->table_name . " SET username=:username, password_hash=:password_hash, rank_title='Rookie Investigator', xp=0";
        $stmt = $this->conn->prepare($query);

        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);

        $stmt->bindParam(":username", $this->username);
        $stmt->bindParam(":password_hash", $this->password);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function usernameExists()
    {
        $query = "SELECT id, password_hash, xp, rank_title FROM " . $this->table_name . " WHERE username = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->username);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->password = $row['password_hash']; // Hashed password
            $this->xp = $row['xp'];
            $this->rank_title = $row['rank_title'];
            return true;
        }
        return false;
    }
}
?>
