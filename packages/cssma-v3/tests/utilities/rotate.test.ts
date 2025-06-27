import { describe, it, expect } from 'vitest';
import { parseRotate } from '../../src/parser/utilities/rotate';

describe('parseRotate', () => {
  it('parses rotate-none', () => {
    expect(parseRotate('rotate-none')).toEqual({ type: 'rotate', value: 'none', raw: 'rotate-none', preset: 'none', arbitrary: false });
  });
  it('parses rotate and -rotate', () => {
    expect(parseRotate('rotate-45')).toEqual({ type: 'rotate', value: '45deg', raw: 'rotate-45', negative: false, arbitrary: false });
    expect(parseRotate('-rotate-90')).toEqual({ type: 'rotate', value: 'calc(90deg * -1)', raw: '-rotate-90', negative: true, arbitrary: false });
  });
  it('parses rotate custom property', () => {
    expect(parseRotate('rotate-(--my-rotation)')).toEqual({ type: 'rotate', value: 'var(--my-rotation)', raw: 'rotate-(--my-rotation)', customProperty: true, arbitrary: false });
  });
  it('parses rotate arbitrary value', () => {
    expect(parseRotate('rotate-[3.142rad]')).toEqual({ type: 'rotate', value: '3.142rad', raw: 'rotate-[3.142rad]', arbitrary: true });
  });
  it('parses rotate-x and -rotate-x', () => {
    expect(parseRotate('rotate-x-50')).toEqual({ type: 'rotate-x', value: '50deg', raw: 'rotate-x-50', negative: false, arbitrary: false });
    expect(parseRotate('-rotate-x-30')).toEqual({ type: 'rotate-x', value: '-30deg', raw: '-rotate-x-30', negative: true, arbitrary: false });
  });
  it('parses rotate-x custom property', () => {
    expect(parseRotate('rotate-x-(--my-rotation-x)')).toEqual({ type: 'rotate-x', value: 'var(--my-rotation-x)', raw: 'rotate-x-(--my-rotation-x)', customProperty: true, arbitrary: false });
  });
  it('parses rotate-x arbitrary value', () => {
    expect(parseRotate('rotate-x-[1.5turn]')).toEqual({ type: 'rotate-x', value: '1.5turn', raw: 'rotate-x-[1.5turn]', arbitrary: true });
  });
  it('parses rotate-y and -rotate-y', () => {
    expect(parseRotate('rotate-y-25')).toEqual({ type: 'rotate-y', value: '25deg', raw: 'rotate-y-25', negative: false, arbitrary: false });
    expect(parseRotate('-rotate-y-30')).toEqual({ type: 'rotate-y', value: '-30deg', raw: '-rotate-y-30', negative: true, arbitrary: false });
  });
  it('parses rotate-y custom property', () => {
    expect(parseRotate('rotate-y-(--my-rotation-y)')).toEqual({ type: 'rotate-y', value: 'var(--my-rotation-y)', raw: 'rotate-y-(--my-rotation-y)', customProperty: true, arbitrary: false });
  });
  it('parses rotate-y arbitrary value', () => {
    expect(parseRotate('rotate-y-[2rad]')).toEqual({ type: 'rotate-y', value: '2rad', raw: 'rotate-y-[2rad]', arbitrary: true });
  });
  it('parses rotate-z and -rotate-z', () => {
    expect(parseRotate('rotate-z-45')).toEqual({ type: 'rotate-z', value: '45deg', raw: 'rotate-z-45', negative: false, arbitrary: false });
    expect(parseRotate('-rotate-z-60')).toEqual({ type: 'rotate-z', value: '-60deg', raw: '-rotate-z-60', negative: true, arbitrary: false });
  });
  it('parses rotate-z custom property', () => {
    expect(parseRotate('rotate-z-(--my-rotation-z)')).toEqual({ type: 'rotate-z', value: 'var(--my-rotation-z)', raw: 'rotate-z-(--my-rotation-z)', customProperty: true, arbitrary: false });
  });
  it('parses rotate-z arbitrary value', () => {
    expect(parseRotate('rotate-z-[.5turn]')).toEqual({ type: 'rotate-z', value: '.5turn', raw: 'rotate-z-[.5turn]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseRotate('rotate-')).toBeNull();
    expect(parseRotate('rotate-x-')).toBeNull();
    expect(parseRotate('rotate-y-')).toBeNull();
    expect(parseRotate('rotate-z-')).toBeNull();
    expect(parseRotate('rotate-foo')).toBeNull();
    expect(parseRotate('rotate-x-foo')).toBeNull();
    expect(parseRotate('rotate-y-foo')).toBeNull();
    expect(parseRotate('rotate-z-foo')).toBeNull();
    expect(parseRotate('rotate-[]')).toBeNull();
    expect(parseRotate('rotate-x-[]')).toBeNull();
    expect(parseRotate('rotate-y-[]')).toBeNull();
    expect(parseRotate('rotate-z-[]')).toBeNull();
    expect(parseRotate('rotate-()')).toBeNull();
    expect(parseRotate('rotate-x-()')).toBeNull();
    expect(parseRotate('rotate-y-()')).toBeNull();
    expect(parseRotate('rotate-z-()')).toBeNull();
  });
}); 