import { describe, it, expect } from 'vitest';
import {
  getModifierPriority,
  isResponsiveModifier,
  isMediaModifier,
  isArbitraryModifier,
  isSelectorModifier,
  sortModifiersForSelector,
} from '../../src/parser/utils';
import type { ParsedModifier } from '../../src/types';

describe('getModifierPriority', () => {
  it('returns correct priority for each modifier type', () => {
    expect(getModifierPriority({ type: 'responsive', variant: 'sm' })).toBe(1);
    expect(getModifierPriority({ type: 'breakpoint', name: 'md' })).toBe(1);
    expect(getModifierPriority({ type: 'container', variant: 'max-md' })).toBe(1);

    expect(getModifierPriority({ type: 'media', name: 'motion-safe' })).toBe(2);
    expect(getModifierPriority({ type: 'darkmode', mode: 'dark' })).toBe(2);
    expect(getModifierPriority({ type: 'motion', mode: 'reduce' })).toBe(2);

    expect(getModifierPriority({ type: 'group', state: 'hover' })).toBe(3);
    expect(getModifierPriority({ type: 'peer', state: 'focus' })).toBe(3);

    expect(getModifierPriority({ type: 'pseudo', name: 'hover' })).toBe(4);
    expect(getModifierPriority({ type: 'state', value: 'open' })).toBe(4);
    expect(getModifierPriority({ type: 'logical', op: 'has', value: 'checked' })).toBe(4);
    expect(getModifierPriority({ type: 'nth', value: '3n+1' })).toBe(4);
    expect(getModifierPriority({ type: 'nth-of-type', value: 'odd' })).toBe(4);
    expect(getModifierPriority({ type: 'nth-last-of-type', value: 'even' })).toBe(4);
    expect(getModifierPriority({ type: 'data', attr: 'active', value: 'true' })).toBe(4);
    expect(getModifierPriority({ type: 'aria', attr: 'checked', value: 'true' })).toBe(4);
    expect(getModifierPriority({ type: 'attribute', attr: 'foo', value: 'bar' })).toBe(4);

    expect(getModifierPriority({ type: 'pseudo-element', name: 'before' })).toBe(5);

    expect(getModifierPriority({ type: 'arbitrary', selector: '&>*' })).toBe(6);

    expect(getModifierPriority({ type: 'unknown', raw: 'foo' })).toBe(99);
  });
});

describe('modifier type guards', () => {
  it('isResponsiveModifier works', () => {
    expect(isResponsiveModifier({ type: 'responsive', variant: 'sm' })).toBe(true);
    expect(isResponsiveModifier({ type: 'breakpoint', name: 'md' })).toBe(true);
    expect(isResponsiveModifier({ type: 'container', variant: 'max-md' })).toBe(true);
    expect(isResponsiveModifier({ type: 'pseudo', name: 'hover' })).toBe(false);
  });

  it('isMediaModifier works', () => {
    expect(isMediaModifier({ type: 'media', name: 'motion-safe' })).toBe(true);
    expect(isMediaModifier({ type: 'darkmode', mode: 'dark' })).toBe(true);
    expect(isMediaModifier({ type: 'motion', mode: 'reduce' })).toBe(true);
    expect(isMediaModifier({ type: 'responsive', variant: 'sm' })).toBe(false);
  });

  it('isArbitraryModifier works', () => {
    expect(isArbitraryModifier({ type: 'arbitrary', selector: '&>*' })).toBe(true);
    expect(isArbitraryModifier({ type: 'attribute', attr: 'foo', value: 'bar' })).toBe(true);
    expect(isArbitraryModifier({ type: 'pseudo', name: 'hover' })).toBe(false);
  });

  it('isSelectorModifier works', () => {
    expect(isSelectorModifier({ type: 'pseudo', name: 'hover' })).toBe(true);
    expect(isSelectorModifier({ type: 'group', state: 'hover' })).toBe(true);
    expect(isSelectorModifier({ type: 'responsive', variant: 'sm' })).toBe(false);
  });
});

describe('modifier sort (Tailwind order)', () => {
  it('sorts modifiers in correct Tailwind priority order', () => {
    const unordered: ParsedModifier[] = [
      { type: 'pseudo', name: 'hover' },
      { type: 'group', state: 'focus' },
      { type: 'responsive', variant: 'md' },
      { type: 'pseudo-element', name: 'before' },
      { type: 'media', name: 'motion-safe' },
      { type: 'arbitrary', selector: '&>*' },
      { type: 'state', value: 'open' },
      { type: 'peer', state: 'checked' },
      { type: 'nth', value: '2n+1' },
      { type: 'attribute', attr: 'foo', value: 'bar' },
      { type: 'aria', attr: 'checked', value: 'true' },
      { type: 'container', variant: 'max-md' },
      { type: 'nth-of-type', value: 'odd' },
      { type: 'nth-last-of-type', value: 'even' },
      { type: 'data', attr: 'active', value: 'true' },
      { type: 'logical', op: 'has', value: 'checked' },
      { type: 'darkmode', mode: 'dark' },
    ];
    const sorted = sortModifiersForSelector(unordered);
    const priorities = sorted.map(getModifierPriority);
    expect(priorities).toEqual([
      1,1,2,2,3,3,4,4,4,4,4,4,4,4,4,5,6
    ]);
  });
}); 