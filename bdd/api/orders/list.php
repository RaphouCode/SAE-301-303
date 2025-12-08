<?php
    $headers = getallheaders();
    $token = str_replace('Bearer ', '', $headers['Authorization']);

    //Vérifie si le token est donné
    if (empty($token)) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(['error' => 'Token requis']);
        exit;
    }

    //Match le token avec la base de données
    $sql = "SELECT * FROM client WHERE api_token = :token";
    $query = $pdo->prepare($sql);
    $query->execute([':token' => $token]);

    $client = $query->fetch(PDO::FETCH_ASSOC);

    //Verifie si le client existe
    if (!$client) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(['error' => 'Token invalide']);
        exit;
    }

    /* 2. ACCÈS AUTORISÉ - Rechercher les commandes du client
    $sqlOrders = "SELECT * FROM orders WHERE id_client = :id_client";
    $queryOrders = $pdo->prepare($sqlOrders);
    $queryOrders->execute([':id_client' => $client['id_client']]);

    $orders = $queryOrders->fetchAll(PDO::FETCH_ASSOC);*/

    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode([
        'message' => 'Accès autorisé',
        'client' => $client
        //'orders' => $orders
    ]);


?>