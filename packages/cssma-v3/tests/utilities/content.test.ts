import { describe, it, expect } from 'vitest';
import { parseContent } from '../../src/parser/utilities/content';

describe('parseContent', () => {
  it('parses content-none', () => {
    expect(parseContent('content-none')).toEqual({
      type: 'content',
      preset: 'none',
      raw: 'content-none',
      arbitrary: false,
    });
  });

  it('parses content-(--custom)', () => {
    expect(parseContent('content-(--my-content)')).toEqual({
      type: 'content',
      preset: '--my-content',
      raw: 'content-(--my-content)',
      arbitrary: true,
    });
  });

  it('parses content-[attr(data-x)]', () => {
    expect(parseContent('content-[attr(data-x)]')).toEqual({
      type: 'content',
      preset: 'attr(data-x)',
      raw: 'content-[attr(data-x)]',
      arbitrary: true,
    });
  });

  it('parses content-[var(--foo)]', () => {
    expect(parseContent('content-[var(--foo)]')).toEqual({
      type: 'content',
      preset: 'var(--foo)',
      raw: 'content-[var(--foo)]',
      arbitrary: true,
    });
  });

  it("parses content-['Hello_World']", () => {
    expect(parseContent("content-['Hello_World']")).toEqual({
      type: 'content',
      preset: "'Hello_World'",
      raw: "content-['Hello_World']",
      arbitrary: true,
    });
  });

  it("parses content-['Hello\\_World'] (escaped underscore)", () => {
    expect(parseContent("content-['Hello\\_World']")).toEqual({
      type: 'content',
      preset: "'Hello\\_World'",
      raw: "content-['Hello\\_World']",
      arbitrary: true,
    });
  });

  it('returns null for invalid value (missing brackets)', () => {
    expect(parseContent('content-foo')).toBeNull();
  });

  it('returns null for invalid value (malformed custom property)', () => {
    expect(parseContent('content-(foo)')).toBeNull();
  });

  it('returns null for completely invalid', () => {
    expect(parseContent('content-')).toBeNull();
    expect(parseContent('content-[]')).toBeNull();
    expect(parseContent('content-()')).toBeNull();
  });
}); 