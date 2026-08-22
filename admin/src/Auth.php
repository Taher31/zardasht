<?php
declare(strict_types=1);

final class Auth
{
    public static function start(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_set_cookie_params([
                'httponly' => true,
                'samesite' => 'Lax',
                'secure' => (($_SERVER['HTTPS'] ?? '') !== '') || (($_SERVER['SERVER_PORT'] ?? '') === '443'),
            ]);
            session_start();
        }
    }

    public static function attempt(string $username, string $password): bool
    {
        $stmt = Database::pdo()->prepare('SELECT id, password_hash FROM admin_users WHERE username = ? LIMIT 1');
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            // Constant-ish time: still run password_verify against a dummy hash when the
            // username doesn't exist, so failed logins don't leak whether a username is valid.
            if (!$user) {
                password_verify($password, '$2y$12$invalidinvalidinvaliduinvalidinvalidinvalidinvalidi');
            }
            return false;
        }

        session_regenerate_id(true);
        $_SESSION['admin_id'] = (int) $user['id'];
        $_SESSION['admin_username'] = $username;
        return true;
    }

    public static function isLoggedIn(): bool
    {
        return isset($_SESSION['admin_id']);
    }

    /**
     * Skip authentication only when both the requested host and the connecting
     * client are loopback addresses. Requiring both prevents a forged Host
     * header from disabling authentication on a deployed server.
     */
    public static function isLocalBypass(): bool
    {
        $remoteAddress = strtolower((string) ($_SERVER['REMOTE_ADDR'] ?? ''));
        $rawHost = strtolower((string) ($_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? ''));
        $host = strtolower((string) (parse_url('http://' . $rawHost, PHP_URL_HOST) ?? ''));
        $loopbackAddresses = ['localhost', '127.0.0.1', '::1'];

        return in_array($remoteAddress, ['127.0.0.1', '::1'], true)
            && in_array($host, $loopbackAddresses, true);
    }

    /**
     * $loginPath is the relative path to login.php from the calling script's own
     * location (e.g. 'login.php' at the top level, '../login.php' one level deep).
     * Passed explicitly rather than computed from the request, since the caller
     * always knows its own nesting depth and this keeps the redirect correct
     * regardless of whether the admin app is mounted at a domain root or a subfolder.
     */
    public static function requireLogin(string $loginPath = 'login.php'): void
    {
        self::start();
        if (self::isLocalBypass()) {
            return;
        }
        if (!self::isLoggedIn()) {
            header('Location: ' . $loginPath);
            exit;
        }
    }

    public static function logout(): void
    {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
        }
        session_destroy();
    }
}
