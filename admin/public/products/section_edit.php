<?php
declare(strict_types=1);
require __DIR__ . '/../../src/bootstrap.php';
Auth::requireLogin('../login.php');

$repo = new ProductRepository();
$langs = ['en' => 'English', 'fa' => 'فارسی', 'ar' => 'العربية', 'ru' => 'Русский'];

$id = isset($_GET['id']) ? (int) $_GET['id'] : null;
$section = $id ? $repo->findSection($id) : null;
if ($id && !$section) {
    http_response_code(404);
    exit('Category not found.');
}

$errors = [];
$form = $section ?? [
    'section_key' => '', 'badge' => '', 'sort_order' => 0,
    'title' => ['en' => '', 'fa' => '', 'ar' => '', 'ru' => ''],
    'description' => ['en' => '', 'fa' => '', 'ar' => '', 'ru' => ''],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::verify();

    $sectionKey = trim((string) ($_POST['section_key'] ?? ''));
    $badge = trim((string) ($_POST['badge'] ?? ''));
    $sortOrder = (int) ($_POST['sort_order'] ?? 0);
    $title = $description = [];
    foreach (array_keys($langs) as $lang) {
        $title[$lang] = trim((string) ($_POST['title'][$lang] ?? ''));
        $description[$lang] = trim((string) ($_POST['description'][$lang] ?? ''));
    }

    if ($sectionKey === '' || !preg_match('/^[a-z0-9]+(-[a-z0-9]+)*$/', $sectionKey)) {
        $errors[] = 'Category key is required and may only contain lowercase letters, numbers, and hyphens.';
    } elseif ($repo->sectionKeyExists($sectionKey, $id)) {
        $errors[] = 'That category key is already used.';
    }
    if ($badge === '') {
        $errors[] = 'Badge is required (e.g. "EB").';
    }
    foreach ($langs as $lang => $label) {
        if ($title[$lang] === '') $errors[] = "Title ($label) is required.";
        if ($description[$lang] === '') $errors[] = "Description ($label) is required.";
    }

    $form = ['section_key' => $sectionKey, 'badge' => $badge, 'sort_order' => $sortOrder, 'title' => $title, 'description' => $description];

    if (!$errors) {
        if ($id) {
            $repo->updateSection($id, $form);
        } else {
            $id = $repo->createSection($form);
        }
        header('Location: sections_list.php?ok=' . urlencode(SitePublisher::publishMessage('Category saved.')));
        exit;
    }
}

$rel = '../';
$pageTitle = $id ? 'Edit category' : 'Add category';
$flashError = $errors ? implode(' ', $errors) : '';
require __DIR__ . '/../../src/partials/header.php';
?>
<form method="post" class="card">
  <?= Csrf::field() ?>

  <label for="section_key">Category key (used internally, e.g. "energy-bitumen")</label>
  <input type="text" id="section_key" name="section_key" value="<?= htmlspecialchars($form['section_key'], ENT_QUOTES) ?>" required>

  <label for="badge">Badge (short code shown on the site, e.g. "EB")</label>
  <input type="text" id="badge" name="badge" value="<?= htmlspecialchars($form['badge'], ENT_QUOTES) ?>" required>

  <label for="sort_order">Sort order (lower numbers appear first)</label>
  <input type="text" id="sort_order" name="sort_order" value="<?= htmlspecialchars((string) $form['sort_order'], ENT_QUOTES) ?>">

  <div class="lang-tabs" data-lang-tabs>
    <?php foreach ($langs as $lang => $label): ?>
      <button type="button" data-lang="<?= $lang ?>" class="<?= $lang === 'en' ? 'active' : '' ?>"><?= $label ?></button>
    <?php endforeach; ?>
  </div>

  <?php foreach ($langs as $lang => $label): ?>
    <div class="lang-panel <?= $lang === 'en' ? 'active' : '' ?>" data-lang-panel="<?= $lang ?>">
      <label for="title_<?= $lang ?>">Title (<?= $label ?>)</label>
      <input type="text" id="title_<?= $lang ?>" name="title[<?= $lang ?>]" value="<?= htmlspecialchars($form['title'][$lang], ENT_QUOTES) ?>">

      <label for="description_<?= $lang ?>">Description (<?= $label ?>)</label>
      <textarea id="description_<?= $lang ?>" name="description[<?= $lang ?>]" rows="3"><?= htmlspecialchars($form['description'][$lang], ENT_QUOTES) ?></textarea>
    </div>
  <?php endforeach; ?>

  <div class="actions">
    <button type="submit" class="btn btn-primary">Save</button>
    <a href="sections_list.php" class="btn btn-secondary">Cancel</a>
  </div>
</form>
<?php require __DIR__ . '/../../src/partials/footer.php'; ?>
