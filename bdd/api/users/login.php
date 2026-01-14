<?php
$pdo = new PDO('mysql:host=localhost;dbname=sushimi_database', 'root', '');

$content = file_get_contents('php://input');
$data = json_decode($content, true);

if (!isset($data['email'], $data['mot_de_passe'])) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode(['error' => 'Email et mot de passe requis']);
    exit;
}

$email = $data['email'];
$motDePasse = $data['mot_de_passe'];

$sql = "SELECT * FROM client WHERE email = :email";
$query = $pdo->prepare($sql);
$query->execute([':email' => $email]);

$client = $query->fetch(PDO::FETCH_ASSOC);

if (!$client) {
    header('Content-Type: application/json');
    http_response_code(401);
    echo json_encode(['error' => 'Email ou mot de passe incorrect']);
    exit;
}

if (!password_verify($motDePasse, $client['mot_de_passe'])) {
    header('Content-Type: application/json');
    http_response_code(401);
    echo json_encode(['error' => 'Email ou mot de passe incorrect']);
    exit;
}

$token = bin2hex(random_bytes(32));

$sqlUpdate = "UPDATE client SET api_token = :token WHERE id_client = :id_client";
$updateStmt = $pdo->prepare($sqlUpdate);
$updated = $updateStmt->execute([
    ':token' => $token,
    ':id_client' => $client['id_client']
]);

if (!$updated) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur']);
    exit;
}

header('Content-Type: application/json');
http_response_code(200);
echo json_encode([
    'message' => 'Connexion réussie',
    'api_token' => $token,
    'user' => [
        'id_client' => $client['id_client'],
        'nom' => $client['nom'],
        'prenom' => $client['prenom'],
        'email' => $client['email'],
        'adresse' => $client['adresse'],
        'status' => $client['status'] ?? 'regular'
    ]
]);
?>