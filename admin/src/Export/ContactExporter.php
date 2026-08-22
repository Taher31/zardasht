<?php
declare(strict_types=1);

final class ContactExporter
{
    /** Returns the exact shape expected by src/data/contact.json. */
    public function export(): array
    {
        return (new ContactRepository())->get();
    }

    public function toJson(): string
    {
        return json_encode($this->export(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
