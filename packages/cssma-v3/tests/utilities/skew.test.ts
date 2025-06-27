import { describe, it, expect } from 'vitest';
import { parseSkew } from '../../src/parser/utilities/skew';

describe('parseSkew', () => {
  it('parses skew and -skew', () => {
    expect(parseSkew('skew-10')).toEqual({ type: 'skew', value: 'skewX(10deg) skewY(10deg)', raw: 'skew-10', negative: false, arbitrary: false });
    expect(parseSkew('-skew-8')).toEqual({ type: 'skew', value: 'skewX(-8deg) skewY(-8deg)', raw: '-skew-8', negative: true, arbitrary: false });
  });
  it('parses skew custom property', () => {
    expect(parseSkew('skew-(--my-skew)')).toEqual({ type: 'skew', value: 'skewX(var(--my-skew)) skewY(var(--my-skew))', raw: 'skew-(--my-skew)', customProperty: true, arbitrary: false });
  });
  it('parses skew arbitrary value', () => {
    expect(parseSkew('skew-[3.142rad]')).toEqual({ type: 'skew', value: 'skewX(3.142rad) skewY(3.142rad)', raw: 'skew-[3.142rad]', arbitrary: true });
  });
  it('parses skew-x and -skew-x', () => {
    expect(parseSkew('skew-x-12')).toEqual({ type: 'skew-x', value: 'skewX(12deg)', raw: 'skew-x-12', negative: false, arbitrary: false });
    expect(parseSkew('-skew-x-6')).toEqual({ type: 'skew-x', value: 'skewX(-6deg)', raw: '-skew-x-6', negative: true, arbitrary: false });
  });
  it('parses skew-x custom property', () => {
    expect(parseSkew('skew-x-(--my-skew-x)')).toEqual({ type: 'skew-x', value: 'skewX(var(--my-skew-x))', raw: 'skew-x-(--my-skew-x)', customProperty: true, arbitrary: false });
  });
  it('parses skew-x arbitrary value', () => {
    expect(parseSkew('skew-x-[1.5turn]')).toEqual({ type: 'skew-x', value: 'skewX(1.5turn)', raw: 'skew-x-[1.5turn]', arbitrary: true });
  });
  it('parses skew-y and -skew-y', () => {
    expect(parseSkew('skew-y-7')).toEqual({ type: 'skew-y', value: 'skewY(7deg)', raw: 'skew-y-7', negative: false, arbitrary: false });
    expect(parseSkew('-skew-y-3')).toEqual({ type: 'skew-y', value: 'skewY(-3deg)', raw: '-skew-y-3', negative: true, arbitrary: false });
  });
  it('parses skew-y custom property', () => {
    expect(parseSkew('skew-y-(--my-skew-y)')).toEqual({ type: 'skew-y', value: 'skewY(var(--my-skew-y))', raw: 'skew-y-(--my-skew-y)', customProperty: true, arbitrary: false });
  });
  it('parses skew-y arbitrary value', () => {
    expect(parseSkew('skew-y-[2rad]')).toEqual({ type: 'skew-y', value: 'skewY(2rad)', raw: 'skew-y-[2rad]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseSkew('skew-')).toBeNull();
    expect(parseSkew('skew-x-')).toBeNull();
    expect(parseSkew('skew-y-')).toBeNull();
    expect(parseSkew('skew-foo')).toBeNull();
    expect(parseSkew('skew-x-foo')).toBeNull();
    expect(parseSkew('skew-y-foo')).toBeNull();
    expect(parseSkew('skew-[]')).toBeNull();
    expect(parseSkew('skew-x-[]')).toBeNull();
    expect(parseSkew('skew-y-[]')).toBeNull();
    expect(parseSkew('skew-()')).toBeNull();
    expect(parseSkew('skew-x-()')).toBeNull();
    expect(parseSkew('skew-y-()')).toBeNull();
  });
}); 