import { describe, it, expect } from 'vitest';
import { parseFieldSizing } from '../../src/parser/utilities/fieldSizing';

describe('parseFieldSizing', () => {
  it('parses field-sizing-fixed', () => {
    expect(parseFieldSizing('field-sizing-fixed')).toEqual({ type: 'field-sizing', value: 'fixed', raw: 'field-sizing-fixed', preset: 'fixed' });
  });
  it('parses field-sizing-content', () => {
    expect(parseFieldSizing('field-sizing-content')).toEqual({ type: 'field-sizing', value: 'content', raw: 'field-sizing-content', preset: 'content' });
  });
  it('returns null for invalid input', () => {
    expect(parseFieldSizing('field-sizing')).toBeNull();
    expect(parseFieldSizing('field-sizing-foo')).toBeNull();
    expect(parseFieldSizing('field-sizing-fixed-content')).toBeNull();
    expect(parseFieldSizing('field-sizing-content-fixed')).toBeNull();
  });
}); 