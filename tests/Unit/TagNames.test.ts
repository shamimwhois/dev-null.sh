import assert from 'node:assert/strict';
import { test } from 'node:test';
import { canAddTag, maxTags, normalizeTag } from '../../resources/js/lib/tags.ts';

void test('a typed tag becomes one lower case, dash separated name', () => {
    assert.equal(normalizeTag('Design Systems'), 'design-systems');
    assert.equal(normalizeTag('design_systems'), 'design-systems');
    assert.equal(normalizeTag('  PHP  '), 'php');
    assert.equal(normalizeTag('C++'), 'c');
    assert.equal(normalizeTag('--already--fine--'), 'already-fine');
});

void test('a tag that is already normalized is left alone', () => {
    for (const tag of ['php', 'design-systems', 'a1', '0', 'x-2-y']) {
        assert.equal(normalizeTag(tag), tag);
    }
});

void test('a tag with nothing left after normalizing is empty', () => {
    for (const value of ['', '   ', '!!!', '---', '_']) {
        assert.equal(normalizeTag(value), '');
    }
});

void test('a tag is only added when it is new, short enough, and there is room', () => {
    assert.equal(canAddTag([], 'php'), true);
    assert.equal(canAddTag([], 'Design Systems'), true);
    assert.equal(canAddTag([], ''), false);
    assert.equal(canAddTag([], '   '), false);
    assert.equal(canAddTag(['php'], 'PHP'), false);
    assert.equal(canAddTag([], 'a'.repeat(25)), false);
    assert.equal(canAddTag([], 'a'.repeat(24)), true);
    assert.equal(canAddTag(Array.from({ length: maxTags }, (_, i) => `t${i}`), 'php'), false);
});
