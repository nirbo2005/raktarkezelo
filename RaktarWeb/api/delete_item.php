<?php
header('Content-Type: application/json');

$kapcsolatistring = "server=localhost;database=raktar;uid=root;password='';";

try {
    $conn = new mysqli($kapcsolatistring);
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    $idk = $_POST['id'] ?? '';

    $sql = "DELETE FROM keszlet WHERE id IN (" . implode(',', array_fill(0, count(explode(',', $idk)), '?')) . ")";
    $stmt = $conn->prepare($sql);

    $types = str_repeat('i', count(explode(',', $idk)));
    $params = array_map('intval', explode(',', $idk));

    $stmt->bind_param($types, ...$params);
    $stmt->execute();

    echo json_encode(array('message' => 'Sikeresen törölve', 'rowsAffected' => $stmt->affected_rows));

    $conn->close();

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>