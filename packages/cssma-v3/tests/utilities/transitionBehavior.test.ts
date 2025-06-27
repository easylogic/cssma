import { describe, it, expect } from 'vitest';
import { parseTransitionBehavior } from '../../src/parser/utilities/transitionBehavior';

describe('parseTransitionBehavior', () => {
  it('parses transition-normal', () => {
    expect(parseTransitionBehavior('transition-normal')).toEqual({
      type: 'transition-behavior',
      value: 'normal',
      raw: 'transition-normal',
      preset: 'transition-normal',
    });
  });

  it('parses transition-discrete', () => {
    expect(parseTransitionBehavior('transition-discrete')).toEqual({
      type: 'transition-behavior',
      value: 'allow-discrete',
      raw: 'transition-discrete',
      preset: 'transition-discrete',
    });
  });

  it('returns null for invalid input', () => {
    expect(parseTransitionBehavior('transition')).toBeNull();
    expect(parseTransitionBehavior('transition-behavior')).toBeNull();
    expect(parseTransitionBehavior('transition-discrete-foo')).toBeNull();
  });
}); 