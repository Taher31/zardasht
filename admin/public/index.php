<?php
declare(strict_types=1);
require __DIR__ . '/../src/bootstrap.php';
Auth::requireLogin('login.php');

$rel = '';
$pageTitle = 'Dashboard';
require __DIR__ . '/../src/partials/header.php';
?>
<div class="card">
  <?php if (Auth::isLocalBypass()): ?>
    <p><strong>Local development mode</strong> — login is disabled on this computer.</p>
  <?php else: ?>
    <p>Logged in as <strong><?= htmlspecialchars($_SESSION['admin_username'] ?? '', ENT_QUOTES) ?></strong>.</p>
  <?php endif; ?>
  <p class="help">Successful edits update the Astro source files automatically. Keep the Astro development server running to see local changes immediately. <a href="export/download.php">Export</a> remains available for backups and manual deployment.</p>
</div>
<div class="card">
  <h2><a href="news/list.php">News posts</a></h2>
  <p class="help">Add, edit, or remove news/blog posts shown on the site.</p>
</div>
<div class="card">
  <h2><a href="contact/edit.php">Contact info</a></h2>
  <p class="help">Phone, email, and address shown on the Contact page.</p>
</div>
<div class="card">
  <h2><a href="products/sections_list.php">Products catalog</a></h2>
  <p class="help">Product categories and the items listed under each.</p>
</div>
<div class="card">
  <h2><a href="trade/list.php">Trade map countries</a></h2>
  <p class="help">Countries shown on the trade map, with translated names/notes.</p>
</div>
<?php require __DIR__ . '/../src/partials/footer.php'; ?>
