<?php
declare(strict_types=1);

final class Database
{
    private static ?PDO $pdo = null;
    private static ?array $config = null;

    public static function config(): array
    {
        if (self::$config === null) {
            $path = __DIR__ . '/../config/config.php';
            if (!is_file($path)) {
                throw new RuntimeException(
                    'admin/config/config.php is missing. Copy config.sample.php to config.php and fill in your DB credentials.'
                );
            }
            self::$config = require $path;
        }
        return self::$config;
    }

    public static function pdo(): PDO
    {
        if (self::$pdo === null) {
            $db = self::config()['db'];
            $dsn = sprintf(
                'mysql:host=%s;dbname=%s;charset=%s',
                $db['host'],
                $db['name'],
                $db['charset'] ?? 'utf8mb4'
            );
            self::$pdo = new PDO($dsn, $db['user'], $db['pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        }
        return self::$pdo;
    }
}
