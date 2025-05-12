<?php
require 'db.php';

$stmt = $pdo->query("SELECT * FROM expenses ORDER BY expense_date DESC");
$expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($expenses);
?>

