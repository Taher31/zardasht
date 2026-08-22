<?php
declare(strict_types=1);
require __DIR__ . '/../src/bootstrap.php';

if (Auth::isLocalBypass() || Auth::isLoggedIn()) {
    header('Location: index.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::verify();
    $username = trim((string) ($_POST['username'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    if (Auth::attempt($username, $password)) {
        header('Location: index.php');
        exit;
    }
    $error = 'Incorrect username or password.';
}

$rel = '';
$pageTitle = 'Log in';
$flashError = $error;
require __DIR__ . '/../src/partials/header.php';
?>
<div class="card" style="max-width:360px;margin:2rem auto 0;">
  <form method="post" action="login.php">
    <?= Csrf::field() ?>
    <label for="username">Username</label>
    <input type="text" id="username" name="username" required autofocus>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required>
    <div class="actions">
      <button type="submit" class="btn btn-primary">Log in</button>
    </div>
  </form>
</div>
<?php require __DIR__ . '/../src/partials/footer.php'; ?>
