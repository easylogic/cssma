import { describe, it, expect } from 'vitest';
import { parseDropShadow } from '../../src/parser/utilities/dropShadow';

describe('parseDropShadow', () => {
  it('parses drop-shadow presets', () => {
    const presets = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
    for (const preset of presets) {
      const token = `drop-shadow-${preset}`;
      expect(parseDropShadow(token)).toEqual({ type: 'drop-shadow', preset, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseDropShadow('drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]')).toEqual({ type: 'drop-shadow', value: '0_35px_35px_rgba(0,0,0,0.25)', raw: 'drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseDropShadow('drop-shadow-(--my-drop-shadow)')).toEqual({ type: 'drop-shadow', value: 'var(--my-drop-shadow)', raw: 'drop-shadow-(--my-drop-shadow)', arbitrary: true });
  });
  it('parses color variable', () => {
    expect(parseDropShadow('drop-shadow-(color:--my-color)')).toEqual({ type: 'drop-shadow-color', value: 'var(--my-color)', raw: 'drop-shadow-(color:--my-color)', arbitrary: true });
  });
  it('parses color presets', () => {
    expect(parseDropShadow('drop-shadow-black')).toEqual({ type: 'drop-shadow-color', preset: 'black', raw: 'drop-shadow-black', arbitrary: false });
    expect(parseDropShadow('drop-shadow-white')).toEqual({ type: 'drop-shadow-color', preset: 'white', raw: 'drop-shadow-white', arbitrary: false });
    expect(parseDropShadow('drop-shadow-red-500')).toEqual({ type: 'drop-shadow-color', preset: 'red-500', raw: 'drop-shadow-red-500', arbitrary: false });
    expect(parseDropShadow('drop-shadow-indigo-500/50')).toEqual({ type: 'drop-shadow-color', preset: 'indigo-500/50', raw: 'drop-shadow-indigo-500/50', arbitrary: false });
    expect(parseDropShadow('drop-shadow-inherit')).toEqual({ type: 'drop-shadow-color', preset: 'inherit', raw: 'drop-shadow-inherit', arbitrary: false });
    expect(parseDropShadow('drop-shadow-current')).toEqual({ type: 'drop-shadow-color', preset: 'current', raw: 'drop-shadow-current', arbitrary: false });
    expect(parseDropShadow('drop-shadow-transparent')).toEqual({ type: 'drop-shadow-color', preset: 'transparent', raw: 'drop-shadow-transparent', arbitrary: false });
  });
  it('returns null for invalid drop-shadow', () => {
    expect(parseDropShadow('drop-shadow-foo')).toBeNull();
    expect(parseDropShadow('drop-shadow-')).toBeNull();
    expect(parseDropShadow('drop-shadow')).toBeNull();
  });
}); 