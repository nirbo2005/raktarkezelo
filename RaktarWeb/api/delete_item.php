<?php
header('Content-Type: application/json');

$host = "localhost";
$dbname = "raktar";
$user = "root";
$pass = "";

try {
    $conn = new mysqli($host, $user, $pass, $dbname);
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    if (isset($_GET['id'])) {
        $id = $conn->real_escape_string($_GET['id']); // Fontos a biztonság!
        $sql = "DELETE FROM keszlet WHERE id = $id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array('message' => 'Termék sikeresen törölve.', 'rowsAffected' => $conn->affected_rows));
        } else {
            throw new Exception("Error deleting record: " . $conn->error);
        }
    } else {
        throw new Exception("No ID provided.");
    }

    $conn->close();

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>