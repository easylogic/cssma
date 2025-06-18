import { TypographyParser } from '../../src/core/parsers/typography-parser';
import { DesignPreset } from '../../src/types';

const mockPreset: DesignPreset = {
  name: 'test',
  version: '1.0.0',
  colors: {},
  spacing: {},
  typography: {
    fontSize: {},
    fontWeight: {},
    lineHeight: {},
    letterSpacing: {},
    fontFamily: {}
  },
  effects: {}
};

describe('text-transform utilities', () => {
  test('should apply text-transform styles', () => {
    const styles: any = {};
    
    TypographyParser.applyTypographyStyle({ property: 'uppercase', value: '', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textTransform).toBe('uppercase');

    // Reset
    styles.typography = {};
    TypographyParser.applyTypographyStyle({ property: 'lowercase', value: '', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textTransform).toBe('lowercase');

    // Reset
    styles.typography = {};
    TypographyParser.applyTypographyStyle({ property: 'capitalize', value: '', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textTransform).toBe('capitalize');

    // Reset
    styles.typography = {};
    TypographyParser.applyTypographyStyle({ property: 'normal-case', value: '', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textTransform).toBe('none');
  });
});

describe('text-decoration utilities', () => {
  test('should apply text-decoration styles', () => {
    const styles: any = {};
    
    TypographyParser.applyTypographyStyle({ property: 'underline', value: '', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textDecoration).toBe('underline');

    // Reset
    styles.typography = {};
    TypographyParser.applyTypographyStyle({ property: 'overline', value: '', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textDecoration).toBe('overline');

    // Reset
    styles.typography = {};
    TypographyParser.applyTypographyStyle({ property: 'line-through', value: '', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textDecoration).toBe('line-through');

    // Reset
    styles.typography = {};
    TypographyParser.applyTypographyStyle({ property: 'no-underline', value: '', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textDecoration).toBe('none');
  });
});

describe('text-decoration-style utilities', () => {
  test('should apply text-decoration-style styles', () => {
    const styles: any = {};
    
    TypographyParser.applyTypographyStyle({ property: 'decoration-solid', value: 'solid', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textDecorationStyle).toBe('solid');

    // Reset
    styles.typography = {};
    TypographyParser.applyTypographyStyle({ property: 'decoration-double', value: 'double', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textDecorationStyle).toBe('double');

    // Reset
    styles.typography = {};
    TypographyParser.applyTypographyStyle({ property: 'decoration-dotted', value: 'dotted', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textDecorationStyle).toBe('dotted');

    // Reset
    styles.typography = {};
    TypographyParser.applyTypographyStyle({ property: 'decoration-dashed', value: 'dashed', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textDecorationStyle).toBe('dashed');

    // Reset
    styles.typography = {};
    TypographyParser.applyTypographyStyle({ property: 'decoration-wavy', value: 'wavy', isArbitrary: false }, styles, mockPreset);
    expect(styles.typography.textDecorationStyle).toBe('wavy');
  });
}); 