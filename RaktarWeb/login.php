<?php
session_start();

$users = [
    "user" => "admin" //  Example credentials
];

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (isset($users[$username]) && $users[$username] === $password) {
    $_SESSION['user'] = $username;
    header("Location: dashboard.html");
    exit;
} else {
    echo "Hibás felhasználónév vagy jelszó.";
}
?>