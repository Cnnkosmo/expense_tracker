<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['amount'], $data['category'], $data['expense_date'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing fields"]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO expenses (amount, category, expense_date, note) VALUES (?, ?, ?, ?)");
$stmt->execute([
    $data['amount'],
    $data['category'],
    $data['expense_date'],
    $data['note'] ?? null
]);

echo json_encode(["status" => "success"]);
?>

