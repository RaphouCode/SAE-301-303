<?php
// CORS Headers
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(204);
    exit;
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['id_client']) || !isset($input['box'])) {
    http_response_code(400);
    echo json_encode(["error" => "Données manquantes"]);
    exit;
}

$pdo = new PDO('mysql:host=localhost;dbname=sushimi_database;charset=utf8', 'root', '', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);

try {
    $quantityTotal = 0;
    foreach ($input['box'] as $item) {
        $quantityTotal += $item['quantite'];
    }

    if ($quantityTotal > 10) {
        http_response_code(409);
        echo json_encode(["error" => "La quantité totale de boxes ne peut pas dépasser 10"]);
        exit;
    }

    $pdo->beginTransaction();

    $sqlCommande = "INSERT INTO commande (prix_total, adresse, status, canal_commande, id_client) 
                    VALUES (0, :adresse, :status, :canal_commande, :id_client)";

    $stmtCommande = $pdo->prepare($sqlCommande);
    $stmtCommande->execute([
        ':adresse' => $input['adresse'],
        ':status' => 'en attente',
        ':canal_commande' => $input['canal'],
        ':id_client' => $input['id_client']
    ]);

    $orderId = $pdo->lastInsertId();

    $sqlGetPrice = "SELECT prix FROM box WHERE id_box = :id_box";
    $stmtGetPrice = $pdo->prepare($sqlGetPrice);

    $sqlBox = "INSERT INTO commande_box (id_commande, id_box, quantity, unit_price) 
            VALUES (:id_commande, :id_box, :quantity, :unit_price)";
    $stmtBox = $pdo->prepare($sqlBox);

    $totalCalculated = 0;

    foreach ($input['box'] as $item) {
        $stmtGetPrice->execute([':id_box' => $item['id_box']]);
        $boxData = $stmtGetPrice->fetch();

        if (!$boxData) {
            throw new Exception("Box ID " . $item['id_box'] . " introuvable.");
        }

        $prixUnitaire = $boxData['prix'];

        $stmtBox->execute([
            ':id_commande' => $orderId,
            ':id_box' => $item['id_box'],
            ':quantity' => $item['quantite'],
            ':unit_price' => $prixUnitaire
        ]);

        $totalCalculated += ($item['quantite'] * $prixUnitaire);
    }

    $sqlClient = "SELECT status FROM client WHERE id_client = :id_client";
    $stmtClient = $pdo->prepare($sqlClient);
    $stmtClient->execute([':id_client' => $input['id_client']]);
    $clientData = $stmtClient->fetch();

    if ($clientData && $clientData['status'] === 'student') {
        $totalCalculated *= 0.9;
    }

    $sqlUpdate = "UPDATE commande SET prix_total = :total WHERE id_commande = :id";
    $stmtUpdate = $pdo->prepare($sqlUpdate);
    $stmtUpdate->execute([
        ':total' => $totalCalculated,
        ':id' => $orderId
    ]);

    $pdo->commit();

    http_response_code(201);
    echo json_encode([
        "success" => true,
        "order_id" => $orderId,
        "total_price" => $totalCalculated
    ]);

} catch (\Throwable $th) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    echo json_encode([
        "error" => "Erreur serveur",
        "message" => $th->getMessage()
    ]);
}
?>