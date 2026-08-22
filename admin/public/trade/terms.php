<?php
declare(strict_types=1);
require __DIR__ . '/../../src/bootstrap.php';
Auth::requireLogin('../login.php');

$termRepo = new TradeTermRepository();
$countryRepo = new TradeCountryRepository();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::verify();
    $termType = $_POST['term_type'] === 'compliance' ? 'compliance' : 'item';
    $sourceEn = trim((string) ($_POST['source_en'] ?? ''));
    $fa = trim((string) ($_POST['fa'] ?? ''));
    $ar = trim((string) ($_POST['ar'] ?? ''));
    $ru = trim((string) ($_POST['ru'] ?? ''));
    if ($sourceEn !== '') {
        $termRepo->upsert($termType, $sourceEn, $fa, $ar, $ru);
    }
    header('Location: terms.php?ok=' . urlencode(SitePublisher::publishMessage('Translation saved.')));
    exit;
}

$sources = $countryRepo->distinctSourceStrings();
$missingItems = $termRepo->missing('item', $sources['item']);
$missingCompliance = $termRepo->missing('compliance', $sources['compliance']);
$items = $termRepo->all('item');
$compliance = $termRepo->all('compliance');

$rel = '../';
$pageTitle = 'Translation dictionary';
$flashOk = $_GET['ok'] ?? '';
require __DIR__ . '/../../src/partials/header.php';
?>
<p class="help">These are global lookup tables: an English export/import name or compliance sentence is translated once here and reused by every country that uses that exact text.</p>

<?php if ($missingItems || $missingCompliance): ?>
<div class="card">
  <h2>Needs translation</h2>
  <?php foreach ($missingItems as $s): ?>
    <form method="post" style="margin-bottom:0.75rem;">
      <?= Csrf::field() ?>
      <input type="hidden" name="term_type" value="item">
      <input type="hidden" name="source_en" value="<?= htmlspecialchars($s, ENT_QUOTES) ?>">
      <label><?= htmlspecialchars($s, ENT_QUOTES) ?> (item)</label>
      <div style="display:flex;gap:0.5rem;">
        <input type="text" name="fa" placeholder="فارسی">
        <input type="text" name="ar" placeholder="العربية">
        <input type="text" name="ru" placeholder="Русский">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  <?php endforeach; ?>
  <?php foreach ($missingCompliance as $s): ?>
    <form method="post" style="margin-bottom:0.75rem;">
      <?= Csrf::field() ?>
      <input type="hidden" name="term_type" value="compliance">
      <input type="hidden" name="source_en" value="<?= htmlspecialchars($s, ENT_QUOTES) ?>">
      <label><?= htmlspecialchars($s, ENT_QUOTES) ?> (compliance)</label>
      <div style="display:flex;gap:0.5rem;">
        <input type="text" name="fa" placeholder="فارسی">
        <input type="text" name="ar" placeholder="العربية">
        <input type="text" name="ru" placeholder="Русский">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  <?php endforeach; ?>
</div>
<?php endif; ?>

<div class="card">
  <h2>Items (exports / imports)</h2>
  <?php foreach ($items as $t): ?>
    <form method="post" style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.6rem;">
      <?= Csrf::field() ?>
      <input type="hidden" name="term_type" value="item">
      <input type="hidden" name="source_en" value="<?= htmlspecialchars($t['source_en'], ENT_QUOTES) ?>">
      <span style="flex:1 1 160px;"><?= htmlspecialchars($t['source_en'], ENT_QUOTES) ?></span>
      <input type="text" name="fa" placeholder="فارسی" value="<?= htmlspecialchars($t['translation_fa'], ENT_QUOTES) ?>">
      <input type="text" name="ar" placeholder="العربية" value="<?= htmlspecialchars($t['translation_ar'], ENT_QUOTES) ?>">
      <input type="text" name="ru" placeholder="Русский" value="<?= htmlspecialchars($t['translation_ru'], ENT_QUOTES) ?>">
      <button type="submit" class="btn btn-secondary">Save</button>
    </form>
  <?php endforeach; ?>
  <?php if (!$items): ?><p class="help">No item translations yet.</p><?php endif; ?>
</div>

<div class="card">
  <h2>Compliance notes</h2>
  <?php foreach ($compliance as $t): ?>
    <form method="post" style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.6rem;">
      <?= Csrf::field() ?>
      <input type="hidden" name="term_type" value="compliance">
      <input type="hidden" name="source_en" value="<?= htmlspecialchars($t['source_en'], ENT_QUOTES) ?>">
      <span style="flex:1 1 160px;"><?= htmlspecialchars($t['source_en'], ENT_QUOTES) ?></span>
      <input type="text" name="fa" placeholder="فارسی" value="<?= htmlspecialchars($t['translation_fa'], ENT_QUOTES) ?>">
      <input type="text" name="ar" placeholder="العربية" value="<?= htmlspecialchars($t['translation_ar'], ENT_QUOTES) ?>">
      <input type="text" name="ru" placeholder="Русский" value="<?= htmlspecialchars($t['translation_ru'], ENT_QUOTES) ?>">
      <button type="submit" class="btn btn-secondary">Save</button>
    </form>
  <?php endforeach; ?>
  <?php if (!$compliance): ?><p class="help">No compliance translations yet.</p><?php endif; ?>
</div>
<?php require __DIR__ . '/../../src/partials/footer.php'; ?>
