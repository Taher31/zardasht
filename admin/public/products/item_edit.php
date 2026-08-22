<?php
declare(strict_types=1);
require __DIR__ . '/../../src/bootstrap.php';
Auth::requireLogin('../login.php');

$repo = new ProductRepository();
$langs = ['en' => 'English', 'fa' => 'فارسی', 'ar' => 'العربية', 'ru' => 'Русский'];

$id = isset($_GET['id']) ? (int) $_GET['id'] : null;
$item = $id ? $repo->findItem($id) : null;
if ($id && !$item) {
    http_response_code(404);
    exit('Item not found.');
}

$sectionId = $item ? $item['section_id'] : (int) ($_POST['section_id'] ?? $_GET['section_id'] ?? 0);
$section = $sectionId ? $repo->findSection($sectionId) : null;
if (!$section) {
    http_response_code(404);
    exit('Category not found.');
}

$errors = [];
$form = $item ?? [
    'sort_order' => 0,
    'name' => ['en' => '', 'fa' => '', 'ar' => '', 'ru' => ''],
    'description' => ['en' => '', 'fa' => '', 'ar' => '', 'ru' => ''],
    'tag' => ['en' => '', 'fa' => '', 'ar' => '', 'ru' => ''],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::verify();

    $sortOrder = (int) ($_POST['sort_order'] ?? 0);
    $name = $description = $tag = [];
    foreach (array_keys($langs) as $lang) {
        $name[$lang] = trim((string) ($_POST['name'][$lang] ?? ''));
        $description[$lang] = trim((string) ($_POST['description'][$lang] ?? ''));
        $tag[$lang] = trim((string) ($_POST['tag'][$lang] ?? ''));
    }

    foreach ($langs as $lang => $label) {
        if ($name[$lang] === '') $errors[] = "Name ($label) is required.";
        if ($description[$lang] === '') $errors[] = "Description ($label) is required.";
        if ($tag[$lang] === '') $errors[] = "Tag ($label) is required.";
    }

    $form = ['sort_order' => $sortOrder, 'name' => $name, 'description' => $description, 'tag' => $tag];

    if (!$errors) {
        if ($id) {
            $repo->updateItem($id, $form);
        } else {
            $id = $repo->createItem($sectionId, $form);
        }
        header('Location: sections_list.php?ok=' . urlencode(SitePublisher::publishMessage('Item saved.')));
        exit;
    }
}

$rel = '../';
$pageTitle = ($id ? 'Edit item' : 'Add item') . ' — ' . $section['title']['en'];
$flashError = $errors ? implode(' ', $errors) : '';
require __DIR__ . '/../../src/partials/header.php';
?>
<form method="post" class="card">
  <?= Csrf::field() ?>
  <input type="hidden" name="section_id" value="<?= $sectionId ?>">

  <label for="sort_order">Sort order (lower numbers appear first)</label>
  <input type="text" id="sort_order" name="sort_order" value="<?= htmlspecialchars((string) $form['sort_order'], ENT_QUOTES) ?>">

  <div class="lang-tabs" data-lang-tabs>
    <?php foreach ($langs as $lang => $label): ?>
      <button type="button" data-lang="<?= $lang ?>" class="<?= $lang === 'en' ? 'active' : '' ?>"><?= $label ?></button>
    <?php endforeach; ?>
  </div>

  <?php foreach ($langs as $lang => $label): ?>
    <div class="lang-panel <?= $lang === 'en' ? 'active' : '' ?>" data-lang-panel="<?= $lang ?>">
      <label for="name_<?= $lang ?>">Name (<?= $label ?>)</label>
      <input type="text" id="name_<?= $lang ?>" name="name[<?= $lang ?>]" value="<?= htmlspecialchars($form['name'][$lang], ENT_QUOTES) ?>">

      <label for="description_<?= $lang ?>">Description (<?= $label ?>)</label>
      <textarea id="description_<?= $lang ?>" name="description[<?= $lang ?>]" rows="2"><?= htmlspecialchars($form['description'][$lang], ENT_QUOTES) ?></textarea>

      <label for="tag_<?= $lang ?>">Tag (<?= $label ?>)</label>
      <input type="text" id="tag_<?= $lang ?>" name="tag[<?= $lang ?>]" value="<?= htmlspecialchars($form['tag'][$lang], ENT_QUOTES) ?>">
    </div>
  <?php endforeach; ?>

  <div class="actions">
    <button type="submit" class="btn btn-primary">Save</button>
    <a href="sections_list.php" class="btn btn-secondary">Cancel</a>
  </div>
</form>
<?php require __DIR__ . '/../../src/partials/footer.php'; ?>
