<?php
header('Content-Type: application/json');
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['lot_id']) || !isset($data['plot_name']) || !isset($data['location']) || !isset($data['size']) || !isset($data['status'])) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO plots (lot_id, plot_name, location, size, status) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$data['lot_id'], $data['plot_name'], $data['location'], $data['size'], $data['status']]);
    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>