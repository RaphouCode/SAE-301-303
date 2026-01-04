<?php
$pdo = new PDO('mysql:host=localhost;dbname=sushimi_database', 'root', '');

$content = file_get_contents('php://input');
$data = json_decode($content, true);

$data = [
    'prenom' => 'John',
    'nom' => 'Doe',
    'email' => 'exemple@gmail.com',
    'mot_de_passe' => 'password123',
    'adresse' => '123 Rue Principale',
    'id_client' => 1
];

$passwordHash = password_hash($data['mot_de_passe'], PASSWORD_DEFAULT);

$sql = "INSERT INTO client (prenom, nom, email, mot_de_passe, adresse, id_client) 
        VALUES (:prenom, :nom, :email, :password_hash, :adresse, :id_client)";

$query = $pdo->prepare($sql);

$query->execute([
    ':prenom' => $data['prenom'],
    ':nom' => $data['nom'],
    ':email' => $data['email'],
    ':password_hash' => $passwordHash,
    ':adresse' => $data['adresse'],
    ':id_client' => $data['id_client']
]);  //Déplacer dans UserManager.php

header('Content-Type: application/json');
http_response_code(201);

echo json_encode(['message' => 'Utilisateur ajouté avec succès']);

if (!isset($data['prenom'], $data['nom'], $data['email'], $data['mot_de_passe'], $data['adresse'], $data['id_client'])) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode(['error' => 'Données manquantes']);
    exit;
}



?>