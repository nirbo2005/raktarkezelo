<?php
$db = new PDO('sqlite:../data.db');
$id = (int)$_GET['id'];
$stmt = $db->prepare("DELETE FROM items WHERE id = ?");
$stmt->execute([$id]);
