import { describe, it, expect } from 'vitest';
import { parseOrderUtility } from '../../src/parser/utilities/order';

describe('parseOrderUtility', () => {
  it('parses order-first', () => {
    expect(parseOrderUtility('order-first')).toEqual({
      type: 'order',
      preset: 'first',
      raw: 'order-first',
      arbitrary: false,
    });
  });
  it('parses order-last', () => {
    expect(parseOrderUtility('order-last')).toEqual({
      type: 'order',
      preset: 'last',
      raw: 'order-last',
      arbitrary: false,
    });
  });
  it('parses order-none', () => {
    expect(parseOrderUtility('order-none')).toEqual({
      type: 'order',
      preset: 'none',
      raw: 'order-none',
      arbitrary: false,
    });
  });
  it('parses order-<number>', () => {
    expect(parseOrderUtility('order-1')).toEqual({
      type: 'order',
      value: 1,
      raw: 'order-1',
      arbitrary: false,
    });
    expect(parseOrderUtility('order-12')).toEqual({
      type: 'order',
      value: 12,
      raw: 'order-12',
      arbitrary: false,
    });
  });
  it('parses order-[arbitrary]', () => {
    expect(parseOrderUtility('order-[999]')).toEqual({
      type: 'order',
      value: '999',
      raw: 'order-[999]',
      arbitrary: true,
    });
    expect(parseOrderUtility('order-[-1]')).toEqual({
      type: 'order',
      value: '-1',
      raw: 'order-[-1]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseOrderUtility('order')).toBeNull();
    expect(parseOrderUtility('order-')).toBeNull();
    expect(parseOrderUtility('order-arbitrary')).toBeNull();
    expect(parseOrderUtility('order-first-last')).toBeNull();
  });
}); 