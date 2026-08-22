<?php
declare(strict_types=1);
require __DIR__ . '/../../src/bootstrap.php';
Auth::requireLogin('../login.php');

$sections = (new ProductRepository())->allSections();

$rel = '../';
$pageTitle = 'Products catalog';
$flashOk = $_GET['ok'] ?? '';
require __DIR__ . '/../../src/partials/header.php';
?>
<div class="actions" style="margin-bottom:1rem;">
  <a href="section_edit.php" class="btn btn-primary">Add category</a>
</div>
<?php foreach ($sections as $section): ?>
  <div class="card">
    <h2><?= htmlspecialchars($section['title']['en'], ENT_QUOTES) ?> <span class="help">(<?= htmlspecialchars($section['section_key'], ENT_QUOTES) ?>, badge <?= htmlspecialchars($section['badge'], ENT_QUOTES) ?>)</span></h2>
    <p class="help"><?= htmlspecialchars($section['description']['en'], ENT_QUOTES) ?></p>
    <table>
      <thead><tr><th>Item (EN)</th><th>Tag</th><th></th></tr></thead>
      <tbody>
      <?php foreach ($section['items'] as $item): ?>
        <tr>
          <td><?= htmlspecialchars($item['name']['en'], ENT_QUOTES) ?></td>
          <td><?= htmlspecialchars($item['tag']['en'], ENT_QUOTES) ?></td>
          <td>
            <a href="item_edit.php?id=<?= $item['id'] ?>">Edit</a>
            <form method="post" action="item_delete.php" style="display:inline" data-confirm="Delete this item?">
              <?= Csrf::field() ?>
              <input type="hidden" name="id" value="<?= $item['id'] ?>">
              <button type="submit" style="background:none;border:none;color:#b3261e;cursor:pointer;padding:0 0 0 0.6rem;">Delete</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
      <?php if (!$section['items']): ?>
        <tr><td colspan="3" class="help">No items yet.</td></tr>
      <?php endif; ?>
      </tbody>
    </table>
    <div class="actions">
      <a href="item_edit.php?section_id=<?= $section['id'] ?>" class="btn btn-secondary">Add item</a>
      <a href="section_edit.php?id=<?= $section['id'] ?>" class="btn btn-secondary">Edit category</a>
      <form method="post" action="section_delete.php" data-confirm="Delete this whole category and its items?">
        <?= Csrf::field() ?>
        <input type="hidden" name="id" value="<?= $section['id'] ?>">
        <button type="submit" class="btn btn-danger">Delete category</button>
      </form>
    </div>
  </div>
<?php endforeach; ?>
<?php if (!$sections): ?>
  <p class="help">No categories yet.</p>
<?php endif; ?>
<?php require __DIR__ . '/../../src/partials/footer.php'; ?>
