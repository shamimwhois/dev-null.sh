/**
 * The most tags a commit may carry, and the longest a tag may be. The form request enforces both, so these keep the
 * composer from offering something the server would only refuse.
 */
export const maxTags = 5;
export const maxTagLength = 24;

/**
 * What a typed tag becomes before it is shown or sent: trimmed, lower cased, and every run of anything that is not a
 * letter or a digit turned into one dash, with no dash left at either end. "Design Systems" and "design_systems" both
 * become "design-systems", so they are one tag.
 *
 * The server normalizes the same way in App\Models\Tag::normalize. A tag that is already normalized is unchanged.
 */
export function normalizeTag(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Whether a tag can be added at all: something left after normalizing, short enough, and not already there.
 */
export function canAddTag(tags: string[], value: string): boolean {
    const tag = normalizeTag(value);

    return (
        tag !== '' &&
        tag.length <= maxTagLength &&
        tags.length < maxTags &&
        !tags.includes(tag)
    );
}
