import { describe, it, expect } from 'vitest';
import { parseFontStretch } from '../../src/parser/utilities/fontStretch';

describe('parseFontStretch', () => {
  it('parses named presets', () => {
    expect(parseFontStretch('font-stretch-ultra-condensed')).toEqual({ type: 'font-stretch', value: 'ultra-condensed', raw: 'font-stretch-ultra-condensed', arbitrary: false });
    expect(parseFontStretch('font-stretch-extra-condensed')).toEqual({ type: 'font-stretch', value: 'extra-condensed', raw: 'font-stretch-extra-condensed', arbitrary: false });
    expect(parseFontStretch('font-stretch-condensed')).toEqual({ type: 'font-stretch', value: 'condensed', raw: 'font-stretch-condensed', arbitrary: false });
    expect(parseFontStretch('font-stretch-semi-condensed')).toEqual({ type: 'font-stretch', value: 'semi-condensed', raw: 'font-stretch-semi-condensed', arbitrary: false });
    expect(parseFontStretch('font-stretch-normal')).toEqual({ type: 'font-stretch', value: 'normal', raw: 'font-stretch-normal', arbitrary: false });
    expect(parseFontStretch('font-stretch-semi-expanded')).toEqual({ type: 'font-stretch', value: 'semi-expanded', raw: 'font-stretch-semi-expanded', arbitrary: false });
    expect(parseFontStretch('font-stretch-expanded')).toEqual({ type: 'font-stretch', value: 'expanded', raw: 'font-stretch-expanded', arbitrary: false });
    expect(parseFontStretch('font-stretch-extra-expanded')).toEqual({ type: 'font-stretch', value: 'extra-expanded', raw: 'font-stretch-extra-expanded', arbitrary: false });
    expect(parseFontStretch('font-stretch-ultra-expanded')).toEqual({ type: 'font-stretch', value: 'ultra-expanded', raw: 'font-stretch-ultra-expanded', arbitrary: false });
  });

  it('parses percentage values', () => {
    expect(parseFontStretch('font-stretch-50%')).toEqual({ type: 'font-stretch', value: '50%', raw: 'font-stretch-50%', arbitrary: true });
    expect(parseFontStretch('font-stretch-125%')).toEqual({ type: 'font-stretch', value: '125%', raw: 'font-stretch-125%', arbitrary: true });
    expect(parseFontStretch('font-stretch-100')).toEqual({ type: 'font-stretch', value: '100', raw: 'font-stretch-100', arbitrary: true });
  });

  it('parses custom property font-stretch-(--my-font-width)', () => {
    expect(parseFontStretch('font-stretch-(--my-font-width)')).toEqual({ type: 'font-stretch', value: 'var(--my-font-width)', raw: 'font-stretch-(--my-font-width)', arbitrary: true });
    expect(parseFontStretch('font-stretch-(--width)')).toEqual({ type: 'font-stretch', value: 'var(--width)', raw: 'font-stretch-(--width)', arbitrary: true });
  });

  it('parses arbitrary value font-stretch-[<value>]', () => {
    expect(parseFontStretch('font-stretch-[66.66%]')).toEqual({ type: 'font-stretch', value: '66.66%', raw: 'font-stretch-[66.66%]', arbitrary: true });
    expect(parseFontStretch('font-stretch-[var(--foo)]')).toEqual({ type: 'font-stretch', value: 'var(--foo)', raw: 'font-stretch-[var(--foo)]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseFontStretch('font-stretch')).toBeNull();
    expect(parseFontStretch('font-stretch-')).toBeNull();
    expect(parseFontStretch('font-stretch-condense')).toBeNull();
    expect(parseFontStretch('font-stretch-very-expanded')).toBeNull();
  });
}); 