import { describe, it, expect } from 'vitest';
import { parseStroke } from '../../src/parser/utilities/stroke';

describe('parseStroke', () => {
  it('parses stroke-none', () => {
    expect(parseStroke('stroke-none')).toEqual({ type: 'stroke', preset: 'none', raw: 'stroke-none', arbitrary: false });
  });
  it('parses stroke-inherit', () => {
    expect(parseStroke('stroke-inherit')).toEqual({ type: 'stroke', preset: 'inherit', raw: 'stroke-inherit', arbitrary: false });
  });
  it('parses stroke-current', () => {
    expect(parseStroke('stroke-current')).toEqual({ type: 'stroke', preset: 'current', raw: 'stroke-current', arbitrary: false });
  });
  it('parses stroke-transparent', () => {
    expect(parseStroke('stroke-transparent')).toEqual({ type: 'stroke', preset: 'transparent', raw: 'stroke-transparent', arbitrary: false });
  });
  it('parses stroke-black', () => {
    expect(parseStroke('stroke-black')).toEqual({ type: 'stroke', preset: 'black', raw: 'stroke-black', arbitrary: false });
  });
  it('parses stroke-white', () => {
    expect(parseStroke('stroke-white')).toEqual({ type: 'stroke', preset: 'white', raw: 'stroke-white', arbitrary: false });
  });
  it('parses stroke-red-500', () => {
    expect(parseStroke('stroke-red-500')).toEqual({ type: 'stroke', preset: 'red-500', raw: 'stroke-red-500', arbitrary: false });
  });
  it('parses stroke-gray-900', () => {
    expect(parseStroke('stroke-gray-900')).toEqual({ type: 'stroke', preset: 'gray-900', raw: 'stroke-gray-900', arbitrary: false });
  });
  it('parses stroke-(--my-stroke)', () => {
    expect(parseStroke('stroke-(--my-stroke)')).toEqual({ type: 'stroke', value: 'var(--my-stroke)', raw: 'stroke-(--my-stroke)', customProperty: true });
  });
  it('parses stroke-[#243c5a]', () => {
    expect(parseStroke('stroke-[#243c5a]')).toEqual({ type: 'stroke', value: '#243c5a', raw: 'stroke-[#243c5a]', arbitrary: true });
  });
  it('parses stroke-[rgb(10,20,30)]', () => {
    expect(parseStroke('stroke-[rgb(10,20,30)]')).toEqual({ type: 'stroke', value: 'rgb(10,20,30)', raw: 'stroke-[rgb(10,20,30)]', arbitrary: true });
  });
  it('parses stroke-[var(--foo)]', () => {
    expect(parseStroke('stroke-[var(--foo)]')).toEqual({ type: 'stroke', value: 'var(--foo)', raw: 'stroke-[var(--foo)]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseStroke('stroke-')).toBeNull();
    expect(parseStroke('stroke-foo')).toBeNull();
    expect(parseStroke('stroke-[]')).toBeNull();
    expect(parseStroke('stroke-()')).toBeNull();
    expect(parseStroke('stroke-(foo)')).toBeNull();
  });
}); 