<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../db.php';

$date = $_GET['date'] ?? null;
$movieId = $_GET['movie_id'] ?? null;

$query = "SELECT s.*, m.title as movie_title, m.image_url, m.genres, m.description 
          FROM schedules s 
          JOIN movies m ON s.movie_id = m.id WHERE 1=1";
$params = [];

if ($date) {
    $query .= " AND s.date = ?";
    $params[] = $date;
}

if ($movieId) {
    $query .= " AND s.movie_id = ?";
    $params[] = $movieId;
}

$query .= " ORDER BY s.date, s.time";

try {
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $rawSchedules = $stmt->fetchAll();

    $grouped = [];
    foreach ($rawSchedules as $s) {
        $key = $s['date'] . '_' . $s['movie_id'];
        if (!isset($grouped[$key])) {
            $grouped[$key] = [
                "movie_id" => $s['movie_id'],
                "date" => $s['date'],
                "name" => $s['movie_title'],
                "genres" => $s['genres'],
                "description" => $s['description'],
                "image" => $s['image_url'],
                "showtimes" => []
            ];
        }
        
        $seats = json_decode($s['seats_map'], true);
        $grouped[$key]['showtimes'][] = [
            "id" => $s['id'],
            "time" => $s['time'],
            "seats_left" => $seats['left'] ?? [],
            "seats_right" => $seats['right'] ?? []
        ];
    }

    echo json_encode([
        "status" => "success",
        "data" => array_values($grouped)
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
