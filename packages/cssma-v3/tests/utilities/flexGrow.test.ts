import { describe, it, expect } from 'vitest';
import { parseFlexGrow } from '../../src/parser/utilities/flexGrow';

describe('parseFlexGrowUtility', () => {
  it('parses grow', () => {
    expect(parseFlexGrow('grow')).toEqual({
      type: 'flex-grow',
      preset: '1',
      raw: 'grow',
      arbitrary: false,
    });
  });
  it('parses grow-0', () => {
    expect(parseFlexGrow('grow-0')).toEqual({
      type: 'flex-grow',
      preset: '0',
      raw: 'grow-0',
      arbitrary: false,
    });
  });
  it('parses grow-[arbitrary]', () => {
    expect(parseFlexGrow('grow-[2]')).toEqual({
      type: 'flex-grow',
      value: '2',
      raw: 'grow-[2]',
      arbitrary: true,
    });
    expect(parseFlexGrow('grow-[var(--grow)]')).toEqual({
      type: 'flex-grow',
      value: 'var(--grow)',
      raw: 'grow-[var(--grow)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseFlexGrow('grow-')).toBeNull();
    expect(parseFlexGrow('grow-arbitrary')).toBeNull();
    expect(parseFlexGrow('flex-grow')).toBeNull();
  });
}); 