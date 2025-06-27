import { describe, it, expect } from 'vitest';
import { parseFill } from '../../src/parser/utilities/fill';

describe('parseFill', () => {
  it('parses fill-none', () => {
    expect(parseFill('fill-none')).toEqual({ type: 'fill', preset: 'none', raw: 'fill-none', arbitrary: false });
  });
  it('parses fill-inherit', () => {
    expect(parseFill('fill-inherit')).toEqual({ type: 'fill', preset: 'inherit', raw: 'fill-inherit', arbitrary: false });
  });
  it('parses fill-current', () => {
    expect(parseFill('fill-current')).toEqual({ type: 'fill', preset: 'current', raw: 'fill-current', arbitrary: false });
  });
  it('parses fill-transparent', () => {
    expect(parseFill('fill-transparent')).toEqual({ type: 'fill', preset: 'transparent', raw: 'fill-transparent', arbitrary: false });
  });
  it('parses fill-black', () => {
    expect(parseFill('fill-black')).toEqual({ type: 'fill', preset: 'black', raw: 'fill-black', arbitrary: false });
  });
  it('parses fill-white', () => {
    expect(parseFill('fill-white')).toEqual({ type: 'fill', preset: 'white', raw: 'fill-white', arbitrary: false });
  });
  it('parses fill-red-500', () => {
    expect(parseFill('fill-red-500')).toEqual({ type: 'fill', preset: 'red-500', raw: 'fill-red-500', arbitrary: false });
  });
  it('parses fill-gray-900', () => {
    expect(parseFill('fill-gray-900')).toEqual({ type: 'fill', preset: 'gray-900', raw: 'fill-gray-900', arbitrary: false });
  });
  it('parses fill-(--my-fill)', () => {
    expect(parseFill('fill-(--my-fill)')).toEqual({ type: 'fill', value: 'var(--my-fill)', raw: 'fill-(--my-fill)', customProperty: true });
  });
  it('parses fill-[#243c5a]', () => {
    expect(parseFill('fill-[#243c5a]')).toEqual({ type: 'fill', value: '#243c5a', raw: 'fill-[#243c5a]', arbitrary: true });
  });
  it('parses fill-[rgb(10,20,30)]', () => {
    expect(parseFill('fill-[rgb(10,20,30)]')).toEqual({ type: 'fill', value: 'rgb(10,20,30)', raw: 'fill-[rgb(10,20,30)]', arbitrary: true });
  });
  it('parses fill-[var(--foo)]', () => {
    expect(parseFill('fill-[var(--foo)]')).toEqual({ type: 'fill', value: 'var(--foo)', raw: 'fill-[var(--foo)]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseFill('fill-')).toBeNull();
    expect(parseFill('fill-foo')).toBeNull();
    expect(parseFill('fill-[]')).toBeNull();
    expect(parseFill('fill-()')).toBeNull();
    expect(parseFill('fill-(foo)')).toBeNull();
  });
}); 