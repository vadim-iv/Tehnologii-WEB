<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

session_start();
session_destroy();

echo json_encode(["status" => "success", "message" => "Te-ai delogat cu succes"]);
