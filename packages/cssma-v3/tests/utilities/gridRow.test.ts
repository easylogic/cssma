import { describe, it, expect } from 'vitest';
import { parseGridRow } from '../../src/parser/utilities/gridRow';

describe('parseGridRowUtility', () => {
  it('parses grid-row-auto', () => {
    expect(parseGridRow('grid-row-auto')).toEqual({
      type: 'grid-row',
      preset: 'auto',
      raw: 'grid-row-auto',
      arbitrary: false,
    });
  });

  it('parses grid-row-span-<number>', () => {
    expect(parseGridRow('grid-row-span-2')).toEqual({
      type: 'grid-row-span',
      value: 2,
      raw: 'grid-row-span-2',
      arbitrary: false,
    });
  });

  it('parses grid-row-start-<number>', () => {
    expect(parseGridRow('grid-row-start-3')).toEqual({
      type: 'grid-row-start',
      value: 3,
      raw: 'grid-row-start-3',
      arbitrary: false,
    });
  });

  it('parses grid-row-end-<number>', () => {
    expect(parseGridRow('grid-row-end-4')).toEqual({
      type: 'grid-row-end',
      value: 4,
      raw: 'grid-row-end-4',
      arbitrary: false,
    });
  });

  it('parses grid-row-[arbitrary]', () => {
    expect(parseGridRow('grid-row-[foo]')).toEqual({
      type: 'grid-row',
      value: 'foo',
      raw: 'grid-row-[foo]',
      arbitrary: true,
    });
  });

  it('parses grid-row-span-[arbitrary]', () => {
    expect(parseGridRow('grid-row-span-[bar]')).toEqual({
      type: 'grid-row-span',
      value: 'bar',
      raw: 'grid-row-span-[bar]',
      arbitrary: true,
    });
  });

  it('parses grid-row-start-[arbitrary]', () => {
    expect(parseGridRow('grid-row-start-[baz]')).toEqual({
      type: 'grid-row-start',
      value: 'baz',
      raw: 'grid-row-start-[baz]',
      arbitrary: true,
    });
  });

  it('parses grid-row-end-[arbitrary]', () => {
    expect(parseGridRow('grid-row-end-[qux]')).toEqual({
      type: 'grid-row-end',
      value: 'qux',
      raw: 'grid-row-end-[qux]',
      arbitrary: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parseGridRow('grid-row')).toBeNull();
    expect(parseGridRow('grid-row-span-')).toBeNull();
    expect(parseGridRow('grid-row-start-')).toBeNull();
    expect(parseGridRow('grid-row-end-')).toBeNull();
    expect(parseGridRow('grid-row-arbitrary')).toBeNull();
    expect(parseGridRow('grid-col-span-2')).toBeNull();
  });
}); 