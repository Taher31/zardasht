<?php
declare(strict_types=1);
require __DIR__ . '/../../src/bootstrap.php';
Auth::requireLogin('../login.php');

$repo = new ContactRepository();
$langs = ['en' => 'English', 'fa' => 'فارسی', 'ar' => 'العربية', 'ru' => 'Русский'];
$errors = [];
$data = $repo->get();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::verify();

    $data = [];
    foreach (array_keys($langs) as $lang) {
        $data[$lang] = [
            'address' => trim((string) ($_POST['address'][$lang] ?? '')),
            'addressLabel' => trim((string) ($_POST['addressLabel'][$lang] ?? '')),
            'phone' => trim((string) ($_POST['phone'][$lang] ?? '')),
            'email' => trim((string) ($_POST['email'][$lang] ?? '')),
        ];
    }

    foreach ($langs as $lang => $label) {
        foreach (['address', 'addressLabel', 'phone', 'email'] as $field) {
            if ($data[$lang][$field] === '') {
                $errors[] = "$field ($label) is required.";
            }
        }
    }
    if (!empty($data['en']['email']) && !filter_var($data['en']['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email does not look valid.';
    }

    if (!$errors) {
        $repo->save($data);
        header('Location: edit.php?ok=' . urlencode(SitePublisher::publishMessage('Contact info saved.')));
        exit;
    }
}

$rel = '../';
$pageTitle = 'Contact info';
$flashOk = $_GET['ok'] ?? '';
$flashError = $errors ? implode(' ', $errors) : '';
require __DIR__ . '/../../src/partials/header.php';
?>
<form method="post" class="card">
  <?= Csrf::field() ?>

  <div class="lang-tabs" data-lang-tabs>
    <?php foreach ($langs as $lang => $label): ?>
      <button type="button" data-lang="<?= $lang ?>" class="<?= $lang === 'en' ? 'active' : '' ?>"><?= $label ?></button>
    <?php endforeach; ?>
  </div>

  <?php foreach ($langs as $lang => $label): ?>
    <div class="lang-panel <?= $lang === 'en' ? 'active' : '' ?>" data-lang-panel="<?= $lang ?>">
      <label for="address_<?= $lang ?>">Address (<?= $label ?>)</label>
      <input type="text" id="address_<?= $lang ?>" name="address[<?= $lang ?>]" value="<?= htmlspecialchars($data[$lang]['address'], ENT_QUOTES) ?>">

      <label for="addressLabel_<?= $lang ?>">Address field label (<?= $label ?>)</label>
      <input type="text" id="addressLabel_<?= $lang ?>" name="addressLabel[<?= $lang ?>]" value="<?= htmlspecialchars($data[$lang]['addressLabel'], ENT_QUOTES) ?>">

      <label for="phone_<?= $lang ?>">
        Phone (<?= $label ?>)
        <?php if ($lang !== 'en'): ?><button type="button" class="copy-link" data-copy-to-all="phone">Copy from English</button><?php endif; ?>
      </label>
      <input type="text" id="phone_<?= $lang ?>" name="phone[<?= $lang ?>]" value="<?= htmlspecialchars($data[$lang]['phone'], ENT_QUOTES) ?>" <?= $lang === 'en' ? 'data-copy-source="phone"' : 'data-copy-target="phone"' ?>>

      <label for="email_<?= $lang ?>">
        Email (<?= $label ?>)
        <?php if ($lang !== 'en'): ?><button type="button" class="copy-link" data-copy-to-all="email">Copy from English</button><?php endif; ?>
      </label>
      <input type="text" id="email_<?= $lang ?>" name="email[<?= $lang ?>]" value="<?= htmlspecialchars($data[$lang]['email'], ENT_QUOTES) ?>" <?= $lang === 'en' ? 'data-copy-source="email"' : 'data-copy-target="email"' ?>>
    </div>
  <?php endforeach; ?>

  <p class="help">Phone and email are usually the same across languages — fill in English first, then use "Copy from English" on the other tabs.</p>

  <div class="actions">
    <button type="submit" class="btn btn-primary">Save</button>
  </div>
</form>
<?php require __DIR__ . '/../../src/partials/footer.php'; ?>
