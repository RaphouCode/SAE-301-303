<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$input = json_decode(file_get_contents('php://input'), true);

// Vérification des données entrantes
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
    $pdo->beginTransaction();


    $sqlCommande = "INSERT INTO commande (prix_total, adresse, status, canal_commande, id_client) 
                    VALUES (0, :adresse, :status, :canal_commande, :id_client)";
    
    $stmtCommande = $pdo->prepare($sqlCommande);
    $stmtCommande->execute([
        ':adresse' => $input['adresse'],
        ':status'  => 'en attente', 
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
        // Récupérer le prix actuel de la box en BDD
        $stmtGetPrice->execute([':id_box' => $item['id_box']]);
        $boxData = $stmtGetPrice->fetch();

        if (!$boxData) {
            throw new Exception("Box ID " . $item['id_box'] . " introuvable.");
        }

        $prixUnitaire = $boxData['prix']; 

        // Insérer la ligne de commande
        $stmtBox->execute([
            ':id_commande' => $orderId,
            ':id_box'      => $item['id_box'],
            ':quantity'    => $item['quantite'], 
            ':unit_price'  => $prixUnitaire
        ]);

        $totalCalculated += ($item['quantite'] * $prixUnitaire);
    }

    $sqlUpdate = "UPDATE commande SET prix_total = :total WHERE id_commande = :id";
    $stmtUpdate = $pdo->prepare($sqlUpdate);
    $stmtUpdate->execute([
        ':total' => $totalCalculated,
        ':id'    => $orderId
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