<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

session_start();
require_once '../db.php';

if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Access denied"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM movies ORDER BY id DESC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
    } 
    elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("INSERT INTO movies (title, image_url, genres, description) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['image_url'], $data['genres'], $data['description']]);
        echo json_encode(["status" => "success", "message" => "Movie added"]);
    }
    elseif ($method === 'PUT') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            echo json_encode(["status" => "error", "message" => "Missing movie ID"]);
            exit;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE movies SET title = ?, image_url = ?, genres = ?, description = ? WHERE id = ?");
        $stmt->execute([$data['title'], $data['image_url'], $data['genres'], $data['description'], $id]);
        echo json_encode(["status" => "success", "message" => "Movie updated"]);
    }
    elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            echo json_encode(["status" => "error", "message" => "Missing movie ID"]);
            exit;
        }
        $stmt = $pdo->prepare("DELETE FROM movies WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Movie deleted"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
