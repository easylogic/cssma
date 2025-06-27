import { describe, it, expect } from 'vitest';
import { parseTransitionTimingFunction } from '../../src/parser/utilities/transitionTimingFunction';

describe('parseTransitionTimingFunction', () => {
  it('parses preset classes', () => {
    expect(parseTransitionTimingFunction('ease-linear')).toEqual({
      type: 'transition-timing-function',
      value: 'linear',
      raw: 'ease-linear',
      preset: 'ease-linear',
    });
    expect(parseTransitionTimingFunction('ease-in')).toEqual({
      type: 'transition-timing-function',
      value: 'var(--ease-in)',
      raw: 'ease-in',
      preset: 'ease-in',
    });
    expect(parseTransitionTimingFunction('ease-out')).toEqual({
      type: 'transition-timing-function',
      value: 'var(--ease-out)',
      raw: 'ease-out',
      preset: 'ease-out',
    });
    expect(parseTransitionTimingFunction('ease-in-out')).toEqual({
      type: 'transition-timing-function',
      value: 'var(--ease-in-out)',
      raw: 'ease-in-out',
      preset: 'ease-in-out',
    });
    expect(parseTransitionTimingFunction('ease-initial')).toEqual({
      type: 'transition-timing-function',
      value: 'initial',
      raw: 'ease-initial',
      preset: 'ease-initial',
    });
  });

  it('parses custom property', () => {
    expect(parseTransitionTimingFunction('ease-(--my-ease)')).toEqual({
      type: 'transition-timing-function',
      value: 'var(--my-ease)',
      raw: 'ease-(--my-ease)',
      customProperty: true,
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseTransitionTimingFunction('ease-[cubic-bezier(0.4,0,0.2,1)]')).toEqual({
      type: 'transition-timing-function',
      value: 'cubic-bezier(0.4,0,0.2,1)',
      raw: 'ease-[cubic-bezier(0.4,0,0.2,1)]',
      arbitrary: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parseTransitionTimingFunction('ease-foo')).toBeNull();
    expect(parseTransitionTimingFunction('ease-')).toBeNull();
    expect(parseTransitionTimingFunction('ease-[]')).toBeNull();
    expect(parseTransitionTimingFunction('ease-()')).toBeNull();
  });
}); 