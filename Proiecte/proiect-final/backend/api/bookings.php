<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

session_start();
require_once '../db.php';

if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "You must be logged in to book tickets"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Rezervarile unui user
    $stmt = $pdo->prepare("
        SELECT b.*, s.date, s.time, m.title as movie_title 
        FROM bookings b 
        JOIN schedules s ON b.schedule_id = s.id 
        JOIN movies m ON s.movie_id = m.id 
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
    ");
    $stmt->execute([$_SESSION['user']['id']]);
    echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $scheduleId = $data['schedule_id'] ?? null;
    $seats = $data['seats'] ?? [];

    if (!$scheduleId || empty($seats)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing data for reservation"]);
        exit;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("SELECT seats_map FROM schedules WHERE id = ?");
        $stmt->execute([$scheduleId]);
        $schedule = $stmt->fetch();

        $seatsMap = json_decode($schedule['seats_map'], true);

        foreach ($seats as $seat) {
            $side = $seat['side'];
            $row = $seat['row'];
            $col = $seat['col'];

            if ($seatsMap[$side][$row][$col] !== 0) {
                throw new Exception("Seat is already taken");
            }

            $seatsMap[$side][$row][$col] = 1;

            $seatLabel = strtoupper($side[0]) . ($row + 1) . "-" . ($col + 1);
            $stmt = $pdo->prepare("INSERT INTO bookings (user_id, schedule_id, seat_identifier) VALUES (?, ?, ?)");
            $stmt->execute([$_SESSION['user']['id'], $scheduleId, $seatLabel]);
        }

        $stmt = $pdo->prepare("UPDATE schedules SET seats_map = ? WHERE id = ?");
        $stmt->execute([json_encode($seatsMap), $scheduleId]);

        $pdo->commit();
        echo json_encode(["status" => "success", "message" => "Booking successful"]);

    } catch (Exception $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}

if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Missing ID for cancellation"]);
        exit;
    }

    try {
        $pdo->beginTransaction();

        // 1. Luam datele rezervarii
        $stmt = $pdo->prepare("SELECT * FROM bookings WHERE id = ? AND user_id = ?");
        $stmt->execute([$id, $_SESSION['user']['id']]);
        $booking = $stmt->fetch();

        if (!$booking) {
            throw new Exception("Reservation not found");
        }

        // 2. Eliberam locul in schedule
        $stmt = $pdo->prepare("SELECT seats_map FROM schedules WHERE id = ?");
        $stmt->execute([$booking['schedule_id']]);
        $schedule = $stmt->fetch();
        $seatsMap = json_decode($schedule['seats_map'], true);

        // Parsam identificatorul (ex: L1-1)
        $side = substr($booking['seat_identifier'], 0, 1) === 'L' ? 'left' : 'right';
        $coords = explode('-', substr($booking['seat_identifier'], 1));
        $row = intval($coords[0]) - 1;
        $col = intval($coords[1]) - 1;

        if (isset($seatsMap[$side][$row][$col])) {
            $seatsMap[$side][$row][$col] = 0;
        }

        $stmt = $pdo->prepare("UPDATE schedules SET seats_map = ? WHERE id = ?");
        $stmt->execute([json_encode($seatsMap), $booking['schedule_id']]);

        // 3. Stergem rezervarea
        $stmt = $pdo->prepare("DELETE FROM bookings WHERE id = ?");
        $stmt->execute([$id]);

        $pdo->commit();
        echo json_encode(["status" => "success", "message" => "Reservation cancelled"]);

    } catch (Exception $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
