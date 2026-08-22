<?php
declare(strict_types=1);

/**
 * One-time CLI helper to create the first admin login.
 * Run from the admin/ directory: php scripts/create_admin.php <username> <password>
 * Never expose this over HTTP — it lives outside public/ so it isn't web-reachable.
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('CLI only.');
}

require __DIR__ . '/../src/Database.php';

[, $username, $password] = array_pad($argv, 3, null);
if (!$username || !$password) {
    fwrite(STDERR, "Usage: php scripts/create_admin.php <username> <password>\n");
    exit(1);
}
if (strlen($password) < 8) {
    fwrite(STDERR, "Password must be at least 8 characters.\n");
    exit(1);
}

$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

$pdo = Database::pdo();
$stmt = $pdo->prepare(
    'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)'
);
$stmt->execute([$username, $hash]);

echo "Admin user '$username' is ready.\n";
