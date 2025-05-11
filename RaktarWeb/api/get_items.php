<?php
$db = new PDO('sqlite:../data.db');
$res = $db->query("SELECT * FROM items");
echo json_encode($res->fetchAll(PDO::FETCH_ASSOC));
