import { describe, it, expect } from 'vitest';
import { parseTranslate } from '../../src/parser/utilities/translate';

describe('parseTranslate', () => {
  it('parses translate-none', () => {
    expect(parseTranslate('translate-none')).toEqual({ type: 'translate', value: 'none', raw: 'translate-none', preset: 'none' });
  });
  it('parses translate and -translate', () => {
    expect(parseTranslate('translate-2')).toEqual({ type: 'translate', value: 'calc(var(--spacing) * 2) calc(var(--spacing) * 2)', raw: 'translate-2', negative: false });
    expect(parseTranslate('-translate-4')).toEqual({ type: 'translate', value: 'calc(var(--spacing) * -4) calc(var(--spacing) * -4)', raw: '-translate-4', negative: true });
  });
  it('parses translate full and px', () => {
    expect(parseTranslate('translate-full')).toEqual({ type: 'translate', value: '100% 100%', raw: 'translate-full', negative: false, preset: 'full' });
    expect(parseTranslate('-translate-full')).toEqual({ type: 'translate', value: '-100% -100%', raw: '-translate-full', negative: true, preset: 'full' });
    expect(parseTranslate('translate-px')).toEqual({ type: 'translate', value: '1px 1px', raw: 'translate-px', negative: false, preset: 'px' });
    expect(parseTranslate('-translate-px')).toEqual({ type: 'translate', value: '-1px -1px', raw: '-translate-px', negative: true, preset: 'px' });
  });
  it('parses translate fractions', () => {
    expect(parseTranslate('translate-1/2')).toEqual({ type: 'translate', value: 'calc(1/2 * 100%) calc(1/2 * 100%)', raw: 'translate-1/2', negative: false });
    expect(parseTranslate('-translate-1/4')).toEqual({ type: 'translate', value: 'calc(1/4 * -100%) calc(1/4 * -100%)', raw: '-translate-1/4', negative: true });
  });
  it('parses translate custom property', () => {
    expect(parseTranslate('translate-(--my-translate)')).toEqual({ type: 'translate', value: 'var(--my-translate) var(--my-translate)', raw: 'translate-(--my-translate)', customProperty: true });
  });
  it('parses translate arbitrary value', () => {
    expect(parseTranslate('translate-[3.142rad]')).toEqual({ type: 'translate', value: '3.142rad 3.142rad', raw: 'translate-[3.142rad]', arbitrary: true });
  });
  it('parses translate-x and -translate-x', () => {
    expect(parseTranslate('translate-x-4')).toEqual({ type: 'translate-x', value: 'calc(var(--spacing) * 4) var(--tw-translate-y)', raw: 'translate-x-4', negative: false });
    expect(parseTranslate('-translate-x-2')).toEqual({ type: 'translate-x', value: 'calc(var(--spacing) * -2) var(--tw-translate-y)', raw: '-translate-x-2', negative: true });
  });
  it('parses translate-x full and px', () => {
    expect(parseTranslate('translate-x-full')).toEqual({ type: 'translate-x', value: '100% var(--tw-translate-y)', raw: 'translate-x-full', negative: false, preset: 'full' });
    expect(parseTranslate('-translate-x-full')).toEqual({ type: 'translate-x', value: '-100% var(--tw-translate-y)', raw: '-translate-x-full', negative: true, preset: 'full' });
    expect(parseTranslate('translate-x-px')).toEqual({ type: 'translate-x', value: '1px var(--tw-translate-y)', raw: 'translate-x-px', negative: false, preset: 'px' });
    expect(parseTranslate('-translate-x-px')).toEqual({ type: 'translate-x', value: '-1px var(--tw-translate-y)', raw: '-translate-x-px', negative: true, preset: 'px' });
  });
  it('parses translate-x fractions', () => {
    expect(parseTranslate('translate-x-1/2')).toEqual({ type: 'translate-x', value: 'calc(1/2 * 100%) var(--tw-translate-y)', raw: 'translate-x-1/2', negative: false });
    expect(parseTranslate('-translate-x-1/4')).toEqual({ type: 'translate-x', value: 'calc(1/4 * -100%) var(--tw-translate-y)', raw: '-translate-x-1/4', negative: true });
  });
  it('parses translate-x custom property', () => {
    expect(parseTranslate('translate-x-(--my-translate-x)')).toEqual({ type: 'translate-x', value: 'var(--my-translate-x) var(--tw-translate-y)', raw: 'translate-x-(--my-translate-x)', customProperty: true });
  });
  it('parses translate-x arbitrary value', () => {
    expect(parseTranslate('translate-x-[1.5turn]')).toEqual({ type: 'translate-x', value: '1.5turn var(--tw-translate-y)', raw: 'translate-x-[1.5turn]', arbitrary: true });
  });
  it('parses translate-y and -translate-y', () => {
    expect(parseTranslate('translate-y-6')).toEqual({ type: 'translate-y', value: 'var(--tw-translate-x) calc(var(--spacing) * 6)', raw: 'translate-y-6', negative: false });
    expect(parseTranslate('-translate-y-3')).toEqual({ type: 'translate-y', value: 'var(--tw-translate-x) calc(var(--spacing) * -3)', raw: '-translate-y-3', negative: true });
  });
  it('parses translate-y full and px', () => {
    expect(parseTranslate('translate-y-full')).toEqual({ type: 'translate-y', value: 'var(--tw-translate-x) 100%', raw: 'translate-y-full', negative: false, preset: 'full' });
    expect(parseTranslate('-translate-y-full')).toEqual({ type: 'translate-y', value: 'var(--tw-translate-x) -100%', raw: '-translate-y-full', negative: true, preset: 'full' });
    expect(parseTranslate('translate-y-px')).toEqual({ type: 'translate-y', value: 'var(--tw-translate-x) 1px', raw: 'translate-y-px', negative: false, preset: 'px' });
    expect(parseTranslate('-translate-y-px')).toEqual({ type: 'translate-y', value: 'var(--tw-translate-x) -1px', raw: '-translate-y-px', negative: true, preset: 'px' });
  });
  it('parses translate-y fractions', () => {
    expect(parseTranslate('translate-y-1/2')).toEqual({ type: 'translate-y', value: 'var(--tw-translate-x) calc(1/2 * 100%)', raw: 'translate-y-1/2', negative: false });
    expect(parseTranslate('-translate-y-1/4')).toEqual({ type: 'translate-y', value: 'var(--tw-translate-x) calc(1/4 * -100%)', raw: '-translate-y-1/4', negative: true });
  });
  it('parses translate-y custom property', () => {
    expect(parseTranslate('translate-y-(--my-translate-y)')).toEqual({ type: 'translate-y', value: 'var(--tw-translate-x) var(--my-translate-y)', raw: 'translate-y-(--my-translate-y)', customProperty: true });
  });
  it('parses translate-y arbitrary value', () => {
    expect(parseTranslate('translate-y-[2rad]')).toEqual({ type: 'translate-y', value: 'var(--tw-translate-x) 2rad', raw: 'translate-y-[2rad]', arbitrary: true });
  });
  it('parses translate-z and -translate-z', () => {
    expect(parseTranslate('translate-z-8')).toEqual({ type: 'translate-z', value: 'var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * 8)', raw: 'translate-z-8', negative: false });
    expect(parseTranslate('-translate-z-4')).toEqual({ type: 'translate-z', value: 'var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * -4)', raw: '-translate-z-4', negative: true });
  });
  it('parses translate-z px', () => {
    expect(parseTranslate('translate-z-px')).toEqual({ type: 'translate-z', value: 'var(--tw-translate-x) var(--tw-translate-y) 1px', raw: 'translate-z-px', negative: false, preset: 'px' });
    expect(parseTranslate('-translate-z-px')).toEqual({ type: 'translate-z', value: 'var(--tw-translate-x) var(--tw-translate-y) -1px', raw: '-translate-z-px', negative: true, preset: 'px' });
  });
  it('parses translate-z custom property', () => {
    expect(parseTranslate('translate-z-(--my-translate-z)')).toEqual({ type: 'translate-z', value: 'var(--tw-translate-x) var(--tw-translate-y) var(--my-translate-z)', raw: 'translate-z-(--my-translate-z)', customProperty: true });
  });
  it('parses translate-z arbitrary value', () => {
    expect(parseTranslate('translate-z-[.5turn]')).toEqual({ type: 'translate-z', value: 'var(--tw-translate-x) var(--tw-translate-y) .5turn', raw: 'translate-z-[.5turn]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseTranslate('translate-')).toBeNull();
    expect(parseTranslate('translate-x-')).toBeNull();
    expect(parseTranslate('translate-y-')).toBeNull();
    expect(parseTranslate('translate-z-')).toBeNull();
    expect(parseTranslate('translate-foo')).toBeNull();
    expect(parseTranslate('translate-x-foo')).toBeNull();
    expect(parseTranslate('translate-y-foo')).toBeNull();
    expect(parseTranslate('translate-z-foo')).toBeNull();
    expect(parseTranslate('translate-[]')).toBeNull();
    expect(parseTranslate('translate-x-[]')).toBeNull();
    expect(parseTranslate('translate-y-[]')).toBeNull();
    expect(parseTranslate('translate-z-[]')).toBeNull();
    expect(parseTranslate('translate-()')).toBeNull();
    expect(parseTranslate('translate-x-()')).toBeNull();
    expect(parseTranslate('translate-y-()')).toBeNull();
    expect(parseTranslate('translate-z-()')).toBeNull();
  });
}); 