<?php
header('Content-Type: application/json');
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name'])) {
    echo json_encode(['success' => false, 'error' => 'Nombre del lote no proporcionado']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO lots (name) VALUES (?)");
    $stmt->execute([$data['name']]);
    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>