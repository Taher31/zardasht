<?php
declare(strict_types=1);

final class UploadException extends RuntimeException {}

final class Upload
{
    private const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

    private const ALLOWED_MIME = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
    ];

    /**
     * Validates and stores an uploaded image, returning the site-relative path
     * to save on the record (e.g. "/images/news/factory-visit-1699999999.jpg").
     * $slug is used only to make the filename readable; uniqueness comes from the timestamp.
     */
    public static function storeNewsImage(array $file, string $slug): string
    {
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
            throw new UploadException('No file was uploaded.');
        }
        if ($file['error'] !== UPLOAD_ERR_OK) {
            throw new UploadException('Upload failed (error code ' . $file['error'] . ').');
        }
        if ($file['size'] > self::MAX_BYTES) {
            throw new UploadException('Image is larger than 5 MB.');
        }
        if (!is_uploaded_file($file['tmp_name'])) {
            throw new UploadException('Invalid upload.');
        }

        // Sniff the real MIME type — never trust the client-supplied one or the extension.
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($file['tmp_name']);
        if (!isset(self::ALLOWED_MIME[$mime])) {
            throw new UploadException('Only JPEG, PNG, or WebP images are allowed.');
        }
        // getimagesize() also fails on non-image files that spoof an image MIME type.
        if (@getimagesize($file['tmp_name']) === false) {
            throw new UploadException('File does not look like a valid image.');
        }

        $safeSlug = preg_replace('/[^a-z0-9-]+/', '-', strtolower($slug)) ?: 'news';
        $filename = $safeSlug . '-' . time() . '.' . self::ALLOWED_MIME[$mime];

        $uploadsDir = Database::config()['uploads_dir'];
        if (!is_dir($uploadsDir) && !mkdir($uploadsDir, 0755, true) && !is_dir($uploadsDir)) {
            throw new UploadException('Uploads directory is not writable.');
        }

        $destination = rtrim($uploadsDir, '/\\') . DIRECTORY_SEPARATOR . $filename;
        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            throw new UploadException('Could not save the uploaded file.');
        }

        // Site-relative path matching where the handoff step will copy this file to
        // (public/images/news/<filename>) — see admin/README-EXPORT.md.
        return '/images/news/' . $filename;
    }
}
