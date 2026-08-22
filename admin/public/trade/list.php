<?php
declare(strict_types=1);
require __DIR__ . '/../../src/bootstrap.php';
Auth::requireLogin('../login.php');

$repo = new TradeCountryRepository();
$countries = $repo->all();

$termRepo = new TradeTermRepository();
$sources = $repo->distinctSourceStrings();
$missingCount = count($termRepo->missing('item', $sources['item'])) + count($termRepo->missing('compliance', $sources['compliance']));

$rel = '../';
$pageTitle = 'Trade map countries';
$flashOk = $_GET['ok'] ?? '';
require __DIR__ . '/../../src/partials/header.php';
?>
<div class="actions" style="margin-bottom:1rem;">
  <a href="edit.php" class="btn btn-primary">Add country</a>
  <a href="terms.php" class="btn btn-secondary">Translation dictionary<?= $missingCount ? " ($missingCount missing)" : '' ?></a>
</div>
<div class="card">
  <table>
    <thead><tr><th>Code</th><th>Name</th><th>Slug</th><th>Active</th><th></th></tr></thead>
    <tbody>
    <?php foreach ($countries as $c): ?>
      <tr>
        <td><?= htmlspecialchars($c['country_code'], ENT_QUOTES) ?></td>
        <td><?= htmlspecialchars($c['country_name'], ENT_QUOTES) ?></td>
        <td><?= htmlspecialchars($c['page_slug'], ENT_QUOTES) ?></td>
        <td><?= $c['status'] ? 'Yes' : '' ?></td>
        <td>
          <a href="edit.php?id=<?= $c['id'] ?>">Edit</a>
          <form method="post" action="delete.php" style="display:inline" data-confirm="Delete this country?">
            <?= Csrf::field() ?>
            <input type="hidden" name="id" value="<?= $c['id'] ?>">
            <button type="submit" style="background:none;border:none;color:#b3261e;cursor:pointer;padding:0 0 0 0.6rem;">Delete</button>
          </form>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>
<?php require __DIR__ . '/../../src/partials/footer.php'; ?>
