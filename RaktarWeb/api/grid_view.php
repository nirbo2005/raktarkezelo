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

    $sql = "SELECT parcella, nev, mennyiseg FROM keszlet ORDER BY parcella";
    $result = $conn->query($sql);

    $itemsByParcella = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            if (!isset($itemsByParcella[$row['parcella']])) {
                $itemsByParcella[$row['parcella']] = array();
            }
            $itemsByParcella[$row['parcella']][] = array(
                'nev' => $row['nev'],
                'mennyiseg' => $row['mennyiseg']
            );
        }
    }

    echo json_encode($itemsByParcella);

    $conn->close();

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>