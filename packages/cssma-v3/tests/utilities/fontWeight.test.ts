import { describe, it, expect } from 'vitest';
import { parseFontWeight } from '../../src/parser/utilities/fontWeight';

describe('parseFontWeight', () => {
  it('parses preset font weights', () => {
    expect(parseFontWeight('font-thin')).toEqual({ type: 'font-weight', value: '100', raw: 'font-thin', arbitrary: false });
    expect(parseFontWeight('font-extralight')).toEqual({ type: 'font-weight', value: '200', raw: 'font-extralight', arbitrary: false });
    expect(parseFontWeight('font-light')).toEqual({ type: 'font-weight', value: '300', raw: 'font-light', arbitrary: false });
    expect(parseFontWeight('font-normal')).toEqual({ type: 'font-weight', value: '400', raw: 'font-normal', arbitrary: false });
    expect(parseFontWeight('font-medium')).toEqual({ type: 'font-weight', value: '500', raw: 'font-medium', arbitrary: false });
    expect(parseFontWeight('font-semibold')).toEqual({ type: 'font-weight', value: '600', raw: 'font-semibold', arbitrary: false });
    expect(parseFontWeight('font-bold')).toEqual({ type: 'font-weight', value: '700', raw: 'font-bold', arbitrary: false });
    expect(parseFontWeight('font-extrabold')).toEqual({ type: 'font-weight', value: '800', raw: 'font-extrabold', arbitrary: false });
    expect(parseFontWeight('font-black')).toEqual({ type: 'font-weight', value: '900', raw: 'font-black', arbitrary: false });
  });

  it('parses custom property font-(--my-font-weight)', () => {
    expect(parseFontWeight('font-(--my-font-weight)')).toEqual({ type: 'font-weight', value: 'var(--my-font-weight)', raw: 'font-(--my-font-weight)', arbitrary: true });
    expect(parseFontWeight('font-(--weight)')).toEqual({ type: 'font-weight', value: 'var(--weight)', raw: 'font-(--weight)', arbitrary: true });
  });

  it('parses arbitrary value font-[<value>]', () => {
    expect(parseFontWeight('font-[1000]')).toEqual({ type: 'font-weight', value: '1000', raw: 'font-[1000]', arbitrary: true });
    expect(parseFontWeight('font-[bolder]')).toEqual({ type: 'font-weight', value: 'bolder', raw: 'font-[bolder]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseFontWeight('font-')).toBeNull();
    expect(parseFontWeight('font')).toBeNull();
    expect(parseFontWeight('font-weight')).toBeNull();
    expect(parseFontWeight('font-boldest')).toBeNull();
  });
}); 