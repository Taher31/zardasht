<?php
declare(strict_types=1);
require __DIR__ . '/../src/bootstrap.php';

try {
    if (SitePublisher::publish()) {
        echo "Website files updated successfully.\n";
    } else {
        echo "Automatic publishing is disabled in config.php.\n";
    }
} catch (Throwable $e) {
    fwrite(STDERR, "Publish failed: {$e->getMessage()}\n");
    exit(1);
}
