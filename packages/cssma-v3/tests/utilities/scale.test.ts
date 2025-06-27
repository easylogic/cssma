import { describe, it, expect } from 'vitest';
import { parseScale } from '../../src/parser/utilities/scale';

describe('parseScale', () => {
  it('parses scale-none', () => {
    expect(parseScale('scale-none')).toEqual({ type: 'scale', value: 'none', raw: 'scale-none', preset: 'none', arbitrary: false });
  });
  it('parses scale-3d', () => {
    expect(parseScale('scale-3d')).toEqual({ type: 'scale-3d', value: 'var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)', raw: 'scale-3d', preset: '3d', arbitrary: false });
  });
  it('parses scale and -scale', () => {
    expect(parseScale('scale-75')).toEqual({ type: 'scale', value: '75% 75%', raw: 'scale-75', negative: false, arbitrary: false });
    expect(parseScale('-scale-100')).toEqual({ type: 'scale', value: 'calc(100% * -1) calc(100% * -1)', raw: '-scale-100', negative: true, arbitrary: false });
  });
  it('parses scale custom property', () => {
    expect(parseScale('scale-(--my-scale)')).toEqual({ type: 'scale', value: 'var(--my-scale) var(--my-scale)', raw: 'scale-(--my-scale)', customProperty: true, arbitrary: false });
  });
  it('parses scale arbitrary value', () => {
    expect(parseScale('scale-[1.7]')).toEqual({ type: 'scale', value: '1.7', raw: 'scale-[1.7]', arbitrary: true });
  });
  it('parses scale-x and -scale-x', () => {
    expect(parseScale('scale-x-75')).toEqual({ type: 'scale-x', value: '75% var(--tw-scale-y)', raw: 'scale-x-75', negative: false, arbitrary: false });
    expect(parseScale('-scale-x-150')).toEqual({ type: 'scale-x', value: 'calc(150% * -1) var(--tw-scale-y)', raw: '-scale-x-150', negative: true, arbitrary: false });
  });
  it('parses scale-x custom property', () => {
    expect(parseScale('scale-x-(--my-scale-x)')).toEqual({ type: 'scale-x', value: 'var(--my-scale-x) var(--tw-scale-y)', raw: 'scale-x-(--my-scale-x)', customProperty: true, arbitrary: false });
  });
  it('parses scale-x arbitrary value', () => {
    expect(parseScale('scale-x-[2.5]')).toEqual({ type: 'scale-x', value: '2.5 var(--tw-scale-y)', raw: 'scale-x-[2.5]', arbitrary: true });
  });
  it('parses scale-y and -scale-y', () => {
    expect(parseScale('scale-y-125')).toEqual({ type: 'scale-y', value: 'var(--tw-scale-x) 125%', raw: 'scale-y-125', negative: false, arbitrary: false });
    expect(parseScale('-scale-y-50')).toEqual({ type: 'scale-y', value: 'var(--tw-scale-x) calc(50% * -1)', raw: '-scale-y-50', negative: true, arbitrary: false });
  });
  it('parses scale-y custom property', () => {
    expect(parseScale('scale-y-(--my-scale-y)')).toEqual({ type: 'scale-y', value: 'var(--tw-scale-x) var(--my-scale-y)', raw: 'scale-y-(--my-scale-y)', customProperty: true, arbitrary: false });
  });
  it('parses scale-y arbitrary value', () => {
    expect(parseScale('scale-y-[0.8]')).toEqual({ type: 'scale-y', value: 'var(--tw-scale-x) 0.8', raw: 'scale-y-[0.8]', arbitrary: true });
  });
  it('parses scale-z and -scale-z', () => {
    expect(parseScale('scale-z-110')).toEqual({ type: 'scale-z', value: 'var(--tw-scale-x) var(--tw-scale-y) 110%', raw: 'scale-z-110', negative: false, arbitrary: false });
    expect(parseScale('-scale-z-90')).toEqual({ type: 'scale-z', value: 'var(--tw-scale-x) var(--tw-scale-y) calc(90% * -1)', raw: '-scale-z-90', negative: true, arbitrary: false });
  });
  it('parses scale-z custom property', () => {
    expect(parseScale('scale-z-(--my-scale-z)')).toEqual({ type: 'scale-z', value: 'var(--tw-scale-x) var(--tw-scale-y) var(--my-scale-z)', raw: 'scale-z-(--my-scale-z)', customProperty: true, arbitrary: false });
  });
  it('parses scale-z arbitrary value', () => {
    expect(parseScale('scale-z-[1.2]')).toEqual({ type: 'scale-z', value: 'var(--tw-scale-x) var(--tw-scale-y) 1.2', raw: 'scale-z-[1.2]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseScale('scale-')).toBeNull();
    expect(parseScale('scale-x-')).toBeNull();
    expect(parseScale('scale-y-')).toBeNull();
    expect(parseScale('scale-z-')).toBeNull();
    expect(parseScale('scale-foo')).toBeNull();
    expect(parseScale('scale-x-foo')).toBeNull();
    expect(parseScale('scale-y-foo')).toBeNull();
    expect(parseScale('scale-z-foo')).toBeNull();
    expect(parseScale('scale-[]')).toBeNull();
    expect(parseScale('scale-x-[]')).toBeNull();
    expect(parseScale('scale-y-[]')).toBeNull();
    expect(parseScale('scale-z-[]')).toBeNull();
    expect(parseScale('scale-()')).toBeNull();
    expect(parseScale('scale-x-()')).toBeNull();
    expect(parseScale('scale-y-()')).toBeNull();
    expect(parseScale('scale-z-()')).toBeNull();
  });
}); 