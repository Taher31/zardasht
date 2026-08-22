<?php
declare(strict_types=1);

final class ProductsExporter
{
    private const LANGS = ['en', 'fa', 'ar', 'ru'];

    /** Returns the exact shape expected by src/data/products.json. */
    public function export(): array
    {
        $sections = (new ProductRepository())->allSections();

        $out = [];
        foreach (self::LANGS as $lang) {
            $out[$lang] = array_map(static function (array $section) use ($lang): array {
                return [
                    'id' => $section['section_key'],
                    'badge' => $section['badge'],
                    'title' => $section['title'][$lang],
                    'description' => $section['description'][$lang],
                    'products' => array_map(static function (array $item) use ($lang): array {
                        return [
                            'name' => $item['name'][$lang],
                            'description' => $item['description'][$lang],
                            'tag' => $item['tag'][$lang],
                        ];
                    }, $section['items']),
                ];
            }, $sections);
        }
        return $out;
    }

    public function toJson(): string
    {
        return json_encode($this->export(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
