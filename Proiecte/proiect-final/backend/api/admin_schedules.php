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
        $stmt = $pdo->query("SELECT s.*, m.title as movie_title FROM schedules s JOIN movies m ON s.movie_id = m.id ORDER BY s.date DESC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
    }
    elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Template locuri
        $leftSide = [
            [-1, -1,  0,  0,  0],
            [-1,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0],
            [-1,  0,  0,  0,  0],
            [-1, -1,  0,  0,  0]
        ];

        $rightSide = [
            [ 0,  0,  0, -1, -1],
            [ 0,  0,  0,  0, -1],
            [ 0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0],
            [ 0,  0,  0,  0,  0],
            [ 0,  0,  0,  0, -1],
            [ 0,  0,  0, -1, -1]
        ];

        $emptyMap = [
            'left' => $leftSide,
            'right' => $rightSide
        ];

        $stmt = $pdo->prepare("INSERT INTO schedules (movie_id, date, time, price, seats_map) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['movie_id'], $data['date'], $data['time'], $data['price'], json_encode($emptyMap)]);
        echo json_encode(["status" => "success", "message" => "Schedule added"]);
    }
    elseif ($method === 'PUT') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            echo json_encode(["status" => "error", "message" => "Missing schedule ID"]);
            exit;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        
        $stmt = $pdo->prepare("UPDATE schedules SET movie_id = ?, date = ?, time = ?, price = ? WHERE id = ?");
        $stmt->execute([$data['movie_id'], $data['date'], $data['time'], $data['price'], $id]);
        echo json_encode(["status" => "success", "message" => "Schedule updated"]);
    }
    elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            echo json_encode(["status" => "error", "message" => "Missing schedule ID"]);
            exit;
        }
        $stmt = $pdo->prepare("DELETE FROM schedules WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "Schedule deleted"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
