<?php
declare(strict_types=1);
require __DIR__ . '/../../src/bootstrap.php';
Auth::requireLogin('../login.php');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed.');
}
Csrf::verify();

$id = (int) ($_POST['id'] ?? 0);
if ($id) {
    (new ProductRepository())->deleteItem($id);
}
header('Location: sections_list.php?ok=' . urlencode(SitePublisher::publishMessage('Item deleted.')));
exit;
