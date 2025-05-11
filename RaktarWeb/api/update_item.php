<?php
header('Content-Type: application/json');

$kapcsolatistring = "server=localhost;database=raktar;uid=root;password='';";

try {
    $conn = new mysqli($kapcsolatistring);
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    $idk = $_POST['id'] ?? '';
    $nev = $_POST['nev'] ?? null;
    $gyarto = $_POST['gyarto'] ?? null;
    $lejarat = $_POST['lejarat'] ?? null;
    $ar = $_POST['ar'] ?? null;
    $mennyiseg = $_POST['mennyiseg'] ?? null;
    $parcella = $_POST['parcella'] ?? null;

    $setParts = array();
    if ($nev !== null) $setParts[] = "nev = ?";
    if ($gyarto !== null) $setParts[] = "gyarto = ?";
    if ($lejarat !== null) $setParts[] = "lejarat = ?";
    if ($ar !== null) $setParts[] = "ar = ?";
    if ($mennyiseg !== null) $setParts[] = "mennyiseg = ?";
    if ($parcella !== null) $setParts[] = "parcella = ?";

    if (empty($setParts)) {
        throw new Exception("No fields to update.");
    }

    $sql = "UPDATE keszlet SET " . implode(', ', $setParts) . " WHERE id IN (" . implode(',', array_fill(0, count(explode(',', $idk)), '?')) . ")";
    $stmt = $conn->prepare($sql);

    $types = str_repeat('s', ($nev !== null ? 1 : 0)) .
             str_repeat('s', ($gyarto !== null ? 1 : 0)) .
             str_repeat('s', ($lejarat !== null ? 1 : 0)) .
             str_repeat('d', ($ar !== null ? 1 : 0)) .
             str_repeat('i', ($mennyiseg !== null ? 1 : 0)) .
             str_repeat('s', ($parcella !== null ? 1 : 0)) .
             str_repeat('i', count(explode(',', $idk)));

    $params = array();
    if ($nev !== null) $params[] = $nev;
    if ($gyarto !== null) $params[] = $gyarto;
    if ($lejarat !== null) $params[] = $lejarat;
    if ($ar !== null) $params[] = $ar;
    if ($mennyiseg !== null) $params[] = $mennyiseg;
    if ($parcella !== null) $params[] = $parcella;
    foreach (explode(',', $idk) as $id) {
        $params[] = (int)$id;
    }

    $stmt->bind_param($types, ...$params);
    $stmt->execute();

    echo json_encode(array('message' => 'Sikeresen módosítva', 'rowsAffected' => $stmt->affected_rows));

    $conn->close();

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>