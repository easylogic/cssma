import { describe, it, expect } from 'vitest';
import { parseTransitionDelay } from '../../src/parser/utilities/transitionDelay';

describe('parseTransitionDelay', () => {
  it('parses delay-<number>', () => {
    expect(parseTransitionDelay('delay-150')).toEqual({
      type: 'transition-delay',
      value: '150ms',
      raw: 'delay-150',
      preset: true,
    });
    expect(parseTransitionDelay('delay-700')).toEqual({
      type: 'transition-delay',
      value: '700ms',
      raw: 'delay-700',
      preset: true,
    });
  });

  it('parses custom property', () => {
    expect(parseTransitionDelay('delay-(--my-delay)')).toEqual({
      type: 'transition-delay',
      value: 'var(--my-delay)',
      raw: 'delay-(--my-delay)',
      customProperty: true,
      arbitrary: false,
    });
  });

  it('parses arbitrary value', () => {
    expect(parseTransitionDelay('delay-[1s,250ms]')).toEqual({
      type: 'transition-delay',
      value: '1s,250ms',
      raw: 'delay-[1s,250ms]',
      arbitrary: true,
    });
  });

  it('returns null for invalid input', () => {
    expect(parseTransitionDelay('delay-foo')).toBeNull();
    expect(parseTransitionDelay('delay-')).toBeNull();
    expect(parseTransitionDelay('delay-[]')).toBeNull();
    expect(parseTransitionDelay('delay-()')).toBeNull();
  });
}); 