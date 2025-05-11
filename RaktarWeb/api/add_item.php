<?php
$db = new PDO('sqlite:../data.db');
$name = $_POST['name'];
$qty = (int)$_POST['qty'];
$stmt = $db->prepare("INSERT INTO items (name, qty) VALUES (?, ?)");
$stmt->execute([$name, $qty]);
