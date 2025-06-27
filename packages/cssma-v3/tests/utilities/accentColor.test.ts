import { describe, it, expect } from 'vitest';
import { parseAccentColor } from '../../src/parser/utilities/accentColor';

describe('parseAccentColor', () => {
  it('parses accent-inherit', () => {
    expect(parseAccentColor('accent-inherit')).toEqual({ type: 'accent-color', value: 'inherit', raw: 'accent-inherit', preset: 'inherit' });
  });
  it('parses accent-current', () => {
    expect(parseAccentColor('accent-current')).toEqual({ type: 'accent-color', value: 'currentColor', raw: 'accent-current', preset: 'current' });
  });
  it('parses accent-transparent', () => {
    expect(parseAccentColor('accent-transparent')).toEqual({ type: 'accent-color', value: 'transparent', raw: 'accent-transparent', preset: 'transparent' });
  });
  it('parses accent-black and accent-white', () => {
    expect(parseAccentColor('accent-black')).toEqual({ type: 'accent-color', value: 'var(--color-black)', raw: 'accent-black', preset: 'black' });
    expect(parseAccentColor('accent-white')).toEqual({ type: 'accent-color', value: 'var(--color-white)', raw: 'accent-white', preset: 'white' });
  });
  it('parses accent-{color}-{shade}', () => {
    expect(parseAccentColor('accent-red-500')).toEqual({ type: 'accent-color', value: 'var(--color-red-500)', raw: 'accent-red-500', color: 'red', shade: '500' });
    expect(parseAccentColor('accent-blue-200')).toEqual({ type: 'accent-color', value: 'var(--color-blue-200)', raw: 'accent-blue-200', color: 'blue', shade: '200' });
  });
  it('parses accent-{color}-{shade}/opacity', () => {
    expect(parseAccentColor('accent-rose-500/75')).toEqual({ type: 'accent-color', value: 'var(--color-rose-500)', raw: 'accent-rose-500/75', color: 'rose', shade: '500', opacity: 75 });
  });
  it('parses accent-(<custom-property>)', () => {
    expect(parseAccentColor('accent-(--my-accent-color)')).toEqual({ type: 'accent-color', value: 'var(--my-accent-color)', raw: 'accent-(--my-accent-color)', customProperty: true });
  });
  it('parses accent-(<custom-property>)/opacity', () => {
    expect(parseAccentColor('accent-(--my-accent-color)/25')).toEqual({ type: 'accent-color', value: 'var(--my-accent-color)', raw: 'accent-(--my-accent-color)/25', customProperty: true, opacity: 25 });
  });
  it('parses accent-[<value>]', () => {
    expect(parseAccentColor('accent-[#50d71e]')).toEqual({ type: 'accent-color', value: '#50d71e', raw: 'accent-[#50d71e]', arbitrary: true });
  });
  it('parses accent-[<value>]/opacity', () => {
    expect(parseAccentColor('accent-[#50d71e]/80')).toEqual({ type: 'accent-color', value: '#50d71e', raw: 'accent-[#50d71e]/80', arbitrary: true, opacity: 80 });
  });
  it('returns null for invalid input', () => {
    expect(parseAccentColor('accent-')).toBeNull();
    expect(parseAccentColor('accent-foo')).toBeNull();
    expect(parseAccentColor('accent-red')).toBeNull();
    expect(parseAccentColor('accent-red-')).toBeNull();
    expect(parseAccentColor('accent-red-500/')).toBeNull();
    expect(parseAccentColor('accent-()')).toBeNull();
    expect(parseAccentColor('accent-[]')).toBeNull();
    expect(parseAccentColor('accent-(foo)')).toBeNull();
    expect(parseAccentColor('accent-[foo]')).toBeNull();
  });
}); 