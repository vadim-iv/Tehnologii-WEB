<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['firstName']) || !isset($data['lastName']) || !isset($data['phone']) || !isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

// Validare Telefon (10-15 cifre)
if (!preg_match('/^[0-9]{10,15}$/', $data['phone'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Phone number must contain between 10 and 15 digits."]);
    exit;
}

// Validare Parola (minim 8 caractere, cel putin o litera si o cifra)
if (!preg_match('/^(?=.*[A-Za-z])(?=.*\d).{8,}$/', $data['password'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Password must be at least 8 characters long and contain at least one letter and one number."]);
    exit;
}

$hashedPass = password_hash($data['password'], PASSWORD_BCRYPT);

try {
    $stmt = $pdo->prepare("INSERT INTO users (name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$data['firstName'], $data['lastName'], $data['phone'], $data['email'], $hashedPass]);
    echo json_encode(["status" => "success", "message" => "Account created successfully"]);
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email already exists or database error"]);
}
