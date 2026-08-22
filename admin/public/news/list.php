<?php
declare(strict_types=1);
require __DIR__ . '/../../src/bootstrap.php';
Auth::requireLogin('../login.php');

$posts = (new NewsRepository())->all();

$rel = '../';
$pageTitle = 'News posts';
$flashOk = $_GET['ok'] ?? '';
require __DIR__ . '/../../src/partials/header.php';
?>
<div class="actions" style="margin-bottom:1rem;">
  <a href="edit.php" class="btn btn-primary">Add news post</a>
</div>
<div class="card">
  <table>
    <thead><tr><th>Date</th><th>Title (EN)</th><th>Featured</th><th></th></tr></thead>
    <tbody>
    <?php foreach ($posts as $post): ?>
      <tr>
        <td><?= htmlspecialchars($post['post_date'], ENT_QUOTES) ?></td>
        <td><?= htmlspecialchars($post['title']['en'], ENT_QUOTES) ?></td>
        <td><?= $post['featured'] ? 'Yes' : '' ?></td>
        <td>
          <a href="edit.php?id=<?= $post['id'] ?>">Edit</a>
          <form method="post" action="delete.php" style="display:inline" data-confirm="Delete this news post?">
            <?= Csrf::field() ?>
            <input type="hidden" name="id" value="<?= $post['id'] ?>">
            <button type="submit" class="btn-danger" style="background:none;border:none;color:#b3261e;cursor:pointer;padding:0 0 0 0.6rem;">Delete</button>
          </form>
        </td>
      </tr>
    <?php endforeach; ?>
    <?php if (!$posts): ?>
      <tr><td colspan="4" class="help">No news posts yet.</td></tr>
    <?php endif; ?>
    </tbody>
  </table>
</div>
<?php require __DIR__ . '/../../src/partials/footer.php'; ?>
