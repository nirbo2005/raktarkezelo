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

    $sql = "SELECT id, nev, gyarto, lejarat, ar, mennyiseg, parcella FROM keszlet";
    $result = $conn->query($sql);

    $items = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
    }

    echo json_encode($items);

    $conn->close();
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>