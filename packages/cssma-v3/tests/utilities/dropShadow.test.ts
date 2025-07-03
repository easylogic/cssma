import { describe, it, expect } from 'vitest';
import { parseBox } from '../../src/parser/utilities/box';

describe('parseDropShadow', () => {
  it('parses drop-shadow presets', () => {
    const presets = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
    for (const preset of presets) {
      const token = `drop-shadow-${preset}`;
      expect(parseBox(token)).toEqual({ type: 'drop-shadow', preset, raw: token, arbitrary: false });
    }
  });
  it('parses arbitrary value', () => {
    expect(parseBox('drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]')).toEqual({ type: 'drop-shadow', value: '0_35px_35px_rgba(0,0,0,0.25)', raw: 'drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseBox('drop-shadow-(--my-drop-shadow)')).toEqual({ type: 'drop-shadow', value: 'var(--my-drop-shadow)', raw: 'drop-shadow-(--my-drop-shadow)', arbitrary: true });
  });
  it('parses color variable', () => {
    expect(parseBox('drop-shadow-(color:--my-color)')).toEqual({ type: 'drop-shadow-color', value: 'var(--my-color)', raw: 'drop-shadow-(color:--my-color)', arbitrary: true });
  });
  it('parses color presets', () => {
    expect(parseBox('drop-shadow-black')).toEqual({ type: 'drop-shadow-color', preset: 'black', raw: 'drop-shadow-black', arbitrary: false });
    expect(parseBox('drop-shadow-white')).toEqual({ type: 'drop-shadow-color', preset: 'white', raw: 'drop-shadow-white', arbitrary: false });
    expect(parseBox('drop-shadow-red-500')).toEqual({ type: 'drop-shadow-color', preset: 'red-500', raw: 'drop-shadow-red-500', arbitrary: false });
    expect(parseBox('drop-shadow-indigo-500/50')).toEqual({ type: 'drop-shadow-color', preset: 'indigo-500/50', raw: 'drop-shadow-indigo-500/50', arbitrary: false });
    expect(parseBox('drop-shadow-inherit')).toEqual({ type: 'drop-shadow-color', preset: 'inherit', raw: 'drop-shadow-inherit', arbitrary: false });
    expect(parseBox('drop-shadow-current')).toEqual({ type: 'drop-shadow-color', preset: 'current', raw: 'drop-shadow-current', arbitrary: false });
    expect(parseBox('drop-shadow-transparent')).toEqual({ type: 'drop-shadow-color', preset: 'transparent', raw: 'drop-shadow-transparent', arbitrary: false });
  });
  it('returns null for invalid drop-shadow', () => {
    expect(parseBox('drop-shadow-foo')).toBeNull();
    expect(parseBox('drop-shadow-')).toBeNull();
    expect(parseBox('drop-shadow')).toBeNull();
  });
}); 