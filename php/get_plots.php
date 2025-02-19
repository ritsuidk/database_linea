<?php
header('Content-Type: application/json');
require_once 'config.php';

try {
    if (!isset($_GET['lot_id'])) {
        throw new Exception('No se proporcionó ID del lote');
    }

    $stmt = $pdo->prepare("SELECT * FROM plots WHERE lot_id = ?");
    $stmt->execute([$_GET['lot_id']]);
    $plots = $stmt->fetchAll();
    
    echo json_encode($plots);
} catch(Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
?>