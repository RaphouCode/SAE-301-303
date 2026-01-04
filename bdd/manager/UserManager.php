<?php
    class UserManager {
        private $pdo;

        public function __construct() {
            $this->pdo = new PDO('mysql:host=localhost;dbname=sushi_box', 'root', '');
        }
        
        
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
        ]);

    }

?>