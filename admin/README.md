# Content admin panel

A small PHP + MySQL app for editing news, contact info, the products
catalog, and trade-map countries without touching code. When the admin
folder is inside the Astro project, every successful edit automatically
regenerates the website JSON files and copies uploaded news images.

Requires PHP 8.1+ with the `pdo_mysql` and `zip` extensions (both are
standard on cPanel's PHP), and MySQL 5.7+ or MariaDB 10.2+ (for native
`JSON` column support).

## First-time setup

1. **Create the database.** On cPanel: MySQL Databases → create a database
   and a user, add the user to the database with all privileges.
2. **Run the schema.** Import [db/schema.sql](db/schema.sql) via
   phpMyAdmin (or `mysql -u USER -p DBNAME < db/schema.sql`).
3. **Configure credentials.** Copy `config/config.sample.php` to
   `config/config.php` and fill in the DB host/name/user/password cPanel
   gave you.
4. **Create the first login**, from the command line in the `admin/`
   folder:
   ```bash
   php scripts/create_admin.php youruser a-strong-password
   ```
5. **Seed existing content** (optional but recommended — populates the
   panel with what's already on the site instead of starting empty):
   ```bash
   php scripts/seed.php
   ```
6. **Deploy.** Point the web server at `admin/public/` as the document
   root — either a subdomain (`admin.yoursite.com` → `admin/public/`) or,
   if your host only supports a flat `public_html/`, upload the whole
   `admin/` folder into `public_html/admin/` and rely on the `.htaccess`
   files under `config/`, `db/`, `src/`, and `scripts/` to block direct
   access to everything outside `public/`. A subdomain pointed straight at
   `public/` is the safer option where available.
7. Log in at your admin URL. Localhost skips the login screen; deployed
   installations still require authentication.

## Automatic website updates

By default, each successful create, edit, delete, or translation save runs
`SitePublisher`. It writes the latest database content directly to the Astro
project's `src/data/` and `public/data/` files and copies uploaded news images
to `public/images/news/`. When `npm run dev` is running, Astro detects those
file changes and refreshes the local site automatically.

You can also trigger a full sync manually from `admin/`:

```bash
php scripts/publish.php
```

The default project root is detected automatically. If the admin folder is
deployed elsewhere, add a `site` block to `config/config.php` using the example
in `config/config.sample.php`. Set `auto_publish` to `false` to disable it.

The production site is static: after source files are synchronized, it still
needs `npm run build` and deployment of `dist/` unless the hosting environment
has its own build/deploy automation. The ZIP export remains available as a
backup and manual deployment option; see [README-EXPORT.md](README-EXPORT.md).

## Local development

Any local PHP + MySQL setup works (XAMPP, Laragon, Docker). From the
`admin/` folder:

```bash
php -S localhost:8000 -t public
```

Point `config/config.php` at your local MySQL instance, then run steps
2–5 above against it.
