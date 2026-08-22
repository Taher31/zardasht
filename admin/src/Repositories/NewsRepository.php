<?php
declare(strict_types=1);

final class NewsRepository
{
    private const LANGS = ['en', 'fa', 'ar', 'ru'];

    public function all(): array
    {
        $stmt = Database::pdo()->query('SELECT * FROM news_posts ORDER BY post_date DESC, id DESC');
        return array_map([self::class, 'hydrate'], $stmt->fetchAll());
    }

    public function find(int $id): ?array
    {
        $stmt = Database::pdo()->prepare('SELECT * FROM news_posts WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ? self::hydrate($row) : null;
    }

    public function slugExists(string $slug, ?int $exceptId = null): bool
    {
        if ($exceptId !== null) {
            $stmt = Database::pdo()->prepare('SELECT 1 FROM news_posts WHERE slug = ? AND id != ?');
            $stmt->execute([$slug, $exceptId]);
        } else {
            $stmt = Database::pdo()->prepare('SELECT 1 FROM news_posts WHERE slug = ?');
            $stmt->execute([$slug]);
        }
        return (bool) $stmt->fetchColumn();
    }

    /** @param array $data slug, post_date, image_path, featured, title[], excerpt[], body[] (each keyed by lang) */
    public function create(array $data): int
    {
        $cols = ['slug', 'post_date', 'image_path', 'featured'];
        $placeholders = ['?', '?', '?', '?'];
        $values = [$data['slug'], $data['post_date'], $data['image_path'], $data['featured'] ? 1 : 0];

        foreach (self::LANGS as $lang) {
            $cols[] = "title_$lang";
            $cols[] = "excerpt_$lang";
            $cols[] = "body_$lang";
            $placeholders[] = '?';
            $placeholders[] = '?';
            $placeholders[] = '?';
            $values[] = $data['title'][$lang];
            $values[] = $data['excerpt'][$lang];
            $values[] = json_encode($data['body'][$lang], JSON_UNESCAPED_UNICODE);
        }

        $sql = 'INSERT INTO news_posts (' . implode(', ', $cols) . ') VALUES (' . implode(', ', $placeholders) . ')';
        Database::pdo()->prepare($sql)->execute($values);
        return (int) Database::pdo()->lastInsertId();
    }

    public function update(int $id, array $data): void
    {
        $sets = ['slug = ?', 'post_date = ?', 'image_path = ?', 'featured = ?'];
        $values = [$data['slug'], $data['post_date'], $data['image_path'], $data['featured'] ? 1 : 0];

        foreach (self::LANGS as $lang) {
            $sets[] = "title_$lang = ?";
            $sets[] = "excerpt_$lang = ?";
            $sets[] = "body_$lang = ?";
            $values[] = $data['title'][$lang];
            $values[] = $data['excerpt'][$lang];
            $values[] = json_encode($data['body'][$lang], JSON_UNESCAPED_UNICODE);
        }
        $values[] = $id;

        $sql = 'UPDATE news_posts SET ' . implode(', ', $sets) . ' WHERE id = ?';
        Database::pdo()->prepare($sql)->execute($values);
    }

    public function delete(int $id): void
    {
        Database::pdo()->prepare('DELETE FROM news_posts WHERE id = ?')->execute([$id]);
    }

    private static function hydrate(array $row): array
    {
        $out = [
            'id' => (int) $row['id'],
            'slug' => $row['slug'],
            'post_date' => $row['post_date'],
            'image_path' => $row['image_path'],
            'featured' => (bool) $row['featured'],
            'title' => [],
            'excerpt' => [],
            'body' => [],
        ];
        foreach (self::LANGS as $lang) {
            $out['title'][$lang] = $row["title_$lang"];
            $out['excerpt'][$lang] = $row["excerpt_$lang"];
            $out['body'][$lang] = json_decode($row["body_$lang"], true) ?? [];
        }
        return $out;
    }
}
