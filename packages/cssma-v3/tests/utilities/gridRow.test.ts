import { describe, it, expect } from 'vitest';
import { parseGridRowUtility } from '../../src/parser/utilities/gridRow';

describe('parseGridRowUtility', () => {
  it('parses grid-row-auto', () => {
    expect(parseGridRowUtility('grid-row-auto')).toEqual({
      type: 'grid-row',
      preset: 'auto',
      raw: 'grid-row-auto',
      arbitrary: false,
    });
  });

  it('parses grid-row-span-<number>', () => {
    expect(parseGridRowUtility('grid-row-span-2')).toEqual({
      type: 'grid-row-span',
      value: 2,
      raw: 'grid-row-span-2',
      arbitrary: false,
    });
  });

  it('parses grid-row-start-<number>', () => {
    expect(parseGridRowUtility('grid-row-start-3')).toEqual({
      type: 'grid-row-start',
      value: 3,
      raw: 'grid-row-start-3',
      arbitrary: false,
    });
  });

  it('parses grid-row-end-<number>', () => {
    expect(parseGridRowUtility('grid-row-end-4')).toEqual({
      type: 'grid-row-end',
      value: 4,
      raw: 'grid-row-end-4',
      arbitrary: false,
    });
  });

  it('parses grid-row-[arbitrary]', () => {
    expect(parseGridRowUtility('grid-row-[foo]')).toEqual({
      type: 'grid-row',
      value: 'foo',
      raw: 'grid-row-[foo]',
      arbitrary: true,
    });
  });

  it('parses grid-row-span-[arbitrary]', () => {
    expect(parseGridRowUtility('grid-row-span-[bar]')).toEqual({
      type: 'grid-row-span',
      value: 'bar',
      raw: 'grid-row-span-[bar]',
      arbitrary: true,
    });
  });

  it('parses grid-row-start-[arbitrary]', () => {
    expect(parseGridRowUtility('grid-row-start-[baz]')).toEqual({
      type: 'grid-row-start',
      value: 'baz',
      raw: 'grid-row-start-[baz]',
      arbitrary: true,
    });
  });

  it('parses grid-row-end-[arbitrary]', () => {
    expect(parseGridRowUtility('grid-row-end-[qux]')).toEqual({
      type: 'grid-row-end',
      value: 'qux',
      raw: 'grid-row-end-[qux]',
      arbitrary: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parseGridRowUtility('grid-row')).toBeNull();
    expect(parseGridRowUtility('grid-row-span-')).toBeNull();
    expect(parseGridRowUtility('grid-row-start-')).toBeNull();
    expect(parseGridRowUtility('grid-row-end-')).toBeNull();
    expect(parseGridRowUtility('grid-row-arbitrary')).toBeNull();
    expect(parseGridRowUtility('grid-col-span-2')).toBeNull();
  });
}); 