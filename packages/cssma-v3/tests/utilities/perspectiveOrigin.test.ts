import { describe, it, expect } from 'vitest';
import { parsePerspectiveOrigin } from '../../src/parser/utilities/perspectiveOrigin';

describe('parsePerspectiveOrigin', () => {
  it('parses preset classes', () => {
    expect(parsePerspectiveOrigin('perspective-origin-center')).toEqual({
      type: 'perspective-origin', value: 'center', raw: 'perspective-origin-center', preset: 'perspective-origin-center', arbitrary: false,
    });
    expect(parsePerspectiveOrigin('perspective-origin-top')).toEqual({
      type: 'perspective-origin', value: 'top', raw: 'perspective-origin-top', preset: 'perspective-origin-top', arbitrary: false,
    });
    expect(parsePerspectiveOrigin('perspective-origin-top-right')).toEqual({
      type: 'perspective-origin', value: 'top right', raw: 'perspective-origin-top-right', preset: 'perspective-origin-top-right', arbitrary: false,
    });
    expect(parsePerspectiveOrigin('perspective-origin-right')).toEqual({
      type: 'perspective-origin', value: 'right', raw: 'perspective-origin-right', preset: 'perspective-origin-right', arbitrary: false,
    });
    expect(parsePerspectiveOrigin('perspective-origin-bottom-right')).toEqual({
      type: 'perspective-origin', value: 'bottom right', raw: 'perspective-origin-bottom-right', preset: 'perspective-origin-bottom-right', arbitrary: false,
    });
    expect(parsePerspectiveOrigin('perspective-origin-bottom')).toEqual({
      type: 'perspective-origin', value: 'bottom', raw: 'perspective-origin-bottom', preset: 'perspective-origin-bottom', arbitrary: false,
    });
    expect(parsePerspectiveOrigin('perspective-origin-bottom-left')).toEqual({
      type: 'perspective-origin', value: 'bottom left', raw: 'perspective-origin-bottom-left', preset: 'perspective-origin-bottom-left', arbitrary: false,
    });
    expect(parsePerspectiveOrigin('perspective-origin-left')).toEqual({
      type: 'perspective-origin', value: 'left', raw: 'perspective-origin-left', preset: 'perspective-origin-left', arbitrary: false,
    });
    expect(parsePerspectiveOrigin('perspective-origin-top-left')).toEqual({
      type: 'perspective-origin', value: 'top left', raw: 'perspective-origin-top-left', preset: 'perspective-origin-top-left', arbitrary: false,
    });
  });

  it('parses custom property', () => {
    expect(parsePerspectiveOrigin('perspective-origin-(--my-perspective-origin)')).toEqual({
      type: 'perspective-origin', value: 'var(--my-perspective-origin)', raw: 'perspective-origin-(--my-perspective-origin)', customProperty: true, arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parsePerspectiveOrigin('perspective-origin-[200%_150%]')).toEqual({
      type: 'perspective-origin', value: '200%_150%', raw: 'perspective-origin-[200%_150%]', arbitrary: true,
    });
    expect(parsePerspectiveOrigin('perspective-origin-[top_2rem_left_3rem]')).toEqual({
      type: 'perspective-origin', value: 'top_2rem_left_3rem', raw: 'perspective-origin-[top_2rem_left_3rem]', arbitrary: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parsePerspectiveOrigin('perspective-origin-foo')).toBeNull();
    expect(parsePerspectiveOrigin('perspective-origin-')).toBeNull();
    expect(parsePerspectiveOrigin('perspective-origin-[]')).toBeNull();
    expect(parsePerspectiveOrigin('perspective-origin-()')).toBeNull();
  });
}); 