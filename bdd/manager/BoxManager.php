<?php

class BoxManager
{
    private $pdo;

    /*public function __construct() {
        $this->pdo = new PDO('mysql:host=localhost;dbname=sushi_box', 'root', '');
    }*/ //Déplacer dans UserManager.php

    public function findAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM box");
        $boxes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($boxes as &$box) {
            $box['prix'] = round($box['prix'], 2);
        }
        return $boxes;
    }

    public function findById($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM box WHERE id_box = ?");
        $stmt->execute([$id]);
        $box = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($box) {
            $box['prix'] = round($box['prix'], 2);
        }
        return $box;
    }

    public function findUserByEmail($pdo, $email)
    {
        $req = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $req->execute([$email]);
        return $req->fetch(PDO::FETCH_ASSOC);
    }

    public function updateToken($id_client, $token)
    {
        $req = $this->pdo->prepare("UPDATE users SET api_token = ? WHERE id = ?");
        return $req->execute([$token, $id_client]);
    }

    public function findByToken($token)
    {
        $req = $this->pdo->prepare("SELECT * FROM users WHERE api_token = ?");
        $req->execute([$token]);
        return $req->fetch(PDO::FETCH_ASSOC);
    }
}