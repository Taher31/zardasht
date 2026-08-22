<?php
declare(strict_types=1);
require __DIR__ . '/../../src/bootstrap.php';
Auth::requireLogin('../login.php');

$repo = new TradeCountryRepository();
$termRepo = new TradeTermRepository();
$localeLangs = ['fa' => 'فارسی', 'ar' => 'العربية', 'ru' => 'Русский'];

$id = isset($_GET['id']) ? (int) $_GET['id'] : null;
$country = $id ? $repo->find($id) : null;
if ($id && !$country) {
    http_response_code(404);
    exit('Country not found.');
}

$errors = [];
$form = $country ?? [
    'country_code' => '', 'country_name' => '', 'capital' => '', 'currency' => '',
    'status' => true, 'notes' => '', 'main_exports' => [], 'main_imports' => [],
    'compliance_notes' => '', 'page_slug' => '', 'sort_order' => 0,
    'locale_names' => ['fa' => '', 'ar' => '', 'ru' => ''],
    'locale_notes' => ['fa' => '', 'ar' => '', 'ru' => ''],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::verify();

    $countryCode = strtoupper(trim((string) ($_POST['country_code'] ?? '')));
    $countryName = trim((string) ($_POST['country_name'] ?? ''));
    $capital = trim((string) ($_POST['capital'] ?? ''));
    $currency = trim((string) ($_POST['currency'] ?? ''));
    $status = isset($_POST['status']);
    $notes = trim((string) ($_POST['notes'] ?? ''));
    $mainExports = array_values(array_filter(array_map('trim', preg_split('/\r?\n/', (string) ($_POST['main_exports'] ?? '')))));
    $mainImports = array_values(array_filter(array_map('trim', preg_split('/\r?\n/', (string) ($_POST['main_imports'] ?? '')))));
    $complianceNotes = trim((string) ($_POST['compliance_notes'] ?? ''));
    $pageSlug = trim((string) ($_POST['page_slug'] ?? ''));
    $sortOrder = (int) ($_POST['sort_order'] ?? 0);

    $localeNames = $localeNotes = [];
    foreach (array_keys($localeLangs) as $lang) {
        $localeNames[$lang] = trim((string) ($_POST['locale_names'][$lang] ?? ''));
        $localeNotes[$lang] = trim((string) ($_POST['locale_notes'][$lang] ?? ''));
    }

    if ($countryCode === '' || !preg_match('/^[A-Z]{2}$/', $countryCode)) {
        $errors[] = 'Country code must be exactly 2 letters (ISO 3166-1 alpha-2).';
    }
    if ($countryName === '') $errors[] = 'Country name is required.';
    if ($capital === '') $errors[] = 'Capital is required.';
    if ($currency === '') $errors[] = 'Currency is required.';
    if ($pageSlug === '' || !preg_match('/^[a-z0-9]+(-[a-z0-9]+)*$/', $pageSlug)) {
        $errors[] = 'Page slug is required and may only contain lowercase letters, numbers, and hyphens.';
    } elseif ($repo->pageSlugExists($pageSlug, $id)) {
        $errors[] = 'That page slug is already used by another country.';
    }
    if ($complianceNotes === '') $errors[] = 'Compliance notes are required.';

    $form = [
        'country_code' => $countryCode, 'country_name' => $countryName, 'capital' => $capital, 'currency' => $currency,
        'status' => $status, 'notes' => $notes, 'main_exports' => $mainExports, 'main_imports' => $mainImports,
        'compliance_notes' => $complianceNotes, 'page_slug' => $pageSlug, 'sort_order' => $sortOrder,
        'locale_names' => $localeNames, 'locale_notes' => $localeNotes,
    ];

    if (!$errors) {
        if ($id) {
            $repo->update($id, $form);
        } else {
            $id = $repo->create($form);
        }

        $missing = array_merge(
            $termRepo->missing('item', array_merge($mainExports, $mainImports)),
            $termRepo->missing('compliance', $complianceNotes !== '' ? [$complianceNotes] : [])
        );
        $msg = 'Country saved.';
        if ($missing) {
            $msg .= ' New terms need translation: ' . implode(', ', $missing) . ' — see the translation dictionary.';
        }
        header('Location: list.php?ok=' . urlencode(SitePublisher::publishMessage($msg)));
        exit;
    }
}

