import { describe, it, expect } from 'vitest';
import { parseOrder } from '../../src/parser/utilities/order';

describe('parseOrderUtility', () => {
  it('parses order-first', () => {
    expect(parseOrder('order-first')).toEqual({
      type: 'order',
      preset: 'first',
      raw: 'order-first',
      arbitrary: false,
    });
  });
  it('parses order-last', () => {
    expect(parseOrder('order-last')).toEqual({
      type: 'order',
      preset: 'last',
      raw: 'order-last',
      arbitrary: false,
    });
  });
  it('parses order-none', () => {
    expect(parseOrder('order-none')).toEqual({
      type: 'order',
      preset: 'none',
      raw: 'order-none',
      arbitrary: false,
    });
  });
  it('parses order-<number>', () => {
    expect(parseOrder('order-1')).toEqual({
      type: 'order',
      value: 1,
      raw: 'order-1',
      arbitrary: false,
    });
    expect(parseOrder('order-12')).toEqual({
      type: 'order',
      value: 12,
      raw: 'order-12',
      arbitrary: false,
    });
  });
  it('parses order-[arbitrary]', () => {
    expect(parseOrder('order-[999]')).toEqual({
      type: 'order',
      value: '999',
      raw: 'order-[999]',
      arbitrary: true,
    });
    expect(parseOrder('order-[-1]')).toEqual({
      type: 'order',
      value: '-1',
      raw: 'order-[-1]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseOrder('order')).toBeNull();
    expect(parseOrder('order-')).toBeNull();
    expect(parseOrder('order-arbitrary')).toBeNull();
    expect(parseOrder('order-first-last')).toBeNull();
  });
}); 