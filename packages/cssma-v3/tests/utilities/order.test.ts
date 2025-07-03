import { describe, it, expect } from 'vitest';
import { parseMisc } from '../../src/parser/utilities/misc';

describe('parseOrderUtility', () => {
  it('parses order-first', () => {
    expect(parseMisc('order-first')).toEqual({
      type: 'order',
      preset: 'first',
      raw: 'order-first',
      arbitrary: false,
    });
  });
  it('parses order-last', () => {
    expect(parseMisc('order-last')).toEqual({
      type: 'order',
      preset: 'last',
      raw: 'order-last',
      arbitrary: false,
    });
  });
  it('parses order-none', () => {
    expect(parseMisc('order-none')).toEqual({
      type: 'order',
      preset: 'none',
      raw: 'order-none',
      arbitrary: false,
    });
  });
  it('parses order-<number>', () => {
    expect(parseMisc('order-1')).toEqual({
      type: 'order',
      value: 1,
      raw: 'order-1',
      arbitrary: false,
    });
    expect(parseMisc('order-12')).toEqual({
      type: 'order',
      value: 12,
      raw: 'order-12',
      arbitrary: false,
    });
  });
  it('parses order-[arbitrary]', () => {
    expect(parseMisc('order-[999]')).toEqual({
      type: 'order',
      value: '999',
      raw: 'order-[999]',
      arbitrary: true,
    });
    expect(parseMisc('order-[-1]')).toEqual({
      type: 'order',
      value: '-1',
      raw: 'order-[-1]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseMisc('order')).toBeNull();
    expect(parseMisc('order-')).toBeNull();
    expect(parseMisc('order-arbitrary')).toBeNull();
    expect(parseMisc('order-first-last')).toBeNull();
  });
}); 