$rel = '../';
$pageTitle = $id ? 'Edit country' : 'Add country';
$flashError = $errors ? implode(' ', $errors) : '';
require __DIR__ . '/../../src/partials/header.php';
?>
<form method="post" class="card">
  <?= Csrf::field() ?>

  <label for="country_code">Country code (ISO 3166-1 alpha-2, e.g. "UZ")</label>
  <input type="text" id="country_code" name="country_code" maxlength="2" value="<?= htmlspecialchars($form['country_code'], ENT_QUOTES) ?>" required>

  <label for="country_name">Country name (English)</label>
  <input type="text" id="country_name" name="country_name" value="<?= htmlspecialchars($form['country_name'], ENT_QUOTES) ?>" required>

  <label for="capital">Capital</label>
  <input type="text" id="capital" name="capital" value="<?= htmlspecialchars($form['capital'], ENT_QUOTES) ?>" required>

  <label for="currency">Currency (e.g. "UZS - Uzbekistani som")</label>
  <input type="text" id="currency" name="currency" value="<?= htmlspecialchars($form['currency'], ENT_QUOTES) ?>" required>

  <label><input type="checkbox" name="status" <?= $form['status'] ? 'checked' : '' ?>> Active (shown highlighted on the trade map)</label>

  <label for="page_slug">Page slug (used in the URL)</label>
  <input type="text" id="page_slug" name="page_slug" value="<?= htmlspecialchars($form['page_slug'], ENT_QUOTES) ?>" required>

  <label for="sort_order">Sort order (lower numbers appear first)</label>
  <input type="text" id="sort_order" name="sort_order" value="<?= htmlspecialchars((string) $form['sort_order'], ENT_QUOTES) ?>">

  <label for="notes">Notes (English)</label>
  <textarea id="notes" name="notes" rows="2"><?= htmlspecialchars($form['notes'], ENT_QUOTES) ?></textarea>

  <label for="main_exports">Main exports (English, one per line)</label>
  <textarea id="main_exports" name="main_exports" rows="3"><?= htmlspecialchars(implode("\n", $form['main_exports']), ENT_QUOTES) ?></textarea>

  <label for="main_imports">Main imports (English, one per line)</label>
  <textarea id="main_imports" name="main_imports" rows="3"><?= htmlspecialchars(implode("\n", $form['main_imports']), ENT_QUOTES) ?></textarea>

  <label for="compliance_notes">Compliance notes (English)</label>
  <textarea id="compliance_notes" name="compliance_notes" rows="2"><?= htmlspecialchars($form['compliance_notes'], ENT_QUOTES) ?></textarea>
  <p class="help">If exports/imports/compliance text here doesn't exactly match text already used by another country, you'll be prompted to add its translation after saving.</p>

  <div class="lang-tabs" data-lang-tabs>
    <?php foreach ($localeLangs as $lang => $label): ?>
      <button type="button" data-lang="<?= $lang ?>" class="<?= $lang === 'fa' ? 'active' : '' ?>"><?= $label ?></button>
    <?php endforeach; ?>
  </div>
  <?php foreach ($localeLangs as $lang => $label): ?>
    <div class="lang-panel <?= $lang === 'fa' ? 'active' : '' ?>" data-lang-panel="<?= $lang ?>">
      <label for="locale_name_<?= $lang ?>">Country name (<?= $label ?>)</label>
      <input type="text" id="locale_name_<?= $lang ?>" name="locale_names[<?= $lang ?>]" value="<?= htmlspecialchars($form['locale_names'][$lang], ENT_QUOTES) ?>">

      <label for="locale_note_<?= $lang ?>">Notes (<?= $label ?>)</label>
      <textarea id="locale_note_<?= $lang ?>" name="locale_notes[<?= $lang ?>]" rows="2"><?= htmlspecialchars($form['locale_notes'][$lang], ENT_QUOTES) ?></textarea>
    </div>
  <?php endforeach; ?>

  <div class="actions">
    <button type="submit" class="btn btn-primary">Save</button>
    <a href="list.php" class="btn btn-secondary">Cancel</a>
  </div>
</form>
<?php require __DIR__ . '/../../src/partials/footer.php'; ?>
