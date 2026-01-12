<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require "../../manager/BoxManager.php";

$pdo = new PDO('mysql:host=localhost;dbname=sushimi_database', 'root', '');
$boxes = $pdo->query("SELECT * FROM box")->fetchAll(PDO::FETCH_ASSOC);

foreach ($boxes as &$box) {
    $box['prix'] = round($box['prix'], 2);

    $stmt = $pdo->prepare("
       SELECT f.name, CAST(bf.quantity AS UNSIGNED) AS quantity
       FROM box_foods bf
       JOIN foods f ON bf.food_id = f.id
       WHERE bf.box_id = :id_box
   ");
    $stmt->execute(['id_box' => $box['id_box']]);
    $box['foods'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $pdo->prepare("
       SELECT fl.name
       FROM box_flavors bf
       JOIN flavors fl ON bf.flavor_id = fl.id
       WHERE bf.box_id = :id_box
   ");
    $stmt->execute(['id_box' => $box['id_box']]);
    $box['flavors'] = array_column($stmt->fetchAll(), 'name');
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($boxes);
