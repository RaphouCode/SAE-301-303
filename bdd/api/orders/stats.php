<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$pdo = new PDO('mysql:host=localhost;dbname=sushimi_database;charset=utf8', 'root', '', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);

try {
    // 1. Chiffre d'affaires total
    $sqlTotal = "SELECT COALESCE(SUM(prix_total), 0) as total_ca FROM commande";
    $totalCA = $pdo->query($sqlTotal)->fetch()['total_ca'];

    // 2. Nombre total de commandes
    $sqlNbCommandes = "SELECT COUNT(*) as nb FROM commande";
    $nbCommandes = $pdo->query($sqlNbCommandes)->fetch()['nb'];

    // 3. Ventes par type de box (Top 10)
    $sqlByBox = "
        SELECT b.nom, SUM(cb.quantity) as total_vendus, SUM(cb.quantity * cb.unit_price) as ca_box
        FROM commande_box cb
        INNER JOIN box b ON cb.id_box = b.id_box
        GROUP BY b.id_box, b.nom
        ORDER BY total_vendus DESC
        LIMIT 10
    ";
    $ventesByBox = $pdo->query($sqlByBox)->fetchAll();

    // 4. Évolution du CA par mois (12 derniers mois)
    $sqlByMonth = "
        SELECT 
            DATE_FORMAT(date_commande, '%Y-%m') as mois,
            SUM(prix_total) as ca_mensuel,
            COUNT(*) as nb_commandes
        FROM commande
        WHERE date_commande >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        GROUP BY DATE_FORMAT(date_commande, '%Y-%m')
        ORDER BY mois ASC
    ";
    $caByMonth = $pdo->query($sqlByMonth)->fetchAll();

    // 5. Répartition des clients (regular vs student)
    $sqlClients = "
        SELECT 
            status, 
            COUNT(*) as nb_clients
        FROM client
        GROUP BY status
    ";
    $clientsByStatus = $pdo->query($sqlClients)->fetchAll();

    // 6. Commandes récentes (5 dernières)
    $sqlRecent = "
        SELECT 
            c.id_commande,
            c.date_commande,
            c.prix_total,
            c.status,
            CONCAT(cl.prenom, ' ', cl.nom) as client_name
        FROM commande c
        INNER JOIN client cl ON c.id_client = cl.id_client
        ORDER BY c.date_commande DESC
        LIMIT 5
    ";
    $recentOrders = $pdo->query($sqlRecent)->fetchAll();

    echo json_encode([
        'success' => true,
        'data' => [
            'total_ca' => floatval($totalCA),
            'nb_commandes' => intval($nbCommandes),
            'ventes_par_box' => $ventesByBox,
            'ca_par_mois' => $caByMonth,
            'clients_par_status' => $clientsByStatus,
            'commandes_recentes' => $recentOrders
        ]
    ]);

} catch (\Throwable $th) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Erreur serveur',
        'message' => $th->getMessage()
    ]);
}
?>
