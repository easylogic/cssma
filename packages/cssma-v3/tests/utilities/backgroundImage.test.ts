import { describe, it, expect } from 'vitest';
import { parseBackgroundImage } from '../../src/parser/utilities/backgroundImage';

describe('parseBackgroundImage', () => {
  it('parses bg-none', () => {
    expect(parseBackgroundImage('bg-none')).toEqual({
      type: 'background-image',
      preset: 'none',
      raw: 'bg-none',
      arbitrary: false,
    });
  });

  it('parses bg-gradient-to-t', () => {
    expect(parseBackgroundImage('bg-gradient-to-t')).toEqual({
      type: 'background-image',
      preset: 'gradient-to-t',
      raw: 'bg-gradient-to-t',
      arbitrary: false,
    });
  });

  it('parses bg-gradient-to-tr', () => {
    expect(parseBackgroundImage('bg-gradient-to-tr')).toEqual({
      type: 'background-image',
      preset: 'gradient-to-tr',
      raw: 'bg-gradient-to-tr',
      arbitrary: false,
    });
  });

  it('parses bg-gradient-to-b', () => {
    expect(parseBackgroundImage('bg-gradient-to-b')).toEqual({
      type: 'background-image',
      preset: 'gradient-to-b',
      raw: 'bg-gradient-to-b',
      arbitrary: false,
    });
  });

  it('returns null for invalid direction (bg-gradient-to-foo)', () => {
    expect(parseBackgroundImage('bg-gradient-to-foo')).toBeNull();
  });

  it("parses bg-[url('/img/bg.png')]", () => {
    expect(parseBackgroundImage("bg-[url('/img/bg.png')]")).toEqual({
      type: 'background-image',
      preset: "url('/img/bg.png')",
      raw: "bg-[url('/img/bg.png')]",
      arbitrary: true,
    });
  });

  it('parses bg-(--my-img)', () => {
    expect(parseBackgroundImage('bg-(--my-img)')).toEqual({
      type: 'background-image',
      preset: '--my-img',
      raw: 'bg-(--my-img)',
      arbitrary: true,
    });
  });

  it('returns null for empty value (bg-)', () => {
    expect(parseBackgroundImage('bg-')).toBeNull();
  });

  it('returns null for invalid gradient direction (bg-gradient-to-x)', () => {
    expect(parseBackgroundImage('bg-gradient-to-x')).toBeNull();
  });

  it('returns null for malformed custom property', () => {
    expect(parseBackgroundImage('bg-(my-img)')).toBeNull();
  });

  it('returns null for malformed arbitrary', () => {
    expect(parseBackgroundImage('bg-[]')).toBeNull();
  });
}); 