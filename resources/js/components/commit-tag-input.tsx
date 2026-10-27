import { X } from 'lucide-react';
import { useState } from 'react';
import { canAddTag, maxTagLength, maxTags, normalizeTag } from '@/lib/tags';

/**
 * The tags of the commit being written. They are named inputs rather than composer state, so the form carries them
 * the way it carries the poll, and nothing has to be threaded through the composer to reach them.
 *
 * A tag is added on Enter or a comma, and the last one comes off with Backspace in an empty field.
 */
export function CommitTagInput({ id }: { id: string }) {
    const [tags, setTags] = useState<string[]>([]);
    const [draft, setDraft] = useState('');

    const add = (value: string) => {
        if (!canAddTag(tags, value)) {
            setDraft('');

            return;
        }

        setTags([...tags, normalizeTag(value)]);
        setDraft('');
    };

    const remove = (tag: string) => {
        setTags(tags.filter((existing) => existing !== tag));
    };

    return (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
                <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-muted py-0.5 pr-1 pl-2 text-xs font-medium text-muted-foreground"
                >
                    #{tag}
                    <button
                        type="button"
                        onClick={() => remove(tag)}
                        aria-label={`Remove tag ${tag}`}
                        className="rounded-full p-0.5 transition hover:bg-background hover:text-foreground"
                    >
                        <X className="size-3" />
                    </button>
                </span>
            ))}

            {tags.length < maxTags && (
                <input
                    id={`${id}-tag`}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ',') {
                            // The composer submits on Enter, and this field is part of that form.
                            event.preventDefault();
                            add(draft);

                            return;
                        }

                        if (event.key === 'Backspace' && draft === '') {
                            const last = tags.at(-1);

                            if (last !== undefined) {
                                remove(last);
                            }
                        }
                    }}
                    onBlur={() => add(draft)}
                    maxLength={maxTagLength * 2}
                    placeholder={
                        tags.length === 0
                            ? 'Add tags, up to 5'
                            : 'Add another tag'
                    }
                    aria-label="Add a tag"
                    autoComplete="off"
                    className="min-w-32 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    data-test="tag-input"
                />
            )}

            {tags.map((tag) => (
                <input key={tag} type="hidden" name="tags[]" value={tag} />
            ))}
        </div>
    );
}
