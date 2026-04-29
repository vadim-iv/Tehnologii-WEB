<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

session_start();

if (isset($_SESSION['user'])) {
    echo json_encode(["status" => "success", "user" => $_SESSION['user']]);
} else {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Not logged in"]);
}
