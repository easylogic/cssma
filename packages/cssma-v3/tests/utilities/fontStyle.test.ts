import { describe, it, expect } from 'vitest';
import { parseFontStyle } from '../../src/parser/utilities/fontStyle';

describe('parseFontStyle', () => {
  it('parses italic', () => {
    expect(parseFontStyle('italic')).toEqual({ type: 'font-style', value: 'italic', raw: 'italic' });
  });

  it('parses not-italic', () => {
    expect(parseFontStyle('not-italic')).toEqual({ type: 'font-style', value: 'normal', raw: 'not-italic' });
  });

  it('returns null for invalid input', () => {
    expect(parseFontStyle('italicize')).toBeNull();
    expect(parseFontStyle('font-style')).toBeNull();
    expect(parseFontStyle('text-italic')).toBeNull();
  });
}); 