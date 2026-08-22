<?php
declare(strict_types=1);

/** Manages trade_translation_terms — the global English-string → fa/ar/ru dictionaries
 *  that back CountryLocalePack.items / .compliance in country-locale.json. */
final class TradeTermRepository
{
    public function all(string $termType): array
    {
        $stmt = Database::pdo()->prepare('SELECT * FROM trade_translation_terms WHERE term_type = ? ORDER BY source_en');
        $stmt->execute([$termType]);
        return $stmt->fetchAll();
    }

    public function find(int $id): ?array
    {
        $stmt = Database::pdo()->prepare('SELECT * FROM trade_translation_terms WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    /** Source strings from live country data that don't have a term row yet. */
    public function missing(string $termType, array $sourceStrings): array
    {
        $existing = array_column($this->all($termType), 'source_en');
        return array_values(array_diff($sourceStrings, $existing));
    }

    public function upsert(string $termType, string $sourceEn, string $fa, string $ar, string $ru): void
    {
        $stmt = Database::pdo()->prepare(
            'INSERT INTO trade_translation_terms (term_type, source_en, translation_fa, translation_ar, translation_ru)
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE translation_fa = VALUES(translation_fa), translation_ar = VALUES(translation_ar), translation_ru = VALUES(translation_ru)'
        );
        $stmt->execute([$termType, $sourceEn, $fa, $ar, $ru]);
    }

    public function delete(int $id): void
    {
        Database::pdo()->prepare('DELETE FROM trade_translation_terms WHERE id = ?')->execute([$id]);
    }

    /** All terms as term_type => [source_en => [fa=>, ar=>, ru=>]], for the exporter. */
    public function asLookup(): array
    {
        $stmt = Database::pdo()->query('SELECT * FROM trade_translation_terms');
        $out = ['item' => [], 'compliance' => []];
        foreach ($stmt->fetchAll() as $row) {
            $out[$row['term_type']][$row['source_en']] = [
                'fa' => $row['translation_fa'],
                'ar' => $row['translation_ar'],
                'ru' => $row['translation_ru'],
            ];
        }
        return $out;
    }
}
