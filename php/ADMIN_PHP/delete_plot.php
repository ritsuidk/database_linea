<?php
header('Content-Type: application/json');
require_once 'config.php';

if (!isset($_GET['plot_id'])) {
    echo json_encode(['success' => false, 'error' => 'ID del terreno no proporcionado']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM plots WHERE id = ?");
    $stmt->execute([$_GET['plot_id']]);
    
    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>