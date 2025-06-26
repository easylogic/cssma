import { describe, it, expect } from 'vitest';
import { parseFontVariantNumeric } from '../../src/parser/utilities/fontVariantNumeric';

describe('parseFontVariantNumeric', () => {
  it('parses all valid presets', () => {
    expect(parseFontVariantNumeric('normal-nums')).toEqual({ type: 'font-variant-numeric', value: 'normal', raw: 'normal-nums' });
    expect(parseFontVariantNumeric('ordinal')).toEqual({ type: 'font-variant-numeric', value: 'ordinal', raw: 'ordinal' });
    expect(parseFontVariantNumeric('slashed-zero')).toEqual({ type: 'font-variant-numeric', value: 'slashed-zero', raw: 'slashed-zero' });
    expect(parseFontVariantNumeric('lining-nums')).toEqual({ type: 'font-variant-numeric', value: 'lining-nums', raw: 'lining-nums' });
    expect(parseFontVariantNumeric('oldstyle-nums')).toEqual({ type: 'font-variant-numeric', value: 'oldstyle-nums', raw: 'oldstyle-nums' });
    expect(parseFontVariantNumeric('proportional-nums')).toEqual({ type: 'font-variant-numeric', value: 'proportional-nums', raw: 'proportional-nums' });
    expect(parseFontVariantNumeric('tabular-nums')).toEqual({ type: 'font-variant-numeric', value: 'tabular-nums', raw: 'tabular-nums' });
    expect(parseFontVariantNumeric('diagonal-fractions')).toEqual({ type: 'font-variant-numeric', value: 'diagonal-fractions', raw: 'diagonal-fractions' });
    expect(parseFontVariantNumeric('stacked-fractions')).toEqual({ type: 'font-variant-numeric', value: 'stacked-fractions', raw: 'stacked-fractions' });
  });

  it('returns null for invalid input', () => {
    expect(parseFontVariantNumeric('font-variant-numeric')).toBeNull();
    expect(parseFontVariantNumeric('normal')).toBeNull();
    expect(parseFontVariantNumeric('nums')).toBeNull();
    expect(parseFontVariantNumeric('tabular')).toBeNull();
  });

  it('can be composed by multiple calls', () => {
    // Simulate composability by calling multiple times
    const classes = ['slashed-zero', 'tabular-nums'];
    const results = classes.map(cls => parseFontVariantNumeric(cls));
    expect(results).toEqual([
      { type: 'font-variant-numeric', value: 'slashed-zero', raw: 'slashed-zero' },
      { type: 'font-variant-numeric', value: 'tabular-nums', raw: 'tabular-nums' },
    ]);
  });
}); 