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
        $stmt = $pdo->query("
            SELECT b.id, u.name as user_name, u.email as user_email, m.title as movie_title, 
                   s.date, s.time, b.seat_identifier, b.created_at
            FROM bookings b
            JOIN users u ON b.user_id = u.id
            JOIN schedules s ON b.schedule_id = s.id
            JOIN movies m ON s.movie_id = m.id
            ORDER BY b.created_at DESC
        ");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
    }
    elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            echo json_encode(["status" => "error", "message" => "Missing booking ID"]);
            exit;
        }
        
        try {
            $pdo->beginTransaction();

            $stmt = $pdo->prepare("SELECT schedule_id, seat_identifier FROM bookings WHERE id = ?");
            $stmt->execute([$id]);
            $booking = $stmt->fetch();

            if ($booking) {
                $stmt = $pdo->prepare("SELECT seats_map FROM schedules WHERE id = ?");
                $stmt->execute([$booking['schedule_id']]);
                $schedule = $stmt->fetch();
                
                if ($schedule) {
                    $seatsMap = json_decode($schedule['seats_map'], true);

                    $side = substr($booking['seat_identifier'], 0, 1) === 'L' ? 'left' : 'right';
                    $coords = explode('-', substr($booking['seat_identifier'], 1));
                    $row = intval($coords[0]) - 1;
                    $col = intval($coords[1]) - 1;

                    if (isset($seatsMap[$side][$row][$col])) {
                        $seatsMap[$side][$row][$col] = 0;
                    }

                    $stmt = $pdo->prepare("UPDATE schedules SET seats_map = ? WHERE id = ?");
                    $stmt->execute([json_encode($seatsMap), $booking['schedule_id']]);
                }

                $stmt = $pdo->prepare("DELETE FROM bookings WHERE id = ?");
                $stmt->execute([$id]);
            }

            $pdo->commit();
            echo json_encode(["status" => "success", "message" => "Reservation deleted and seat freed"]);
        } catch (Exception $e) {
            if ($pdo->inTransaction()) $pdo->rollBack();
            throw $e;
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
