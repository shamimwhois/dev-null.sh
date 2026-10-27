<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\CarbonInterface;
use Database\Factories\TagFactory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property-read string $id
 * @property-read string $name
 * @property-read CarbonInterface $created_at
 * @property-read CarbonInterface $updated_at
 * @property-read Collection<int, Commit> $commits
 * @property-read int|null $commits_count
 */
final class Tag extends Model
{
    /** @use HasFactory<TagFactory> */
    use HasFactory;

    use HasUuids;

    /**
     * Enough to file a commit under, few enough that the line of tags under it stays a line.
     */
    public const int MAX_PER_COMMIT = 5;

    public const int MAX_NAME_LENGTH = 24;

    /**
     * Lower case letters and digits, with single dashes between words.
     */
    public const string PATTERN = '/^[a-z0-9]+(?:-[a-z0-9]+)*$/';

    /**
     * @return array<string, string>
     */
    public function casts(): array
    {
        return [
            'id' => 'string',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsToMany<Commit, $this>
     */
    public function commits(): BelongsToMany
    {
        return $this->belongsToMany(Commit::class)->withTimestamps();
    }

    /**
     * What a typed tag becomes before it is stored or matched: trimmed, lower cased, and every run of anything that
     * is not a letter or a digit turned into one dash, so "Design Systems" and "design_systems" are the same tag.
     */
    public static function normalize(string $name): string
    {
        return mb_trim(
            (string) preg_replace('/[^a-z0-9]+/', '-', mb_strtolower(mb_trim($name))),
            '-',
        );
    }
}
