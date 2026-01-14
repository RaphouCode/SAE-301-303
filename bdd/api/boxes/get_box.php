<?php
// CORS Headers
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(204);
    exit;
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// On reprend la logique "brute" de index.php pour la consistance et inclure les aliments/saveurs
// car BoxManager ne gère pas encore les jointures complexes (foods/flavors)

$pdo = new PDO('mysql:host=localhost;dbname=sushimi_database', 'root', '');

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID manquant']);
    exit;
}

$id = $_GET['id'];

// 1. Récupérer la box de base
$stmt = $pdo->prepare("SELECT * FROM box WHERE id_box = :id");
$stmt->execute(['id' => $id]);
$box = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$box) {
    http_response_code(404);
    echo json_encode(['error' => 'Box non trouvée']);
    exit;
}

// Formatage prix
$box['prix'] = round($box['prix'], 2);

// 2. Récupérer les aliments (foods)
$stmt = $pdo->prepare("
    SELECT f.name, CAST(bf.quantity AS UNSIGNED) AS quantity
    FROM box_foods bf
    JOIN foods f ON bf.food_id = f.id
    WHERE bf.box_id = :id
");
$stmt->execute(['id' => $id]);
$box['foods'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

// 3. Récupérer les saveurs (flavors)
$stmt = $pdo->prepare("
    SELECT fl.name
    FROM box_flavors bf
    JOIN flavors fl ON bf.flavor_id = fl.id
    WHERE bf.box_id = :id
");
$stmt->execute(['id' => $id]);
$box['flavors'] = array_column($stmt->fetchAll(), 'name');

header('Content-Type: application/json; charset=utf-8');
echo json_encode($box);
?>