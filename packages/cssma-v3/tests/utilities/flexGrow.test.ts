import { describe, it, expect } from 'vitest';
import { parseFlexGrowUtility } from '../../src/parser/utilities/flexGrow';

describe('parseFlexGrowUtility', () => {
  it('parses grow', () => {
    expect(parseFlexGrowUtility('grow')).toEqual({
      type: 'flex-grow',
      preset: '1',
      raw: 'grow',
      arbitrary: false,
    });
  });
  it('parses grow-0', () => {
    expect(parseFlexGrowUtility('grow-0')).toEqual({
      type: 'flex-grow',
      preset: '0',
      raw: 'grow-0',
      arbitrary: false,
    });
  });
  it('parses grow-[arbitrary]', () => {
    expect(parseFlexGrowUtility('grow-[2]')).toEqual({
      type: 'flex-grow',
      value: '2',
      raw: 'grow-[2]',
      arbitrary: true,
    });
    expect(parseFlexGrowUtility('grow-[var(--grow)]')).toEqual({
      type: 'flex-grow',
      value: 'var(--grow)',
      raw: 'grow-[var(--grow)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseFlexGrowUtility('grow-')).toBeNull();
    expect(parseFlexGrowUtility('grow-arbitrary')).toBeNull();
    expect(parseFlexGrowUtility('flex-grow')).toBeNull();
  });
}); 