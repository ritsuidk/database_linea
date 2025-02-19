<?php
header('Content-Type: application/json');
require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT * FROM lots");
    $lots = $stmt->fetchAll();
    echo json_encode($lots);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>