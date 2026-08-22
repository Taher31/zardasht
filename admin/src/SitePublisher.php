<?php
declare(strict_types=1);

final class SitePublisher
{
    /**
     * Regenerates the Astro data files from MySQL and copies uploaded news
     * images into public/images/news. The Astro dev server notices these file
     * changes and refreshes the site automatically.
     */
    public static function publish(): bool
    {
        $config = Database::config();
        $siteConfig = is_array($config['site'] ?? null) ? $config['site'] : [];
        if (($siteConfig['auto_publish'] ?? true) === false) {
            return false;
        }

        $configuredRoot = trim((string) ($siteConfig['root'] ?? ''));
        $projectRoot = $configuredRoot !== '' ? $configuredRoot : dirname(__DIR__, 2);
        $projectRoot = rtrim($projectRoot, '/\\');

        $dataDir = $projectRoot . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . 'data';
        $publicDir = $projectRoot . DIRECTORY_SEPARATOR . 'public';
        if (!is_dir($dataDir) || !is_dir($publicDir)) {
            throw new RuntimeException('Astro project folders were not found at: ' . $projectRoot);
        }

        $tradeExporter = new TradeExporter();
        self::writeFile($dataDir . DIRECTORY_SEPARATOR . 'news.json', (new NewsExporter())->toJson());
        self::writeFile($dataDir . DIRECTORY_SEPARATOR . 'contact.json', (new ContactExporter())->toJson());
        self::writeFile($dataDir . DIRECTORY_SEPARATOR . 'products.json', (new ProductsExporter())->toJson());
        self::writeFile(
            $publicDir . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'trade-countries.json',
            $tradeExporter->countriesToJson()
        );
        self::writeFile(
            $dataDir . DIRECTORY_SEPARATOR . 'country-locale.json',
            $tradeExporter->localeToJson()
        );

        self::copyNewsImages(
            (string) $config['uploads_dir'],
            $publicDir . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'news'
        );

        return true;
    }

    /** Adds a useful publish result to the existing save confirmation. */
    public static function publishMessage(string $message): string
    {
        try {
            return self::publish()
                ? $message . ' Website updated automatically.'
                : $message;
        } catch (Throwable $e) {
            error_log('Automatic website publish failed: ' . $e->getMessage());
            return $message . ' Website auto-update failed: ' . $e->getMessage();
        }
    }

    private static function writeFile(string $path, string $contents): void
    {
        $directory = dirname($path);
        if (!is_dir($directory) && !mkdir($directory, 0755, true) && !is_dir($directory)) {
            throw new RuntimeException('Could not create website directory: ' . $directory);
        }
        if (file_put_contents($path, $contents . PHP_EOL, LOCK_EX) === false) {
            throw new RuntimeException('Could not write website file: ' . $path);
        }
    }

    private static function copyNewsImages(string $sourceDirectory, string $targetDirectory): void
    {
        if (!is_dir($sourceDirectory)) {
            return;
        }
        if (!is_dir($targetDirectory) && !mkdir($targetDirectory, 0755, true) && !is_dir($targetDirectory)) {
            throw new RuntimeException('Could not create news image directory: ' . $targetDirectory);
        }

        foreach (scandir($sourceDirectory) ?: [] as $filename) {
            if ($filename === '.' || $filename === '..') {
                continue;
            }
            $source = $sourceDirectory . DIRECTORY_SEPARATOR . $filename;
            if (!is_file($source)) {
                continue;
            }
            $target = $targetDirectory . DIRECTORY_SEPARATOR . $filename;
            if (!copy($source, $target)) {
                throw new RuntimeException('Could not copy news image: ' . $filename);
            }
        }
    }
}
