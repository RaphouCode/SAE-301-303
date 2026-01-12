<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(204);
    exit;
}

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$pdo = new PDO('mysql:host=localhost;dbname=sushimi_database', 'root', '');

$content = file_get_contents('php://input');
$data = json_decode($content, true);

if (!isset($data['prenom'], $data['nom'], $data['email'], $data['mot_de_passe'], $data['adresse'])) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode(['error' => 'Données manquantes']);
    exit;
}

$passwordHash = password_hash($data['mot_de_passe'], PASSWORD_DEFAULT);

$sql = "INSERT INTO client (prenom, nom, email, mot_de_passe, adresse) 
        VALUES (:prenom, :nom, :email, :password_hash, :adresse)";

$query = $pdo->prepare($sql);

$query->execute([
    ':prenom' => $data['prenom'],
    ':nom' => $data['nom'],
    ':email' => $data['email'],
    ':password_hash' => $passwordHash,
    ':adresse' => $data['adresse'],
]);

header('Content-Type: application/json');
http_response_code(201);

echo json_encode(['message' => 'Utilisateur ajouté avec succès']);
?>