import { describe, it, expect } from 'vitest';
import { parseRowStart } from '../../src/parser/utilities/rowStart';

describe('parseRowStartUtility', () => {
  it('parses row-start-<number>', () => {
    expect(parseRowStart('row-start-1')).toEqual({
      type: 'row-start',
      value: 1,
      raw: 'row-start-1',
      arbitrary: false,
    });
    expect(parseRowStart('row-start-12')).toEqual({
      type: 'row-start',
      value: 12,
      raw: 'row-start-12',
      arbitrary: false,
    });
  });
  it('parses row-start-auto', () => {
    expect(parseRowStart('row-start-auto')).toEqual({
      type: 'row-start',
      preset: 'auto',
      raw: 'row-start-auto',
      arbitrary: false,
    });
  });
  it('parses row-start-[arbitrary]', () => {
    expect(parseRowStart('row-start-[7]')).toEqual({
      type: 'row-start',
      value: '7',
      raw: 'row-start-[7]',
      arbitrary: true,
    });
    expect(parseRowStart('row-start-[var(--start)]')).toEqual({
      type: 'row-start',
      value: 'var(--start)',
      raw: 'row-start-[var(--start)]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseRowStart('row-start')).toBeNull();
    expect(parseRowStart('row-start-')).toBeNull();
    expect(parseRowStart('row-start-arbitrary')).toBeNull();
    expect(parseRowStart('col-start-2')).toBeNull();
  });
}); 