<?php
/**
 * Proxy PHP → Notion API (equivalente a server/api/contact-notion.post.ts)
 * El front debe hacer POST a: /api/contact-notion.php
 * Content-Type: application/json
 */

header('Content-Type: application/json; charset=utf-8');

// Solo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['statusMessage' => 'Método no permitido']);
    exit;
}

// Cargar secretos (ajusta la ruta según tu hosting)
$configPath = dirname(__DIR__, 2) . '/config/notion-secret.php';
if (!is_readable($configPath)) {
    http_response_code(500);
    echo json_encode(['statusMessage' => 'Configuración del servidor incompleta']);
    exit;
}
$config = require $configPath;
$apiKey = $config['NOTION_API_KEY'] ?? '';
$dbId   = $config['NOTION_DATABASE_ID'] ?? '';
if ($apiKey === '' || $dbId === '') {
    http_response_code(500);
    echo json_encode(['statusMessage' => 'Faltan credenciales Notion']);
    exit;
}

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['statusMessage' => 'JSON inválido']);
    exit;
}

$nombre = trim($body['nombre'] ?? '');
$email  = trim($body['email'] ?? '');
if ($nombre === '' || $email === '') {
    http_response_code(400);
    echo json_encode(['statusMessage' => 'Nombre y email son requeridos']);
    exit;
}

$empresa = $body['empresa'] ?? '';
$telefono = $body['telefono'] ?? '';
$terminos = !empty($body['terminos']);
$notificaciones = !empty($body['notificaciones']);

$payload = [
    'parent' => [
        'database_id' => $dbId,
    ],
    'properties' => [
        'Nombre' => [
            'title' => [['text' => ['content' => $nombre]]],
        ],
        'Empresa' => [
            'rich_text' => [['text' => ['content' => $empresa]]],
        ],
        'Telefono' => [
            'phone_number' => $telefono,
        ],
        'Email' => [
            'email' => $email,
        ],
        'Interes_Creditos' => [
            'checkbox' => $terminos,
        ],
        'Interes_Tierras' => [
            'checkbox' => $notificaciones,
        ],
    ],
];

$ch = curl_init('https://api.notion.com/v1/pages');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
        'Notion-Version: 2022-06-28',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($curlErr) {
    http_response_code(500);
    echo json_encode(['statusMessage' => 'Error de conexión con Notion']);
    exit;
}

$data = json_decode($response, true);
if ($httpCode >= 200 && $httpCode < 300 && is_array($data) && isset($data['id'])) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Datos enviados exitosamente a Notion',
        'notion_page_id' => $data['id'],
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Error devuelto por Notion (evitar $data['message'] si $data es null: fatal en PHP 8+)
$msg = 'Error al procesar el formulario';
if (is_array($data) && isset($data['message'])) {
    $msg = $data['message'];
} elseif ($response !== '' && $response !== false) {
    $msg = 'Respuesta inválida de Notion (HTTP ' . $httpCode . ')';
}
http_response_code($httpCode >= 400 ? $httpCode : 500);
echo json_encode(['statusMessage' => $msg], JSON_UNESCAPED_UNICODE);