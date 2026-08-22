<?php
declare(strict_types=1);

final class TradeExporter
{
    private const LOCALE_LANGS = ['fa', 'ar', 'ru'];

    /** Returns the exact array shape expected by public/data/trade-countries.json. */
    public function exportCountries(): array
    {
        $countries = (new TradeCountryRepository())->all();
        return array_map(static function (array $c): array {
            return [
                'country_code' => $c['country_code'],
                'country_name' => $c['country_name'],
                'capital' => $c['capital'],
                'currency' => $c['currency'],
                'status' => $c['status'],
                'notes' => $c['notes'],
                'main_exports' => $c['main_exports'],
                'main_imports' => $c['main_imports'],
                'compliance_notes' => $c['compliance_notes'],
                'page_slug' => $c['page_slug'],
            ];
        }, $countries);
    }

    /** Returns the exact shape expected by src/data/country-locale.json. */
    public function exportLocale(): array
    {
        $countries = (new TradeCountryRepository())->all();
        $terms = (new TradeTermRepository())->asLookup();

        $out = [];
        foreach (self::LOCALE_LANGS as $lang) {
            $names = [];
            $notes = [];
            foreach ($countries as $c) {
                $name = $c['locale_names'][$lang] ?? '';
                $note = $c['locale_notes'][$lang] ?? '';
                if ($name !== '') $names[$c['country_code']] = $name;
                if ($note !== '') $notes[$c['country_code']] = $note;
            }
            $items = [];
            foreach ($terms['item'] as $sourceEn => $t) {
                if ($t[$lang] !== '') $items[$sourceEn] = $t[$lang];
            }
            $compliance = [];
            foreach ($terms['compliance'] as $sourceEn => $t) {
                if ($t[$lang] !== '') $compliance[$sourceEn] = $t[$lang];
            }
            $out[$lang] = ['names' => $names, 'notes' => $notes, 'items' => $items, 'compliance' => $compliance];
        }
        return $out;
    }

    public function countriesToJson(): string
    {
        return json_encode($this->exportCountries(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    public function localeToJson(): string
    {
        return json_encode($this->exportLocale(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
