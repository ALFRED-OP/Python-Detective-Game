<?php
class Database
{
    private $host = "localhost";
    private $db_name = "python_detective";
    private $username = "root";
    private $password = "";
    public $conn;
    public $last_error = null;

    public function getConnection()
    {
        $this->conn = null;
        $this->last_error = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }
        catch (PDOException $exception) {
            $this->last_error = $exception->getMessage();
        }
        return $this->conn;
    }
}
?>
