<?php
declare(strict_types=1);

/**
 * One-time import of the site's current hardcoded content into the admin database,
 * so the admin panel starts from real content instead of empty tables.
 * Run from the admin/ directory: php scripts/seed.php
 *
 * Reads directly from the repo's own JSON data files (src/data/*.json,
 * public/data/trade-countries.json) rather than re-typing the content, since
 * those files already hold exactly what needs to end up in the database.
 * Safe to re-run: each section is skipped if its table already has rows.
 */

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit('CLI only.');
}

require __DIR__ . '/../src/Database.php';

$projectRoot = __DIR__ . '/../..';
$pdo = Database::pdo();

function readJson(string $path): array
{
    if (!is_file($path)) {
        fwrite(STDERR, "Missing file: $path\n");
        exit(1);
    }
    return json_decode(file_get_contents($path), true, flags: JSON_THROW_ON_ERROR);
}

function tableIsEmpty(PDO $pdo, string $table): bool
{
    return (int) $pdo->query("SELECT COUNT(*) FROM $table")->fetchColumn() === 0;
}

// --- News -------------------------------------------------------------
if (tableIsEmpty($pdo, 'news_posts')) {
    $news = readJson("$projectRoot/src/data/news.json");
    $stmt = $pdo->prepare(
        'INSERT INTO news_posts (slug, post_date, image_path, featured, title_en, title_fa, title_ar, title_ru,
            excerpt_en, excerpt_fa, excerpt_ar, excerpt_ru, body_en, body_fa, body_ar, body_ru)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    foreach ($news as $p) {
        $stmt->execute([
            $p['slug'], $p['date'], $p['image'], !empty($p['featured']) ? 1 : 0,
            $p['title']['en'], $p['title']['fa'], $p['title']['ar'], $p['title']['ru'],
            $p['excerpt']['en'], $p['excerpt']['fa'], $p['excerpt']['ar'], $p['excerpt']['ru'],
            json_encode($p['body']['en'], JSON_UNESCAPED_UNICODE), json_encode($p['body']['fa'], JSON_UNESCAPED_UNICODE),
            json_encode($p['body']['ar'], JSON_UNESCAPED_UNICODE), json_encode($p['body']['ru'], JSON_UNESCAPED_UNICODE),
        ]);
    }
    echo 'Seeded ' . count($news) . " news posts.\n";
} else {
    echo "news_posts already has rows, skipping.\n";
}

// --- Contact ------------------------------------------------------------
if (tableIsEmpty($pdo, 'site_contact')) {
    $contact = readJson("$projectRoot/src/data/contact.json");
    $stmt = $pdo->prepare(
        'INSERT INTO site_contact (id, address_en, address_fa, address_ar, address_ru,
            address_label_en, address_label_fa, address_label_ar, address_label_ru,
            phone_en, phone_fa, phone_ar, phone_ru, email_en, email_fa, email_ar, email_ru)
         VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $contact['en']['address'], $contact['fa']['address'], $contact['ar']['address'], $contact['ru']['address'],
        $contact['en']['addressLabel'], $contact['fa']['addressLabel'], $contact['ar']['addressLabel'], $contact['ru']['addressLabel'],
        $contact['en']['phone'], $contact['fa']['phone'], $contact['ar']['phone'], $contact['ru']['phone'],
        $contact['en']['email'], $contact['fa']['email'], $contact['ar']['email'], $contact['ru']['email'],
    ]);
    echo "Seeded contact info.\n";
} else {
    echo "site_contact already has rows, skipping.\n";
}

