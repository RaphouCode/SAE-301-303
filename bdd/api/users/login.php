<?php
// Récupérer la connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=sushimi_database', 'root', '');

// Récupérer les données JSON envoyées
$content = file_get_contents('php://input');
$data = json_decode($content, true);

// Vérifier que l'email et le mot de passe sont fournis
if (!isset($data['email'], $data['mot_de_passe'])) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode(['error' => 'Email et mot de passe requis']);
    exit;
}

$email = $data['email'];
$motDePasse = $data['mot_de_passe'];

// Rechercher le client avec cet email
$sql = "SELECT * FROM client WHERE email = :email";
$query = $pdo->prepare($sql);
$query->execute([':email' => $email]);

$client = $query->fetch(PDO::FETCH_ASSOC);

// Vérifier si le client existe
if (!$client) {
    header('Content-Type: application/json');
    http_response_code(401);
    echo json_encode(['error' => 'le client n\'existe pas dans la base de données']);
    exit;
}

// Vérifier le mot de passe
if (!password_verify($motDePasse, $client['mot_de_passe'])) {
    header('Content-Type: application/json');
    http_response_code(401);
    echo json_encode(['error' => 'Email ou mot de passe incorrect']);
    exit;
}

else {
    $token = bin2hex(random_bytes(32)); //64 caractères sécurisés

    // Stocker le token dans la colonne 'api_token' du client
    $sqlUpdate = "UPDATE client SET api_token = :token WHERE id_client = :id_client";
    $updateStmt = $pdo->prepare($sqlUpdate);
    $updated = $updateStmt->execute([
        ':token' => $token,
        ':id_client' => $client['id_client']
    ]);

    if (!$updated) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(['error' => 'Impossible de stocker le token en base']);
        exit;
    }
}

// Connexion réussie
header('Content-Type: application/json');
http_response_code(200);
echo json_encode([
    'message' => 'Connexion réussie',
    'api_token' => $token
]);

?>
