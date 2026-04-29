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
        $stmt = $pdo->query("SELECT id, name, last_name, phone, email, role, created_at FROM users ORDER BY created_at DESC");
        echo json_encode(["status" => "success", "data" => $stmt->fetchAll()]);
    }
    elseif ($method === 'PUT') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            echo json_encode(["status" => "error", "message" => "Missing user ID"]);
            exit;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Verificam daca utilizatorul tinta este adminul principal
        $checkStmt = $pdo->prepare("SELECT email FROM users WHERE id = ?");
        $checkStmt->execute([$id]);
        $targetUser = $checkStmt->fetch();
        
        if ($targetUser && $targetUser['email'] === 'admin@cinema.com') {
             echo json_encode(["status" => "error", "message" => "You cannot edit the primary admin"]);
             exit;
        }

        $emailCheck = $pdo->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
        $emailCheck->execute([$data['email'], $id]);
        if ($emailCheck->fetch()) {
            echo json_encode(["status" => "error", "message" => "This email is already in use by another user"]);
            exit;
        }

        if (!preg_match('/^[0-9]{10,15}$/', $data['phone'])) {
            echo json_encode(["status" => "error", "message" => "Phone number must contain between 10 and 15 digits."]);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE users SET name = ?, last_name = ?, phone = ?, email = ? WHERE id = ?");
        $stmt->execute([$data['name'], $data['last_name'], $data['phone'], $data['email'], $id]);
        echo json_encode(["status" => "success", "message" => "User updated"]);
    }
    elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            echo json_encode(["status" => "error", "message" => "Missing user ID"]);
            exit;
        }

        $checkStmt = $pdo->prepare("SELECT email FROM users WHERE id = ?");
        $checkStmt->execute([$id]);
        $targetUser = $checkStmt->fetch();
        
        if ($targetUser && $targetUser['email'] === 'admin@cinema.com') {
             echo json_encode(["status" => "error", "message" => "You cannot delete the primary admin"]);
             exit;
        }

        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["status" => "success", "message" => "User deleted"]);
    }
    elseif ($method === 'PATCH') {
        $data = json_decode(file_get_contents("php://input"), true);
        
        $checkStmt = $pdo->prepare("SELECT email FROM users WHERE id = ?");
        $checkStmt->execute([$data['user_id']]);
        $targetUser = $checkStmt->fetch();
        
        if ($targetUser && $targetUser['email'] === 'admin@cinema.com') {
             echo json_encode(["status" => "error", "message" => "You cannot change the primary admin's role"]);
             exit;
        }

        $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
        $stmt->execute([$data['role'], $data['user_id']]);
        echo json_encode(["status" => "success", "message" => "Role updated"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
