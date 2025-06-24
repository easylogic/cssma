import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { EffectsParser } from '../src/core/parsers/effects-parser';
import { loadConfig, loadPreset } from '../src/config';

describe('Effects Parser (Filters Integration)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());

  describe('Class Recognition', () => {
    it('should recognize blur classes', () => {
      expect(EffectsParser.isValidClass('blur-none')).toBe(true);
      expect(EffectsParser.isValidClass('blur-xs')).toBe(true);
      expect(EffectsParser.isValidClass('blur-sm')).toBe(true);
      expect(EffectsParser.isValidClass('blur-md')).toBe(true);
      expect(EffectsParser.isValidClass('blur-lg')).toBe(true);
      expect(EffectsParser.isValidClass('blur-xl')).toBe(true);
      expect(EffectsParser.isValidClass('blur-2xl')).toBe(true);
      expect(EffectsParser.isValidClass('blur-3xl')).toBe(true);
      expect(EffectsParser.isValidClass('blur-[10px]')).toBe(true);
    });

    it('should recognize brightness classes', () => {
      expect(EffectsParser.isValidClass('brightness-0')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-50')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-75')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-90')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-95')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-100')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-105')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-110')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-125')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-150')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-200')).toBe(true);
      expect(EffectsParser.isValidClass('brightness-[1.75]')).toBe(true);
    });

    it('should recognize contrast classes', () => {
      expect(EffectsParser.isValidClass('contrast-0')).toBe(true);
      expect(EffectsParser.isValidClass('contrast-50')).toBe(true);
      expect(EffectsParser.isValidClass('contrast-75')).toBe(true);
      expect(EffectsParser.isValidClass('contrast-100')).toBe(true);
      expect(EffectsParser.isValidClass('contrast-125')).toBe(true);
      expect(EffectsParser.isValidClass('contrast-150')).toBe(true);
      expect(EffectsParser.isValidClass('contrast-200')).toBe(true);
      expect(EffectsParser.isValidClass('contrast-[1.25]')).toBe(true);
    });

    it('should recognize drop-shadow classes', () => {
      expect(EffectsParser.isValidClass('drop-shadow-xs')).toBe(true);
      expect(EffectsParser.isValidClass('drop-shadow-sm')).toBe(true);
      expect(EffectsParser.isValidClass('drop-shadow-md')).toBe(true);
      expect(EffectsParser.isValidClass('drop-shadow-lg')).toBe(true);
      expect(EffectsParser.isValidClass('drop-shadow-xl')).toBe(true);
      expect(EffectsParser.isValidClass('drop-shadow-2xl')).toBe(true);
      expect(EffectsParser.isValidClass('drop-shadow-none')).toBe(true);
      expect(EffectsParser.isValidClass('drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]')).toBe(true);
    });

    it('should recognize grayscale classes', () => {
      expect(EffectsParser.isValidClass('grayscale')).toBe(true);
      expect(EffectsParser.isValidClass('grayscale-0')).toBe(true);
      expect(EffectsParser.isValidClass('grayscale-[0.5]')).toBe(true);
    });

    it('should recognize hue-rotate classes', () => {
      expect(EffectsParser.isValidClass('hue-rotate-0')).toBe(true);
      expect(EffectsParser.isValidClass('hue-rotate-15')).toBe(true);
      expect(EffectsParser.isValidClass('hue-rotate-30')).toBe(true);
      expect(EffectsParser.isValidClass('hue-rotate-60')).toBe(true);
      expect(EffectsParser.isValidClass('hue-rotate-90')).toBe(true);
      expect(EffectsParser.isValidClass('hue-rotate-180')).toBe(true);
      expect(EffectsParser.isValidClass('hue-rotate-[45deg]')).toBe(true);
      expect(EffectsParser.isValidClass('-hue-rotate-15')).toBe(true);
    });

    it('should recognize invert classes', () => {
      expect(EffectsParser.isValidClass('invert')).toBe(true);
      expect(EffectsParser.isValidClass('invert-0')).toBe(true);
      expect(EffectsParser.isValidClass('invert-[0.5]')).toBe(true);
    });

    it('should recognize saturate classes', () => {
      expect(EffectsParser.isValidClass('saturate-0')).toBe(true);
      expect(EffectsParser.isValidClass('saturate-50')).toBe(true);
      expect(EffectsParser.isValidClass('saturate-100')).toBe(true);
      expect(EffectsParser.isValidClass('saturate-150')).toBe(true);
      expect(EffectsParser.isValidClass('saturate-200')).toBe(true);
      expect(EffectsParser.isValidClass('saturate-[1.75]')).toBe(true);
    });

    it('should recognize sepia classes', () => {
      expect(EffectsParser.isValidClass('sepia')).toBe(true);
      expect(EffectsParser.isValidClass('sepia-0')).toBe(true);
      expect(EffectsParser.isValidClass('sepia-[0.5]')).toBe(true);
    });

    it('should recognize backdrop filter classes', () => {
      expect(EffectsParser.isValidClass('backdrop-blur-sm')).toBe(true);
      expect(EffectsParser.isValidClass('backdrop-brightness-125')).toBe(true);
      expect(EffectsParser.isValidClass('backdrop-contrast-150')).toBe(true);
      expect(EffectsParser.isValidClass('backdrop-grayscale')).toBe(true);
      expect(EffectsParser.isValidClass('backdrop-hue-rotate-15')).toBe(true);
      expect(EffectsParser.isValidClass('backdrop-invert')).toBe(true);
      expect(EffectsParser.isValidClass('backdrop-opacity-50')).toBe(true);
      expect(EffectsParser.isValidClass('backdrop-saturate-150')).toBe(true);
      expect(EffectsParser.isValidClass('backdrop-sepia')).toBe(true);
      expect(EffectsParser.isValidClass('-backdrop-hue-rotate-15')).toBe(true);
    });

    it('should not recognize invalid classes', () => {
      expect(EffectsParser.isValidClass('filter-none')).toBe(false);
      expect(EffectsParser.isValidClass('random-class')).toBe(false);
      expect(EffectsParser.isValidClass('blur')).toBe(false); // Should have value
      expect(EffectsParser.isValidClass('backdrop-filter')).toBe(false);
    });
  });

  describe('Value Parsing', () => {
    it('should parse blur values', () => {
      const result1 = EffectsParser.parseValue('blur-sm');
      expect(result1?.property).toBe('blur');
      expect(result1?.value).toBe('sm');
      expect(result1?.isArbitrary).toBe(false);

      const result2 = EffectsParser.parseValue('blur-[10px]');
      expect(result2?.property).toBe('blur');
      expect(result2?.value).toBe('10px');
      expect(result2?.isArbitrary).toBe(true);
    });

    it('should parse brightness values', () => {
      const result1 = EffectsParser.parseValue('brightness-110');
      expect(result1?.property).toBe('brightness');
      expect(result1?.value).toBe('110');
      expect(result1?.isArbitrary).toBe(false);

      const result2 = EffectsParser.parseValue('brightness-[1.75]');
      expect(result2?.property).toBe('brightness');
      expect(result2?.value).toBe('1.75');
      expect(result2?.isArbitrary).toBe(true);
    });

    it('should parse contrast values', () => {
      const result1 = EffectsParser.parseValue('contrast-125');
      expect(result1?.property).toBe('contrast');
      expect(result1?.value).toBe('125');
      expect(result1?.isArbitrary).toBe(false);

      const result2 = EffectsParser.parseValue('contrast-[1.25]');
      expect(result2?.property).toBe('contrast');
      expect(result2?.value).toBe('1.25');
      expect(result2?.isArbitrary).toBe(true);
    });

    it('should parse drop-shadow values', () => {
      const result1 = EffectsParser.parseValue('drop-shadow-lg');
      expect(result1?.property).toBe('drop-shadow');
      expect(result1?.value).toBe('lg');
      expect(result1?.isArbitrary).toBe(false);

      const result2 = EffectsParser.parseValue('drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]');
      expect(result2?.property).toBe('drop-shadow');
      expect(result2?.value).toBe('0_35px_35px_rgba(0,0,0,0.25)');
      expect(result2?.isArbitrary).toBe(true);
    });

    it('should parse grayscale values', () => {
      const result1 = EffectsParser.parseValue('grayscale');
      expect(result1?.property).toBe('grayscale');
      expect(result1?.value).toBe('DEFAULT');
      expect(result1?.isArbitrary).toBe(false);

      const result2 = EffectsParser.parseValue('grayscale-[0.5]');
      expect(result2?.property).toBe('grayscale');
      expect(result2?.value).toBe('0.5');
      expect(result2?.isArbitrary).toBe(true);
    });

    it('should parse hue-rotate values', () => {
      const result1 = EffectsParser.parseValue('hue-rotate-15');
      expect(result1?.property).toBe('hue-rotate');
      expect(result1?.value).toBe('15');
      expect(result1?.isArbitrary).toBe(false);

      const result2 = EffectsParser.parseValue('-hue-rotate-15');
      expect(result2?.property).toBe('hue-rotate');
      expect(result2?.value).toBe('-15');
      expect(result2?.isArbitrary).toBe(false);

      const result3 = EffectsParser.parseValue('hue-rotate-[45deg]');
      expect(result3?.property).toBe('hue-rotate');
      expect(result3?.value).toBe('45deg');
      expect(result3?.isArbitrary).toBe(true);
    });

    it('should parse invert values', () => {
      const result1 = EffectsParser.parseValue('invert');
      expect(result1?.property).toBe('invert');
      expect(result1?.value).toBe('DEFAULT');
      expect(result1?.isArbitrary).toBe(false);

      const result2 = EffectsParser.parseValue('invert-[0.5]');
      expect(result2?.property).toBe('invert');
      expect(result2?.value).toBe('0.5');
      expect(result2?.isArbitrary).toBe(true);
    });

    it('should parse saturate values', () => {
      const result1 = EffectsParser.parseValue('saturate-150');
      expect(result1?.property).toBe('saturate');
      expect(result1?.value).toBe('150');
      expect(result1?.isArbitrary).toBe(false);

      const result2 = EffectsParser.parseValue('saturate-[1.75]');
      expect(result2?.property).toBe('saturate');
      expect(result2?.value).toBe('1.75');
      expect(result2?.isArbitrary).toBe(true);
    });

    it('should parse sepia values', () => {
      const result1 = EffectsParser.parseValue('sepia');
      expect(result1?.property).toBe('sepia');
      expect(result1?.value).toBe('DEFAULT');
      expect(result1?.isArbitrary).toBe(false);

      const result2 = EffectsParser.parseValue('sepia-[0.5]');
      expect(result2?.property).toBe('sepia');
      expect(result2?.value).toBe('0.5');
      expect(result2?.isArbitrary).toBe(true);
    });

    it('should parse backdrop filter values', () => {
      const result1 = EffectsParser.parseValue('backdrop-blur-sm');
      expect(result1?.property).toBe('backdrop-blur');
      expect(result1?.value).toBe('sm');
      expect(result1?.isArbitrary).toBe(false);

      const result2 = EffectsParser.parseValue('backdrop-brightness-125');
      expect(result2?.property).toBe('backdrop-brightness');
      expect(result2?.value).toBe('125');
      expect(result2?.isArbitrary).toBe(false);

      const result3 = EffectsParser.parseValue('-backdrop-hue-rotate-15');
      expect(result3?.property).toBe('backdrop-hue-rotate');
      expect(result3?.value).toBe('-15');
      expect(result3?.isArbitrary).toBe(false);
    });

    it('should return null for invalid classes', () => {
      expect(EffectsParser.parseValue('invalid-class')).toBe(null);
      expect(EffectsParser.parseValue('random-value')).toBe(null);
    });
  });

  describe('Style Application', () => {
    it('should apply blur filter styles', () => {
      const result = parser.parse('blur-sm');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('blur(');
    });

    it('should apply brightness filter styles', () => {
      const result = parser.parse('brightness-110');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('brightness(');
    });

    it('should apply contrast filter styles', () => {
      const result = parser.parse('contrast-125');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('contrast(');
    });

    it('should apply drop-shadow filter styles', () => {
      const result = parser.parse('drop-shadow-lg');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('drop-shadow(');
    });

    it('should apply grayscale filter styles', () => {
      const result = parser.parse('grayscale');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('grayscale(');
    });

    it('should apply hue-rotate filter styles', () => {
      const result = parser.parse('hue-rotate-15');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('hue-rotate(');
    });

    it('should apply invert filter styles', () => {
      const result = parser.parse('invert');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('invert(');
    });

    it('should apply saturate filter styles', () => {
      const result = parser.parse('saturate-150');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('saturate(');
    });

    it('should apply sepia filter styles', () => {
      const result = parser.parse('sepia');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('sepia(');
    });

    it('should apply backdrop filter styles', () => {
      const result = parser.parse('backdrop-blur-sm');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.backdropFilter).toContain('blur(');
    });

    it('should apply multiple filter styles', () => {
      const result = parser.parse('blur-sm brightness-110 contrast-125');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('blur(');
      expect(result.effects?.filter).toContain('brightness(');
      expect(result.effects?.filter).toContain('contrast(');
    });

    it('should apply arbitrary value filters', () => {
      const result = parser.parse('blur-[10px]');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toBeDefined();
    });

    it('should categorize filters correctly', () => {
      const blurClass = parser.parseClass('blur-sm');
      const backdropClass = parser.parseClass('backdrop-blur-sm');
      
      expect(blurClass?.category).toBe('effects');
      expect(backdropClass?.category).toBe('effects');
    });
  });

  describe('Responsive & States', () => {
    it('should handle responsive filter classes', () => {
      const result = parser.parse('md:blur-sm lg:brightness-110');
      
      expect(result.breakpoints).toBeDefined();
      expect(result.breakpoints?.md?.effects).toBeDefined();
      expect(result.breakpoints?.lg?.effects).toBeDefined();
    });

    it('should handle hover state filter classes', () => {
      const result = parser.parse('hover:blur-sm hover:brightness-110');
      
      expect(result.states).toBeDefined();
      expect(result.states?.hover?.effects).toBeDefined();
    });

    it('should handle complex responsive and state combinations', () => {
      const result = parser.parse('sm:hover:blur-md lg:focus:brightness-125');
      
      expect(result.breakpoints).toBeDefined();
      expect(result.states).toBeDefined();
    });

    it('should handle backdrop filters with modifiers', () => {
      const result = parser.parse('md:backdrop-blur-sm hover:backdrop-brightness-110');
      
      expect(result.breakpoints?.md?.effects?.backdropFilter).toBeDefined();
      expect(result.states?.hover?.effects?.backdropFilter).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should combine multiple filter types correctly', () => {
      const result = parser.parse('blur-md brightness-125 contrast-110 grayscale saturate-150');
      
      const filterValue = result.effects?.filter || '';
      
      // Each filter type should be present
      expect(filterValue).toContain('blur(');
      expect(filterValue).toContain('brightness(');
      expect(filterValue).toContain('contrast(');
      expect(filterValue).toContain('grayscale(');
      expect(filterValue).toContain('saturate(');
    });

    it('should combine multiple backdrop filter types correctly', () => {
      const result = parser.parse('backdrop-blur-md backdrop-brightness-125 backdrop-contrast-110 backdrop-grayscale backdrop-saturate-150');
      
      const backdropFilterValue = result.effects?.backdropFilter || '';
      
      // Each backdrop filter type should be present
      expect(backdropFilterValue).toContain('blur(');
      expect(backdropFilterValue).toContain('brightness(');
      expect(backdropFilterValue).toContain('contrast(');
      expect(backdropFilterValue).toContain('grayscale(');
      expect(backdropFilterValue).toContain('saturate(');
    });

    it('should handle mixed regular and backdrop filters', () => {
      const result = parser.parse('blur-sm brightness-110 backdrop-blur-md backdrop-contrast-125');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('blur(');
      expect(result.effects?.filter).toContain('brightness(');
      expect(result.effects?.backdropFilter).toContain('blur(');
      expect(result.effects?.backdropFilter).toContain('contrast(');
    });

    it('should preserve filter order', () => {
      const result = parser.parse('brightness-110 blur-sm contrast-125');
      
      const filterValue = result.effects?.filter || '';
      const brightnessIndex = filterValue.indexOf('brightness(');
      const blurIndex = filterValue.indexOf('blur(');
      const contrastIndex = filterValue.indexOf('contrast(');
      
      // Order should be preserved
      expect(brightnessIndex).toBeLessThan(blurIndex);
      expect(blurIndex).toBeLessThan(contrastIndex);
    });

    it('should handle v4.1 specific features', () => {
      const result = parser.parse('blur-3xl drop-shadow-2xl backdrop-opacity-50');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toContain('blur(');
    });

    it('should handle arbitrary complex filter values', () => {
      const result = parser.parse('blur-[10px] brightness-[1.75] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]');
      
      expect(result.effects).toBeDefined();
      expect(result.effects?.filter).toBeDefined();
    });
  });
});