// --- Products -------------------------------------------------------------
if (tableIsEmpty($pdo, 'product_sections')) {
    $products = readJson("$projectRoot/src/data/products.json");
    $sectionStmt = $pdo->prepare(
        'INSERT INTO product_sections (section_key, badge, sort_order, title_en, title_fa, title_ar, title_ru,
            description_en, description_fa, description_ar, description_ru)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $itemStmt = $pdo->prepare(
        'INSERT INTO product_items (section_id, sort_order, name_en, name_fa, name_ar, name_ru,
            description_en, description_fa, description_ar, description_ru, tag_en, tag_fa, tag_ar, tag_ru)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );

    // English drives the section/item order and identity; fa/ar/ru are matched by array index
    // since all four language arrays share the same section and product order.
    $en = $products['en'];
    $sectionCount = 0;
    $itemCount = 0;
    foreach ($en as $i => $section) {
        $sectionStmt->execute([
            $section['id'], $section['badge'], $i,
            $section['title'], $products['fa'][$i]['title'], $products['ar'][$i]['title'], $products['ru'][$i]['title'],
            $section['description'], $products['fa'][$i]['description'], $products['ar'][$i]['description'], $products['ru'][$i]['description'],
        ]);
        $sectionId = (int) $pdo->lastInsertId();
        $sectionCount++;

        foreach ($section['products'] as $j => $item) {
            $itemStmt->execute([
                $sectionId, $j,
                $item['name'], $products['fa'][$i]['products'][$j]['name'], $products['ar'][$i]['products'][$j]['name'], $products['ru'][$i]['products'][$j]['name'],
                $item['description'], $products['fa'][$i]['products'][$j]['description'], $products['ar'][$i]['products'][$j]['description'], $products['ru'][$i]['products'][$j]['description'],
                $item['tag'], $products['fa'][$i]['products'][$j]['tag'], $products['ar'][$i]['products'][$j]['tag'], $products['ru'][$i]['products'][$j]['tag'],
            ]);
            $itemCount++;
        }
    }
    echo "Seeded $sectionCount product sections, $itemCount items.\n";
} else {
    echo "product_sections already has rows, skipping.\n";
}

// --- Trade countries + locale ---------------------------------------------
if (tableIsEmpty($pdo, 'trade_countries')) {
    $countries = readJson("$projectRoot/public/data/trade-countries.json");
    $locale = is_file("$projectRoot/src/data/country-locale.json")
        ? readJson("$projectRoot/src/data/country-locale.json")
        : ['fa' => [], 'ar' => [], 'ru' => []];

    $countryStmt = $pdo->prepare(
        'INSERT INTO trade_countries (country_code, country_name, capital, currency, status, notes,
            main_exports, main_imports, compliance_notes, page_slug, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $nameStmt = $pdo->prepare('INSERT INTO trade_country_names (country_id, lang, name) VALUES (?, ?, ?)');
    $noteStmt = $pdo->prepare('INSERT INTO trade_country_notes (country_id, lang, note) VALUES (?, ?, ?)');

    foreach ($countries as $i => $c) {
        // TODO data-quality: as of this seed, rows for country_code CN ("Togo") and VE
        // ("Venezuela") both carry Uzbekistan's capital/currency/exports/imports and the
        // same page_slug "uzbekistan" as the real UZ row below — almost certainly leftover
        // copy-paste test data. Imported as-is per the admin panel rollout plan; fix or
        // delete these two rows from the Trade map screen in the admin panel.
        $countryStmt->execute([
            $c['country_code'], $c['country_name'] ?? $c['name'] ?? '', $c['capital'], $c['currency'],
            !empty($c['status']) ? 1 : 0, $c['notes'] ?? '',
            json_encode($c['main_exports'] ?? [], JSON_UNESCAPED_UNICODE),
            json_encode($c['main_imports'] ?? [], JSON_UNESCAPED_UNICODE),
            $c['compliance_notes'] ?? '', $c['page_slug'], $i,
        ]);
        $countryId = (int) $pdo->lastInsertId();
        $code = $c['country_code'];

        foreach (['fa', 'ar', 'ru'] as $lang) {
            $name = $locale[$lang]['names'][$code] ?? null;
            $note = $locale[$lang]['notes'][$code] ?? null;
            if ($name !== null) $nameStmt->execute([$countryId, $lang, $name]);
            if ($note !== null) $noteStmt->execute([$countryId, $lang, $note]);
        }
    }
    echo 'Seeded ' . count($countries) . " trade countries.\n";

    if (tableIsEmpty($pdo, 'trade_translation_terms')) {
        $termStmt = $pdo->prepare(
            'INSERT INTO trade_translation_terms (term_type, source_en, translation_fa, translation_ar, translation_ru)
             VALUES (?, ?, ?, ?, ?)'
        );
        $termCount = 0;
        foreach (['items' => 'item', 'compliance' => 'compliance'] as $key => $termType) {
            $seen = [];
            foreach (['fa', 'ar', 'ru'] as $lang) {
                foreach (($locale[$lang][$key] ?? []) as $sourceEn => $translation) {
                    $seen[$sourceEn][$lang] = $translation;
                }
            }
            foreach ($seen as $sourceEn => $translations) {
                $termStmt->execute([
                    $termType, $sourceEn,
                    $translations['fa'] ?? '', $translations['ar'] ?? '', $translations['ru'] ?? '',
                ]);
                $termCount++;
            }
        }
        echo "Seeded $termCount translation terms.\n";
    }
} else {
    echo "trade_countries already has rows, skipping.\n";
}

echo "Done.\n";
