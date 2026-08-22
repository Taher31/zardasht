<?php
declare(strict_types=1);

final class NewsExporter
{
    /** Returns the exact array shape expected by src/data/news.json (see admin/README-EXPORT.md). */
    public function export(): array
    {
        $posts = (new NewsRepository())->all();
        return array_map(static function (array $p): array {
            return [
                'slug' => $p['slug'],
                'date' => $p['post_date'],
                'image' => $p['image_path'],
                'featured' => $p['featured'],
                'title' => $p['title'],
                'excerpt' => $p['excerpt'],
                'body' => $p['body'],
            ];
        }, $posts);
    }

    public function toJson(): string
    {
        return json_encode($this->export(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
