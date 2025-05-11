<?php
header('Content-Type: application/json');

$kapcsolatistring = "server=localhost;database=raktar;uid=root;password='';";

try {
    $conn = new mysqli($kapcsolatistring);
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
    $stmt->bind_param("sssdiss", $nev, $gyarto, $lejarat, $ar, $mennyiseg, $parcella);
    $stmt->execute();

    echo json_encode(array('message' => 'Sikeresen hozzáadva'));

    $conn->close();

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>