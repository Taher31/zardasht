<?php
declare(strict_types=1);

final class TradeCountryRepository
{
    private const LOCALE_LANGS = ['fa', 'ar', 'ru'];

    public function all(): array
    {
        $stmt = Database::pdo()->query('SELECT * FROM trade_countries ORDER BY sort_order, id');
        $countries = array_map([self::class, 'hydrateCountry'], $stmt->fetchAll());

        $names = self::fetchLocaleMap('trade_country_names', 'name');
        $notes = self::fetchLocaleMap('trade_country_notes', 'note');

        foreach ($countries as &$c) {
            $c['locale_names'] = $names[$c['id']] ?? [];
            $c['locale_notes'] = $notes[$c['id']] ?? [];
        }
        return $countries;
    }

    public function find(int $id): ?array
    {
        $stmt = Database::pdo()->prepare('SELECT * FROM trade_countries WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            return null;
        }
        $country = self::hydrateCountry($row);

        $namesStmt = Database::pdo()->prepare('SELECT lang, name FROM trade_country_names WHERE country_id = ?');
        $namesStmt->execute([$id]);
        $country['locale_names'] = array_column($namesStmt->fetchAll(), 'name', 'lang');

        $notesStmt = Database::pdo()->prepare('SELECT lang, note FROM trade_country_notes WHERE country_id = ?');
        $notesStmt->execute([$id]);
        $country['locale_notes'] = array_column($notesStmt->fetchAll(), 'note', 'lang');

        foreach (self::LOCALE_LANGS as $lang) {
            $country['locale_names'][$lang] ??= '';
            $country['locale_notes'][$lang] ??= '';
        }
        return $country;
    }

    public function pageSlugExists(string $slug, ?int $exceptId = null): bool
    {
        if ($exceptId !== null) {
            $stmt = Database::pdo()->prepare('SELECT 1 FROM trade_countries WHERE page_slug = ? AND id != ?');
            $stmt->execute([$slug, $exceptId]);
        } else {
            $stmt = Database::pdo()->prepare('SELECT 1 FROM trade_countries WHERE page_slug = ?');
            $stmt->execute([$slug]);
        }
        return (bool) $stmt->fetchColumn();
    }

    /** @param array $data country_code, country_name, capital, currency, status, notes, main_exports[], main_imports[], compliance_notes, page_slug, sort_order, locale_names[lang], locale_notes[lang] */
    public function create(array $data): int
    {
        $stmt = Database::pdo()->prepare(
            'INSERT INTO trade_countries (country_code, country_name, capital, currency, status, notes, main_exports, main_imports, compliance_notes, page_slug, sort_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute(self::countryValues($data));
        $id = (int) Database::pdo()->lastInsertId();
        $this->saveLocale($id, $data);
        return $id;
    }

    public function update(int $id, array $data): void
    {
        $stmt = Database::pdo()->prepare(
            'UPDATE trade_countries SET country_code=?, country_name=?, capital=?, currency=?, status=?, notes=?, main_exports=?, main_imports=?, compliance_notes=?, page_slug=?, sort_order=? WHERE id=?'
        );
        $stmt->execute([...self::countryValues($data), $id]);
        $this->saveLocale($id, $data);
    }

    public function delete(int $id): void
    {
        Database::pdo()->prepare('DELETE FROM trade_countries WHERE id = ?')->execute([$id]);
    }

    /** Every English export/import/compliance string across all countries, for the translation-terms screen. */
    public function distinctSourceStrings(): array
    {
        $stmt = Database::pdo()->query('SELECT main_exports, main_imports, compliance_notes FROM trade_countries');
        $items = [];
        $compliance = [];
        foreach ($stmt->fetchAll() as $row) {
            foreach (json_decode($row['main_exports'], true) ?? [] as $s) $items[$s] = true;
            foreach (json_decode($row['main_imports'], true) ?? [] as $s) $items[$s] = true;
            if ($row['compliance_notes'] !== '') $compliance[$row['compliance_notes']] = true;
        }
        return ['item' => array_keys($items), 'compliance' => array_keys($compliance)];
    }

    private function saveLocale(int $countryId, array $data): void
    {
        foreach (self::LOCALE_LANGS as $lang) {
            $name = $data['locale_names'][$lang] ?? '';
            $note = $data['locale_notes'][$lang] ?? '';
            if ($name !== '') {
                Database::pdo()->prepare(
                    'INSERT INTO trade_country_names (country_id, lang, name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)'
                )->execute([$countryId, $lang, $name]);
            }
            if ($note !== '') {
                Database::pdo()->prepare(
                    'INSERT INTO trade_country_notes (country_id, lang, note) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE note = VALUES(note)'
                )->execute([$countryId, $lang, $note]);
            }
        }
    }

    private static function countryValues(array $data): array
    {
        return [
            $data['country_code'],
            $data['country_name'],
            $data['capital'],
            $data['currency'],
            $data['status'] ? 1 : 0,
            $data['notes'],
            json_encode($data['main_exports'], JSON_UNESCAPED_UNICODE),
            json_encode($data['main_imports'], JSON_UNESCAPED_UNICODE),
            $data['compliance_notes'],
            $data['page_slug'],
            $data['sort_order'],
        ];
    }

    private static function fetchLocaleMap(string $table, string $valueCol): array
    {
        $stmt = Database::pdo()->query("SELECT country_id, lang, $valueCol AS value FROM $table");
        $out = [];
        foreach ($stmt->fetchAll() as $row) {
            $out[(int) $row['country_id']][$row['lang']] = $row['value'];
        }
        return $out;
    }

    private static function hydrateCountry(array $row): array
    {
        return [
            'id' => (int) $row['id'],
            'country_code' => $row['country_code'],
            'country_name' => $row['country_name'],
            'capital' => $row['capital'],
            'currency' => $row['currency'],
            'status' => (bool) $row['status'],
            'notes' => $row['notes'],
            'main_exports' => json_decode($row['main_exports'], true) ?? [],
            'main_imports' => json_decode($row['main_imports'], true) ?? [],
            'compliance_notes' => $row['compliance_notes'],
            'page_slug' => $row['page_slug'],
            'sort_order' => (int) $row['sort_order'],
        ];
    }
}
