<?php
declare(strict_types=1);
/**
 * Shared page chrome. The including script must set, before requiring this file:
 *   $rel        - relative path prefix back to public/ root ('' at top level, '../' one level deep)
 *   $pageTitle  - string shown in <title> and the <h1>
 * Optional:
 *   $flashOk / $flashError - strings to show as a dismissible banner
 */
$rel = $rel ?? '';
$pageTitle = $pageTitle ?? 'Admin';
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= htmlspecialchars($pageTitle, ENT_QUOTES) ?> — Site Admin</title>
<link rel="stylesheet" href="<?= $rel ?>assets/admin.css">
</head>
<body>
<div class="topbar">
  <a href="<?= $rel ?>index.php"><strong>Zardasht Mahd — Admin</strong></a>
  <?php if (Auth::isLocalBypass() || Auth::isLoggedIn()): ?>
  <nav>
    <a href="<?= $rel ?>news/list.php">News</a>
    <a href="<?= $rel ?>contact/edit.php">Contact</a>
    <a href="<?= $rel ?>products/sections_list.php">Products</a>
    <a href="<?= $rel ?>trade/list.php">Trade map</a>
    <a href="<?= $rel ?>export/download.php">Export</a>
    <?php if (Auth::isLoggedIn()): ?><a href="<?= $rel ?>logout.php">Log out</a><?php endif; ?>
  </nav>
  <?php endif; ?>
</div>
<div class="container">
<h1><?= htmlspecialchars($pageTitle, ENT_QUOTES) ?></h1>
<?php if (!empty($flashOk)): ?><div class="flash-ok"><?= htmlspecialchars($flashOk, ENT_QUOTES) ?></div><?php endif; ?>
<?php if (!empty($flashError)): ?><div class="flash-error"><?= htmlspecialchars($flashError, ENT_QUOTES) ?></div><?php endif; ?>
