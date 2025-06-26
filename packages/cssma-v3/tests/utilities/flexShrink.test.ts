import { describe, it, expect } from 'vitest';
import { parseFlexShrink } from '../../src/parser/utilities/flexShrink';

describe('parseFlexShrinkUtility', () => {
  it('parses shrink', () => {
    expect(parseFlexShrink('shrink')).toEqual({
      type: 'flex-shrink',
      preset: '1',
      raw: 'shrink',
      arbitrary: false,
    });
  });
  it('parses shrink-0', () => {
    expect(parseFlexShrink('shrink-0')).toEqual({
      type: 'flex-shrink',
      preset: '0',
      raw: 'shrink-0',
      arbitrary: false,
    });
  });
  it('parses shrink-[arbitrary]', () => {
    expect(parseFlexShrink('shrink-[2]')).toEqual({
      type: 'flex-shrink',
      value: '2',
      raw: 'shrink-[2]',
      arbitrary: true,
    });
    expect(parseFlexShrink('shrink-[var(--shrink)]')).toEqual({
      type: 'flex-shrink',
      value: 'var(--shrink)',
      raw: 'shrink-[var(--shrink)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseFlexShrink('shrink-')).toBeNull();
    expect(parseFlexShrink('shrink-arbitrary')).toBeNull();
    expect(parseFlexShrink('flex-shrink')).toBeNull();
  });
}); 