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

    $idk = $_POST['id'] ?? '';
    $nev = $_POST['nev'] ?? null;
    $gyarto = $_POST['gyarto'] ?? null;
    $lejarat = $_POST['lejarat'] ?? null;
    $ar = $_POST['ar'] ?? null;
    $mennyiseg = $_POST['mennyiseg'] ?? null;
    $parcella = $_POST['parcella'] ?? null;

    $setParts = array();
    $params = array();
    $types = "";

    if ($nev !== null) {
        $setParts[] = "nev = ?";
        $params[] = $nev;
        $types .= "s";
    }
    if ($gyarto !== null) {
        $setParts[] = "gyarto = ?";
        $params[] = $gyarto;
        $types .= "s";
    }
    if ($lejarat !== null) {
        $setParts[] = "lejarat = ?";
        $params[] = $lejarat;
        $types .= "s";
    }
    if ($ar !== null) {
        $setParts[] = "ar = ?";
        $params[] = $ar;
        $types .= "d";
    }
    if ($mennyiseg !== null) {
        $setParts[] = "mennyiseg = ?";
        $params[] = $mennyiseg;
        $types .= "i";
    }
    if ($parcella !== null) {
        $setParts[] = "parcella = ?";
        $params[] = $parcella;
        $types .= "s";
    }

    if (empty($setParts)) {
        throw new Exception("No fields to update.");
    }

    // Sanitize the ID(s) -  Important for security!
    $idArray = array_map('intval', explode(',', $idk));
    $idString = implode(',', $idArray);

    $sql = "UPDATE keszlet SET " . implode(', ', $setParts) . " WHERE id IN (" . implode(',', array_fill(0, count($idArray), '?')) . ")";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    // Build types string and params array for bind_param
    $bindParams = array();
    $bindParams[] = &$types; // Add the types string by reference

    foreach ($params as $key => $value) {
        $bindParams[] = &$params[$key]; // Add other params by reference
    }

    // Add ID parameters to bind
    for ($i = 0; $i < count($idArray); $i++) {
        $bindParams[] = &$idArray[$i];
        $types .= "i";
    }

    if (!empty($bindParams)) {
        call_user_func_array(array($stmt, 'bind_param'), $bindParams);
    }

    $stmt->execute();

    if ($stmt->errno) {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    echo json_encode(array('message' => 'Sikeresen módosítva', 'rowsAffected' => $stmt->affected_rows));

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>