import { describe, it, expect } from 'vitest';
import { parseFlexShrinkUtility } from '../../src/parser/utilities/flexShrink';

describe('parseFlexShrinkUtility', () => {
  it('parses shrink', () => {
    expect(parseFlexShrinkUtility('shrink')).toEqual({
      type: 'flex-shrink',
      preset: '1',
      raw: 'shrink',
      arbitrary: false,
    });
  });
  it('parses shrink-0', () => {
    expect(parseFlexShrinkUtility('shrink-0')).toEqual({
      type: 'flex-shrink',
      preset: '0',
      raw: 'shrink-0',
      arbitrary: false,
    });
  });
  it('parses shrink-[arbitrary]', () => {
    expect(parseFlexShrinkUtility('shrink-[2]')).toEqual({
      type: 'flex-shrink',
      value: '2',
      raw: 'shrink-[2]',
      arbitrary: true,
    });
    expect(parseFlexShrinkUtility('shrink-[var(--shrink)]')).toEqual({
      type: 'flex-shrink',
      value: 'var(--shrink)',
      raw: 'shrink-[var(--shrink)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseFlexShrinkUtility('shrink-')).toBeNull();
    expect(parseFlexShrinkUtility('shrink-arbitrary')).toBeNull();
    expect(parseFlexShrinkUtility('flex-shrink')).toBeNull();
  });
}); 