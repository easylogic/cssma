import { describe, it, expect } from 'vitest';
import { parseMask } from '../../src/parser/utilities/mask';

describe('parseMaskImage', () => {
  it('parses mask-none', () => {
    expect(parseMask('mask-none')).toEqual({ type: 'mask-image', value: 'none', raw: 'mask-none', arbitrary: false });
  });
  it('parses arbitrary value', () => {
    expect(parseMask('mask-[url(/img/foo.png)]')).toEqual({ type: 'mask-image', value: 'url(/img/foo.png)', raw: 'mask-[url(/img/foo.png)]', arbitrary: true });
  });
  it('parses custom property', () => {
    expect(parseMask('mask-(--my-mask)')).toEqual({ type: 'mask-image', value: 'var(--my-mask)', raw: 'mask-(--my-mask)', arbitrary: true });
  });
  it('parses mask-linear-50 and -mask-linear-50', () => {
    expect(parseMask('mask-linear-50')).toEqual({ type: 'mask-image', preset: 'linear', angle: 50, raw: 'mask-linear-50', arbitrary: false });
    expect(parseMask('-mask-linear-50')).toEqual({ type: 'mask-image', preset: 'linear', angle: -50, raw: '-mask-linear-50', arbitrary: false });
  });
  it('parses mask-linear-from/to', () => {
    expect(parseMask('mask-linear-from-60%')).toEqual({ type: 'mask-image', preset: 'linear-from', value: '60%', raw: 'mask-linear-from-60%', arbitrary: false });
    expect(parseMask('mask-linear-to-80%')).toEqual({ type: 'mask-image', preset: 'linear-to', value: '80%', raw: 'mask-linear-to-80%', arbitrary: false });
  });
  it('parses mask-x-from/to, mask-y-from/to', () => {
    expect(parseMask('mask-x-from-70%')).toEqual({ type: 'mask-image', preset: 'x-from', value: '70%', raw: 'mask-x-from-70%', arbitrary: false });
    expect(parseMask('mask-x-to-90%')).toEqual({ type: 'mask-image', preset: 'x-to', value: '90%', raw: 'mask-x-to-90%', arbitrary: false });
    expect(parseMask('mask-y-from-70%')).toEqual({ type: 'mask-image', preset: 'y-from', value: '70%', raw: 'mask-y-from-70%', arbitrary: false });
    expect(parseMask('mask-y-to-90%')).toEqual({ type: 'mask-image', preset: 'y-to', value: '90%', raw: 'mask-y-to-90%', arbitrary: false });
  });
  it('parses mask-radial-from/to/at/size', () => {
    expect(parseMask('mask-radial-from-75%')).toEqual({ type: 'mask-image', preset: 'radial-from', value: '75%', raw: 'mask-radial-from-75%', arbitrary: false });
    expect(parseMask('mask-radial-to-85%')).toEqual({ type: 'mask-image', preset: 'radial-to', value: '85%', raw: 'mask-radial-to-85%', arbitrary: false });
    expect(parseMask('mask-radial-at-top-left')).toEqual({ type: 'mask-image', preset: 'radial-at', value: 'top-left', raw: 'mask-radial-at-top-left', arbitrary: false });
    expect(parseMask('mask-radial-closest-side')).toEqual({ type: 'mask-image', preset: 'closest-side', raw: 'mask-radial-closest-side', arbitrary: false });
    expect(parseMask('mask-radial-farthest-corner')).toEqual({ type: 'mask-image', preset: 'farthest-corner', raw: 'mask-radial-farthest-corner', arbitrary: false });
  });
  it('parses mask-conic-from/to/angle', () => {
    expect(parseMask('mask-conic-from-75%')).toEqual({ type: 'mask-image', preset: 'conic-from', value: '75%', raw: 'mask-conic-from-75%', arbitrary: false });
    expect(parseMask('mask-conic-to-75%')).toEqual({ type: 'mask-image', preset: 'conic-to', value: '75%', raw: 'mask-conic-to-75%', arbitrary: false });
    expect(parseMask('mask-conic-120')).toEqual({ type: 'mask-image', preset: 'conic', angle: 120, raw: 'mask-conic-120', arbitrary: false });
  });
  it('parses gradient arbitrary and custom property', () => {
    expect(parseMask('mask-linear-[70deg,transparent_10%,black,transparent_80%]')).toEqual({ type: 'mask-image', preset: 'linear', value: '70deg,transparent_10%,black,transparent_80%', raw: 'mask-linear-[70deg,transparent_10%,black,transparent_80%]', arbitrary: true });
    expect(parseMask('mask-linear-(--my-mask)')).toEqual({ type: 'mask-image', preset: 'linear', value: 'var(--my-mask)', raw: 'mask-linear-(--my-mask)', arbitrary: true });
  });
  it('returns null for invalid mask-image', () => {
    expect(parseMask('mask-image-foo')).toBeNull();
    expect(parseMask('mask-')).toBeNull();
    expect(parseMask('mask-linear-')).toBeNull();
  });
}); 