<?php

declare(strict_types=1);

const ALLOWED_ORIGINS = [
    'https://textilmaguimel.com.ar',
    'https://www.textilmaguimel.com.ar',
];

const RECIPIENT = 'info@textilmaguimel.com.ar';

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== '' && in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Accept, Content-Type');
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Método no permitido']);
    exit;
}

if ($origin !== '' && !in_array($origin, ALLOWED_ORIGINS, true)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'message' => 'Origen no permitido']);
    exit;
}

function input(string $key, int $maxLength): string
{
    $value = trim((string) ($_POST[$key] ?? ''));
    $value = str_replace(["\r\n", "\r"], "\n", $value);

    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return substr($value, 0, $maxLength);
}

if (input('website', 200) !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$name = input('name', 120);
$email = input('email', 190);
$phone = input('phone', 60);
$location = input('location', 120);
$inquiryType = input('inquiry_type', 120);
$message = input('message', 4000);

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Revisá los campos obligatorios']);
    exit;
}

$subjectText = 'Nueva consulta desde la web de Textil Maguimel';
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';

$body = implode("\n", [
    'Nueva consulta recibida desde textilmaguimel.com.ar',
    '',
    'Nombre: ' . $name,
    'Email: ' . $email,
    'Teléfono: ' . ($phone !== '' ? $phone : 'No informado'),
    'Localidad: ' . ($location !== '' ? $location : 'No informada'),
    'Tipo de consulta: ' . ($inquiryType !== '' ? $inquiryType : 'No informado'),
    '',
    'Mensaje:',
    $message,
]);

$headers = [
    'From: Sitio web Textil Maguimel <info@textilmaguimel.com.ar>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = mail(RECIPIENT, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'No se pudo entregar el mensaje']);
    exit;
}

echo json_encode(['ok' => true]);
