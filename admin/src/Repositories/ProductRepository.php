<?php
declare(strict_types=1);

final class ProductRepository
{
    private const LANGS = ['en', 'fa', 'ar', 'ru'];

    public function allSections(): array
    {
        $stmt = Database::pdo()->query('SELECT * FROM product_sections ORDER BY sort_order, id');
        $sections = array_map([self::class, 'hydrateSection'], $stmt->fetchAll());

        $itemsStmt = Database::pdo()->query('SELECT * FROM product_items ORDER BY sort_order, id');
        $itemsBySection = [];
        foreach ($itemsStmt->fetchAll() as $row) {
            $itemsBySection[(int) $row['section_id']][] = self::hydrateItem($row);
        }

        foreach ($sections as &$section) {
            $section['items'] = $itemsBySection[$section['id']] ?? [];
        }
        return $sections;
    }

    public function findSection(int $id): ?array
    {
        $stmt = Database::pdo()->prepare('SELECT * FROM product_sections WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ? self::hydrateSection($row) : null;
    }

    public function sectionKeyExists(string $key, ?int $exceptId = null): bool
    {
        if ($exceptId !== null) {
            $stmt = Database::pdo()->prepare('SELECT 1 FROM product_sections WHERE section_key = ? AND id != ?');
            $stmt->execute([$key, $exceptId]);
        } else {
            $stmt = Database::pdo()->prepare('SELECT 1 FROM product_sections WHERE section_key = ?');
            $stmt->execute([$key]);
        }
        return (bool) $stmt->fetchColumn();
    }

    public function createSection(array $data): int
    {
        $cols = ['section_key', 'badge', 'sort_order'];
        $values = [$data['section_key'], $data['badge'], $data['sort_order']];
        foreach (self::LANGS as $lang) {
            $cols[] = "title_$lang";
            $cols[] = "description_$lang";
            $values[] = $data['title'][$lang];
            $values[] = $data['description'][$lang];
        }
        $sql = 'INSERT INTO product_sections (' . implode(', ', $cols) . ') VALUES (' . implode(', ', array_fill(0, count($cols), '?')) . ')';
        Database::pdo()->prepare($sql)->execute($values);
        return (int) Database::pdo()->lastInsertId();
    }

    public function updateSection(int $id, array $data): void
    {
        $sets = ['section_key = ?', 'badge = ?', 'sort_order = ?'];
        $values = [$data['section_key'], $data['badge'], $data['sort_order']];
        foreach (self::LANGS as $lang) {
            $sets[] = "title_$lang = ?";
            $sets[] = "description_$lang = ?";
            $values[] = $data['title'][$lang];
            $values[] = $data['description'][$lang];
        }
        $values[] = $id;
        Database::pdo()->prepare('UPDATE product_sections SET ' . implode(', ', $sets) . ' WHERE id = ?')->execute($values);
    }

    public function deleteSection(int $id): void
    {
        Database::pdo()->prepare('DELETE FROM product_sections WHERE id = ?')->execute([$id]);
    }

    public function findItem(int $id): ?array
    {
        $stmt = Database::pdo()->prepare('SELECT * FROM product_items WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ? self::hydrateItem($row) : null;
    }

    public function createItem(int $sectionId, array $data): int
    {
        $cols = ['section_id', 'sort_order'];
        $values = [$sectionId, $data['sort_order']];
        foreach (self::LANGS as $lang) {
            $cols[] = "name_$lang"; $cols[] = "description_$lang"; $cols[] = "tag_$lang";
            $values[] = $data['name'][$lang]; $values[] = $data['description'][$lang]; $values[] = $data['tag'][$lang];
        }
        $sql = 'INSERT INTO product_items (' . implode(', ', $cols) . ') VALUES (' . implode(', ', array_fill(0, count($cols), '?')) . ')';
        Database::pdo()->prepare($sql)->execute($values);
        return (int) Database::pdo()->lastInsertId();
    }

    public function updateItem(int $id, array $data): void
    {
        $sets = ['sort_order = ?'];
        $values = [$data['sort_order']];
        foreach (self::LANGS as $lang) {
            $sets[] = "name_$lang = ?"; $sets[] = "description_$lang = ?"; $sets[] = "tag_$lang = ?";
            $values[] = $data['name'][$lang]; $values[] = $data['description'][$lang]; $values[] = $data['tag'][$lang];
        }
        $values[] = $id;
        Database::pdo()->prepare('UPDATE product_items SET ' . implode(', ', $sets) . ' WHERE id = ?')->execute($values);
    }

    public function deleteItem(int $id): void
    {
        Database::pdo()->prepare('DELETE FROM product_items WHERE id = ?')->execute([$id]);
    }

    private static function hydrateSection(array $row): array
    {
        $out = [
            'id' => (int) $row['id'],
            'section_key' => $row['section_key'],
            'badge' => $row['badge'],
            'sort_order' => (int) $row['sort_order'],
            'title' => [], 'description' => [],
        ];
        foreach (self::LANGS as $lang) {
            $out['title'][$lang] = $row["title_$lang"];
            $out['description'][$lang] = $row["description_$lang"];
        }
        return $out;
    }

    private static function hydrateItem(array $row): array
    {
        $out = [
            'id' => (int) $row['id'],
            'section_id' => (int) $row['section_id'],
            'sort_order' => (int) $row['sort_order'],
            'name' => [], 'description' => [], 'tag' => [],
        ];
        foreach (self::LANGS as $lang) {
            $out['name'][$lang] = $row["name_$lang"];
            $out['description'][$lang] = $row["description_$lang"];
            $out['tag'][$lang] = $row["tag_$lang"];
        }
        return $out;
    }
}
