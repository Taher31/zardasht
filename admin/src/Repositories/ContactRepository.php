<?php
declare(strict_types=1);

final class ContactRepository
{
    private const LANGS = ['en', 'fa', 'ar', 'ru'];
    private const FIELDS = ['address', 'address_label', 'phone', 'email'];

    /** Always returns one row — inserts sensible blank defaults on first access. */
    public function get(): array
    {
        $stmt = Database::pdo()->query('SELECT * FROM site_contact WHERE id = 1');
        $row = $stmt->fetch();
        if (!$row) {
            $blank = [];
            foreach (self::LANGS as $lang) {
                foreach (self::FIELDS as $field) {
                    $blank["{$field}_{$lang}"] = '';
                }
            }
            $this->save(self::toNested($blank));
            $stmt = Database::pdo()->query('SELECT * FROM site_contact WHERE id = 1');
            $row = $stmt->fetch();
        }
        return self::toNested($row);
    }

    /** @param array $data keyed by lang => [address, addressLabel, phone, email] */
    public function save(array $data): void
    {
        $cols = [];
        $placeholders = [];
        $updates = [];
        $values = [];
        foreach (self::LANGS as $lang) {
            foreach (self::FIELDS as $field) {
                $col = "{$field}_{$lang}";
                $key = self::camel($field);
                $cols[] = $col;
                $placeholders[] = '?';
                $updates[] = "$col = VALUES($col)";
                $values[] = $data[$lang][$key] ?? '';
            }
        }
        $sql = 'INSERT INTO site_contact (id, ' . implode(', ', $cols) . ') VALUES (1, ' . implode(', ', $placeholders) . ') '
             . 'ON DUPLICATE KEY UPDATE ' . implode(', ', $updates);
        Database::pdo()->prepare($sql)->execute($values);
    }

    private static function camel(string $field): string
    {
        return $field === 'address_label' ? 'addressLabel' : $field;
    }

    private static function toNested(array $row): array
    {
        $out = [];
        foreach (self::LANGS as $lang) {
            $out[$lang] = [
                'address' => $row["address_$lang"] ?? '',
                'addressLabel' => $row["address_label_$lang"] ?? '',
                'phone' => $row["phone_$lang"] ?? '',
                'email' => $row["email_$lang"] ?? '',
            ];
        }
        return $out;
    }
}
