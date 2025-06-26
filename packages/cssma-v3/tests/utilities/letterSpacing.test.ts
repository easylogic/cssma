import { describe, it, expect } from 'vitest';
import { parseLetterSpacing } from '../../src/parser/utilities/letterSpacing';

describe('parseLetterSpacing', () => {
  it('parses named presets', () => {
    expect(parseLetterSpacing('tracking-tighter')).toEqual({ type: 'letter-spacing', value: 'var(--tracking-tighter)', raw: 'tracking-tighter', arbitrary: false });
    expect(parseLetterSpacing('tracking-tight')).toEqual({ type: 'letter-spacing', value: 'var(--tracking-tight)', raw: 'tracking-tight', arbitrary: false });
    expect(parseLetterSpacing('tracking-normal')).toEqual({ type: 'letter-spacing', value: 'var(--tracking-normal)', raw: 'tracking-normal', arbitrary: false });
    expect(parseLetterSpacing('tracking-wide')).toEqual({ type: 'letter-spacing', value: 'var(--tracking-wide)', raw: 'tracking-wide', arbitrary: false });
    expect(parseLetterSpacing('tracking-wider')).toEqual({ type: 'letter-spacing', value: 'var(--tracking-wider)', raw: 'tracking-wider', arbitrary: false });
    expect(parseLetterSpacing('tracking-widest')).toEqual({ type: 'letter-spacing', value: 'var(--tracking-widest)', raw: 'tracking-widest', arbitrary: false });
  });

  it('parses custom property', () => {
    expect(parseLetterSpacing('tracking-(--my-tracking)')).toEqual({ type: 'letter-spacing', value: 'var(--my-tracking)', raw: 'tracking-(--my-tracking)', arbitrary: true });
    expect(parseLetterSpacing('tracking-(--foo)')).toEqual({ type: 'letter-spacing', value: 'var(--foo)', raw: 'tracking-(--foo)', arbitrary: true });
  });

  it('parses arbitrary value', () => {
    expect(parseLetterSpacing('tracking-[.25em]')).toEqual({ type: 'letter-spacing', value: '.25em', raw: 'tracking-[.25em]', arbitrary: true });
    expect(parseLetterSpacing('tracking-[-0.1em]')).toEqual({ type: 'letter-spacing', value: '-0.1em', raw: 'tracking-[-0.1em]', arbitrary: true });
    expect(parseLetterSpacing('tracking-[var(--foo)]')).toEqual({ type: 'letter-spacing', value: 'var(--foo)', raw: 'tracking-[var(--foo)]', arbitrary: true });
  });

  it('returns null for invalid input', () => {
    expect(parseLetterSpacing('tracking')).toBeNull();
    expect(parseLetterSpacing('tracking-')).toBeNull();
    expect(parseLetterSpacing('tracking-tightest')).toBeNull();
    expect(parseLetterSpacing('tracking-[ ]')).toBeNull();
    expect(parseLetterSpacing('tracking-(foo)')).toBeNull();
  });
}); 