import { describe, it, expect } from 'vitest';
import { parseMisc } from '../../src/parser/utilities/misc';

describe('parseContent', () => {
  it('parses content-none', () => {
    expect(parseMisc('content-none')).toEqual({
      type: 'content',
      preset: 'none',
      raw: 'content-none',
      arbitrary: false,
    });
  });

  it('parses content-(--custom)', () => {
    expect(parseMisc('content-(--my-content)')).toEqual({
      type: 'content',
      preset: '--my-content',
      raw: 'content-(--my-content)',
      arbitrary: true,
    });
  });

  it('parses content-[attr(data-x)]', () => {
    expect(parseMisc('content-[attr(data-x)]')).toEqual({
      type: 'content',
      preset: 'attr(data-x)',
      raw: 'content-[attr(data-x)]',
      arbitrary: true,
    });
  });

  it('parses content-[var(--foo)]', () => {
    expect(parseMisc('content-[var(--foo)]')).toEqual({
      type: 'content',
      preset: 'var(--foo)',
      raw: 'content-[var(--foo)]',
      arbitrary: true,
    });
  });

  it("parses content-['Hello_World']", () => {
    expect(parseMisc("content-['Hello_World']")).toEqual({
      type: 'content',
      preset: "'Hello_World'",
      raw: "content-['Hello_World']",
      arbitrary: true,
    });
  });

  it("parses content-['Hello\\_World'] (escaped underscore)", () => {
    expect(parseMisc("content-['Hello\\_World']")).toEqual({
      type: 'content',
      preset: "'Hello\\_World'",
      raw: "content-['Hello\\_World']",
      arbitrary: true,
    });
  });

  it('returns null for invalid value (missing brackets)', () => {
    expect(parseMisc('content-foo')).toBeNull();
  });

  it('returns null for invalid value (malformed custom property)', () => {
    expect(parseMisc('content-(foo)')).toBeNull();
  });

  it('returns null for completely invalid', () => {
    expect(parseMisc('content-')).toBeNull();
    expect(parseMisc('content-[]')).toBeNull();
    expect(parseMisc('content-()')).toBeNull();
  });
}); 