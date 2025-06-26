import { describe, it, expect } from 'vitest';
import { parseGridTemplateRowsUtility } from '../../src/parser/utilities/gridTemplateRows';

describe('parseGridTemplateRowsUtility', () => {
  it('parses grid-rows-none', () => {
    expect(parseGridTemplateRowsUtility('grid-rows-none')).toEqual({
      type: 'grid-template-rows',
      preset: 'none',
      raw: 'grid-rows-none',
      arbitrary: false,
    });
  });

  it('parses grid-rows-<number>', () => {
    expect(parseGridTemplateRowsUtility('grid-rows-1')).toEqual({
      type: 'grid-template-rows',
      value: 1,
      raw: 'grid-rows-1',
      arbitrary: false,
    });
    expect(parseGridTemplateRowsUtility('grid-rows-6')).toEqual({
      type: 'grid-template-rows',
      value: 6,
      raw: 'grid-rows-6',
      arbitrary: false,
    });
  });

  it('parses grid-rows-[arbitrary]', () => {
    expect(parseGridTemplateRowsUtility('grid-rows-[7]')).toEqual({
      type: 'grid-template-rows',
      value: '7',
      raw: 'grid-rows-[7]',
      arbitrary: true,
    });
    expect(parseGridTemplateRowsUtility('grid-rows-[repeat(auto-fit,minmax(0,1fr))]')).toEqual({
      type: 'grid-template-rows',
      value: 'repeat(auto-fit,minmax(0,1fr))',
      raw: 'grid-rows-[repeat(auto-fit,minmax(0,1fr))]',
      arbitrary: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parseGridTemplateRowsUtility('grid-rows')).toBeNull();
    expect(parseGridTemplateRowsUtility('grid-rows-')).toBeNull();
    expect(parseGridTemplateRowsUtility('grid-rows-arbitrary')).toBeNull();
    expect(parseGridTemplateRowsUtility('grid-cols-3')).toBeNull();
  });
}); 