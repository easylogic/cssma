import { describe, it, expect } from 'vitest';
import { parseCaretColor } from '../../src/parser/utilities/caretColor';

describe('parseCaretColor', () => {
  it('parses caret-inherit', () => {
    expect(parseCaretColor('caret-inherit')).toEqual({ type: 'caret-color', value: 'inherit', raw: 'caret-inherit', preset: 'inherit' });
  });
  it('parses caret-current', () => {
    expect(parseCaretColor('caret-current')).toEqual({ type: 'caret-color', value: 'currentColor', raw: 'caret-current', preset: 'current' });
  });
  it('parses caret-transparent', () => {
    expect(parseCaretColor('caret-transparent')).toEqual({ type: 'caret-color', value: 'transparent', raw: 'caret-transparent', preset: 'transparent' });
  });
  it('parses caret-black and caret-white', () => {
    expect(parseCaretColor('caret-black')).toEqual({ type: 'caret-color', value: 'var(--color-black)', raw: 'caret-black', preset: 'black' });
    expect(parseCaretColor('caret-white')).toEqual({ type: 'caret-color', value: 'var(--color-white)', raw: 'caret-white', preset: 'white' });
  });
  it('parses caret-{color}-{shade}', () => {
    expect(parseCaretColor('caret-red-500')).toEqual({ type: 'caret-color', value: 'var(--color-red-500)', raw: 'caret-red-500', color: 'red', shade: '500' });
    expect(parseCaretColor('caret-blue-200')).toEqual({ type: 'caret-color', value: 'var(--color-blue-200)', raw: 'caret-blue-200', color: 'blue', shade: '200' });
  });
  it('parses caret-(<custom-property>)', () => {
    expect(parseCaretColor('caret-(--my-caret-color)')).toEqual({ type: 'caret-color', value: 'var(--my-caret-color)', raw: 'caret-(--my-caret-color)', customProperty: true });
  });
  it('parses caret-[<value>]', () => {
    expect(parseCaretColor('caret-[#50d71e]')).toEqual({ type: 'caret-color', value: '#50d71e', raw: 'caret-[#50d71e]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseCaretColor('caret-')).toBeNull();
    expect(parseCaretColor('caret-foo')).toBeNull();
    expect(parseCaretColor('caret-red')).toBeNull();
    expect(parseCaretColor('caret-red-')).toBeNull();
    expect(parseCaretColor('caret-()')).toBeNull();
    expect(parseCaretColor('caret-[]')).toBeNull();
    expect(parseCaretColor('caret-(foo)')).toBeNull();
    expect(parseCaretColor('caret-[foo]')).toBeNull();
  });
}); 