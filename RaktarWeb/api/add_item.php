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

    $nev = $_POST['nev'] ?? '';
    $gyarto = $_POST['gyarto'] ?? '';
    $lejarat = $_POST['lejarat'] ?? '';
    $ar = $_POST['ar'] ?? 0;
    $mennyiseg = $_POST['mennyiseg'] ?? 0;
    $parcella = $_POST['parcella'] ?? '';

    $sql = "INSERT INTO keszlet (nev, gyarto, lejarat, ar, mennyiseg, parcella) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ssssss", $nev, $gyarto, $lejarat, $ar, $mennyiseg, $parcella);
    $stmt->execute();

    if ($stmt->errno) {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    echo json_encode(array('message' => 'Sikeresen hozzáadva', 'lastInsertId' => $conn->insert_id));

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>