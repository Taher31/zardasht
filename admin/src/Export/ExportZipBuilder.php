<?php
declare(strict_types=1);

final class ExportZipBuilder
{
    /**
     * Builds a zip containing every generated data file plus a manifest, and
     * streams it directly to the browser. Uses a temp file because ZipArchive
     * needs real file I/O — the temp file is deleted immediately after streaming,
     * so nothing is left behind on the server.
     */
    public function stream(): void
    {
        $tmpPath = tempnam(sys_get_temp_dir(), 'zdl-export-');
        $zip = new ZipArchive();
        $zip->open($tmpPath, ZipArchive::OVERWRITE);

        $zip->addFromString('news.json', (new NewsExporter())->toJson());
        $zip->addFromString('contact.json', (new ContactExporter())->toJson());
        $zip->addFromString('products.json', (new ProductsExporter())->toJson());

        $tradeExporter = new TradeExporter();
        $zip->addFromString('trade-countries.json', $tradeExporter->countriesToJson());
        $zip->addFromString('country-locale.json', $tradeExporter->localeToJson());

        $uploadsDir = Database::config()['uploads_dir'];
        if (is_dir($uploadsDir)) {
            foreach (scandir($uploadsDir) as $file) {
                if ($file === '.' || $file === '..') continue;
                $zip->addFile($uploadsDir . DIRECTORY_SEPARATOR . $file, 'images/news/' . $file);
            }
        }

        $zip->close();

        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="site-content-export.zip"');
        header('Content-Length: ' . filesize($tmpPath));
        readfile($tmpPath);
        unlink($tmpPath);
    }
}
