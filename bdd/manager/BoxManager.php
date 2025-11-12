<?php

class BoxManager {
    private $pdo;

    public function __construct() {
        $this->pdo = new PDO('mysql:host=localhost;dbname=sushi_box', 'root', '');
    }

    public function findAll() {
        $boxes = $this->pdo->query("SELECT * FROM boxes")->fetchAll(PDO::FETCH_ASSOC);

        foreach ($boxes as &$box) {
            $box['price'] = round($box['price'], 2);
        }
    }
    
    $boxManager = new BoxManager();
    $boxes = $boxManager->findAll();

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($boxes);

}