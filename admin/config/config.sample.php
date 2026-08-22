<?php
// Copy this file to config.php and fill in real values.
// config.php is gitignored — never commit real credentials.
//
// On cPanel: create the database and a dedicated DB user from
// "MySQL Databases", then fill in the values that tool gives you.

return [
'db' => [
    'host' => '127.0.0.1',
    'name' => 'zdl_admin',
    'user' => 'root',
    'pass' => ' ',
    'charset' => 'utf8mb4',
],

    // Absolute filesystem path to the folder that receives uploaded images.
    // Must be writable by the web server user.
    'uploads_dir' => __DIR__ . '/../uploads/news',

    // Successful admin edits regenerate the Astro JSON files automatically.
    // Change root if the admin folder is deployed outside the Astro project.
    'site' => [
        'auto_publish' => true,
        'root' => dirname(__DIR__, 2),
    ],
];
