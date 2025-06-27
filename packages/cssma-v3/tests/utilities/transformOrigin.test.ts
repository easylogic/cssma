import { describe, it, expect } from 'vitest';
import { parseTransformOrigin } from '../../src/parser/utilities/transformOrigin';

describe('parseTransformOrigin', () => {
  it('parses preset classes', () => {
    expect(parseTransformOrigin('origin-center')).toEqual({ type: 'transform-origin', value: 'center', raw: 'origin-center', preset: 'origin-center', arbitrary: false });
    expect(parseTransformOrigin('origin-top')).toEqual({ type: 'transform-origin', value: 'top', raw: 'origin-top', preset: 'origin-top', arbitrary: false });
    expect(parseTransformOrigin('origin-top-right')).toEqual({ type: 'transform-origin', value: 'top right', raw: 'origin-top-right', preset: 'origin-top-right', arbitrary: false });
    expect(parseTransformOrigin('origin-right')).toEqual({ type: 'transform-origin', value: 'right', raw: 'origin-right', preset: 'origin-right', arbitrary: false });
    expect(parseTransformOrigin('origin-bottom-right')).toEqual({ type: 'transform-origin', value: 'bottom right', raw: 'origin-bottom-right', preset: 'origin-bottom-right', arbitrary: false });
    expect(parseTransformOrigin('origin-bottom')).toEqual({ type: 'transform-origin', value: 'bottom', raw: 'origin-bottom', preset: 'origin-bottom', arbitrary: false });
    expect(parseTransformOrigin('origin-bottom-left')).toEqual({ type: 'transform-origin', value: 'bottom left', raw: 'origin-bottom-left', preset: 'origin-bottom-left', arbitrary: false });
    expect(parseTransformOrigin('origin-left')).toEqual({ type: 'transform-origin', value: 'left', raw: 'origin-left', preset: 'origin-left', arbitrary: false });
    expect(parseTransformOrigin('origin-top-left')).toEqual({ type: 'transform-origin', value: 'top left', raw: 'origin-top-left', preset: 'origin-top-left', arbitrary: false });
  });
  it('parses custom property', () => {
    expect(parseTransformOrigin('origin-(--my-transform-origin)')).toEqual({ type: 'transform-origin', value: 'var(--my-transform-origin)', raw: 'origin-(--my-transform-origin)', customProperty: true, arbitrary: false });
  });
  it('parses arbitrary value', () => {
    expect(parseTransformOrigin('origin-[33%_75%]')).toEqual({ type: 'transform-origin', value: '33%_75%', raw: 'origin-[33%_75%]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseTransformOrigin('origin-')).toBeNull();
    expect(parseTransformOrigin('origin-foo')).toBeNull();
    expect(parseTransformOrigin('origin-[]')).toBeNull();
    expect(parseTransformOrigin('origin-()')).toBeNull();
  });
}); 