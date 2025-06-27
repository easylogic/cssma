import { describe, it, expect } from 'vitest';
import { parsePerspective } from '../../src/parser/utilities/perspective';

describe('parsePerspective', () => {
  it('parses preset classes', () => {
    expect(parsePerspective('perspective-dramatic')).toEqual({
      type: 'perspective',
      value: 'var(--perspective-dramatic)',
      raw: 'perspective-dramatic',
      preset: 'perspective-dramatic',
    });
    expect(parsePerspective('perspective-near')).toEqual({
      type: 'perspective',
      value: 'var(--perspective-near)',
      raw: 'perspective-near',
      preset: 'perspective-near',
    });
    expect(parsePerspective('perspective-normal')).toEqual({
      type: 'perspective',
      value: 'var(--perspective-normal)',
      raw: 'perspective-normal',
      preset: 'perspective-normal',
    });
    expect(parsePerspective('perspective-midrange')).toEqual({
      type: 'perspective',
      value: 'var(--perspective-midrange)',
      raw: 'perspective-midrange',
      preset: 'perspective-midrange',
    });
    expect(parsePerspective('perspective-distant')).toEqual({
      type: 'perspective',
      value: 'var(--perspective-distant)',
      raw: 'perspective-distant',
      preset: 'perspective-distant',
    });
    expect(parsePerspective('perspective-none')).toEqual({
      type: 'perspective',
      value: 'none',
      raw: 'perspective-none',
      preset: 'perspective-none',
    });
  });

  it('parses custom property', () => {
    expect(parsePerspective('perspective-(--my-perspective)')).toEqual({
      type: 'perspective',
      value: 'var(--my-perspective)',
      raw: 'perspective-(--my-perspective)',
      customProperty: true,
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parsePerspective('perspective-[750px]')).toEqual({
      type: 'perspective',
      value: '750px',
      raw: 'perspective-[750px]',
      arbitrary: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parsePerspective('perspective-foo')).toBeNull();
    expect(parsePerspective('perspective-')).toBeNull();
    expect(parsePerspective('perspective-[]')).toBeNull();
    expect(parsePerspective('perspective-()')).toBeNull();
  });
}); 