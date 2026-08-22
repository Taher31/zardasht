<?php
declare(strict_types=1);
require __DIR__ . '/../../src/bootstrap.php';
Auth::requireLogin('../login.php');

$repo = new NewsRepository();
$langs = ['en' => 'English', 'fa' => 'فارسی', 'ar' => 'العربية', 'ru' => 'Русский'];

$id = isset($_GET['id']) ? (int) $_GET['id'] : null;
$post = $id ? $repo->find($id) : null;
if ($id && !$post) {
    http_response_code(404);
    exit('News post not found.');
}

$errors = [];
// Working copy of form values, used to re-render the form on validation failure
// without losing what the user typed.
$form = $post ?? [
    'slug' => '', 'post_date' => date('Y-m-d'), 'image_path' => '', 'featured' => false,
    'title' => ['en' => '', 'fa' => '', 'ar' => '', 'ru' => ''],
    'excerpt' => ['en' => '', 'fa' => '', 'ar' => '', 'ru' => ''],
    'body' => ['en' => [], 'fa' => [], 'ar' => [], 'ru' => []],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::verify();

    $slug = trim((string) ($_POST['slug'] ?? ''));
    $postDate = trim((string) ($_POST['post_date'] ?? ''));
    $featured = isset($_POST['featured']);

    $title = $excerpt = $body = [];
    foreach (array_keys($langs) as $lang) {
        $title[$lang] = trim((string) ($_POST['title'][$lang] ?? ''));
        $excerpt[$lang] = trim((string) ($_POST['excerpt'][$lang] ?? ''));
        $bodyLines = preg_split('/\r?\n/', (string) ($_POST['body'][$lang] ?? ''));
        $body[$lang] = array_values(array_filter(array_map('trim', $bodyLines), fn ($l) => $l !== ''));
    }

    if ($slug === '' || !preg_match('/^[a-z0-9]+(-[a-z0-9]+)*$/', $slug)) {
        $errors[] = 'Slug is required and may only contain lowercase letters, numbers, and hyphens.';
    } elseif ($repo->slugExists($slug, $id)) {
        $errors[] = 'That slug is already used by another post.';
    }
    if ($postDate === '' || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $postDate)) {
        $errors[] = 'A valid date is required.';
    }
    foreach ($langs as $lang => $label) {
        if ($title[$lang] === '') $errors[] = "Title ($label) is required.";
        if ($excerpt[$lang] === '') $errors[] = "Excerpt ($label) is required.";
        if (!$body[$lang]) $errors[] = "Body ($label) needs at least one paragraph.";
    }

    $imagePath = $post['image_path'] ?? '';
    if (!empty($_FILES['image']['name'])) {
        try {
            $imagePath = Upload::storeNewsImage($_FILES['image'], $slug ?: 'news');
        } catch (UploadException $e) {
            $errors[] = $e->getMessage();
        }
    } elseif ($imagePath === '') {
        $errors[] = 'An image is required.';
    }

    $form = [
        'slug' => $slug, 'post_date' => $postDate, 'image_path' => $imagePath, 'featured' => $featured,
        'title' => $title, 'excerpt' => $excerpt, 'body' => $body,
    ];

    if (!$errors) {
        if ($id) {
            $repo->update($id, $form);
        } else {
            $id = $repo->create($form);
        }
        header('Location: list.php?ok=' . urlencode(SitePublisher::publishMessage('News post saved.')));
        exit;
    }
}

$rel = '../';
$pageTitle = $id ? 'Edit news post' : 'Add news post';
$flashError = $errors ? implode(' ', $errors) : '';
require __DIR__ . '/../../src/partials/header.php';
?>
<form method="post" enctype="multipart/form-data" class="card">
  <?= Csrf::field() ?>

  <label for="slug">Slug (used in the URL, e.g. "factory-visit")</label>
  <input type="text" id="slug" name="slug" value="<?= htmlspecialchars($form['slug'], ENT_QUOTES) ?>" required>

  <label for="post_date">Date</label>
  <input type="date" id="post_date" name="post_date" value="<?= htmlspecialchars($form['post_date'], ENT_QUOTES) ?>" required>

  <label><input type="checkbox" name="featured" <?= $form['featured'] ? 'checked' : '' ?>> Featured on homepage</label>

  <label for="image">Image <?= $post ? '(leave empty to keep the current image)' : '' ?></label>
  <?php if ($form['image_path']): ?>
    <p><img class="thumb" src="<?= htmlspecialchars($form['image_path'], ENT_QUOTES) ?>" alt=""></p>
  <?php endif; ?>
  <input type="file" id="image" name="image" accept="image/jpeg,image/png,image/webp">
  <p class="help">JPEG, PNG, or WebP, up to 5 MB. Uploaded images are copied into public/images/news automatically after saving.</p>

  <div class="lang-tabs" data-lang-tabs>
    <?php foreach ($langs as $lang => $label): ?>
      <button type="button" data-lang="<?= $lang ?>" class="<?= $lang === 'en' ? 'active' : '' ?>"><?= $label ?></button>
    <?php endforeach; ?>
  </div>

  <?php foreach ($langs as $lang => $label): ?>
    <div class="lang-panel <?= $lang === 'en' ? 'active' : '' ?>" data-lang-panel="<?= $lang ?>">
      <label for="title_<?= $lang ?>">Title (<?= $label ?>)</label>
      <input type="text" id="title_<?= $lang ?>" name="title[<?= $lang ?>]" value="<?= htmlspecialchars($form['title'][$lang], ENT_QUOTES) ?>">

      <label for="excerpt_<?= $lang ?>">Excerpt (<?= $label ?>)</label>
      <textarea id="excerpt_<?= $lang ?>" name="excerpt[<?= $lang ?>]" rows="2"><?= htmlspecialchars($form['excerpt'][$lang], ENT_QUOTES) ?></textarea>

      <label for="body_<?= $lang ?>">Body (<?= $label ?>) — one paragraph per line</label>
      <textarea id="body_<?= $lang ?>" name="body[<?= $lang ?>]" rows="6"><?= htmlspecialchars(implode("\n", $form['body'][$lang]), ENT_QUOTES) ?></textarea>
    </div>
  <?php endforeach; ?>

  <div class="actions">
    <button type="submit" class="btn btn-primary">Save</button>
    <a href="list.php" class="btn btn-secondary">Cancel</a>
  </div>
</form>
<?php require __DIR__ . '/../../src/partials/footer.php'; ?>
