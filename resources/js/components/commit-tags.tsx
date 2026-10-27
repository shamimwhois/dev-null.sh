import type { Tag } from '@/types';

/**
 * The tags a commit was filed under, under its body. They are labels rather than links for now: there is no page
 * that lists a tag's commits yet, and a link that goes nowhere is worse than none.
 */
export function CommitTags({ tags }: { tags: Tag[] }) {
    if (tags.length === 0) {
        return null;
    }

    return (
        <ul
            className="mt-2 flex flex-wrap gap-1.5"
            aria-label="Tags"
            data-test="commit-tags"
        >
            {tags.map((tag) => (
                <li
                    key={tag.id}
                    className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                    #{tag.name}
                </li>
            ))}
        </ul>
    );
}
