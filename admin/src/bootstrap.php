<?php
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0'); // never leak stack traces to visitors; check the PHP error log instead

spl_autoload_register(function (string $class): void {
    $map = [
        __DIR__ . '/' . $class . '.php',
        __DIR__ . '/Repositories/' . $class . '.php',
        __DIR__ . '/Export/' . $class . '.php',
    ];
    foreach ($map as $path) {
        if (is_file($path)) {
            require $path;
            return;
        }
    }
});

Auth::start();
