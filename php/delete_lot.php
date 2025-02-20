<?php
header('Content-Type: application/json');
require_once 'config.php';

if (!isset($_GET['lot_id'])) {
    echo json_encode(['success' => false, 'error' => 'ID del lote no proporcionado']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM plots WHERE lot_id = ?");
    $stmt->execute([$_GET['lot_id']]);
    
    $stmt = $pdo->prepare("DELETE FROM lots WHERE id = ?");
    $stmt->execute([$_GET['lot_id']]);
    
    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>