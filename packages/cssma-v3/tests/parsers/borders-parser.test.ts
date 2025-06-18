import { describe, test, expect } from 'vitest';
import { BordersParser } from '../../src/core/parsers/borders-parser';

describe('BordersParser', () => {
  describe('parse method', () => {
    test('should parse border width utilities', () => {
      expect(BordersParser.parse('border')).toEqual({
        property: 'borderWidth',
        value: '1px',
        variant: 'preset'
      });

      expect(BordersParser.parse('border-2')).toEqual({
        property: 'borderWidth',
        value: '2px',
        variant: 'preset'
      });

      expect(BordersParser.parse('border-0')).toEqual({
        property: 'borderWidth',
        value: '0px',
        variant: 'preset'
      });
    });

    test('should parse border style utilities', () => {
      expect(BordersParser.parse('border-solid')).toEqual({
        property: 'borderStyle',
        value: 'solid',
        variant: 'preset'
      });

      expect(BordersParser.parse('border-dashed')).toEqual({
        property: 'borderStyle',
        value: 'dashed',
        variant: 'preset'
      });

      expect(BordersParser.parse('border-dotted')).toEqual({
        property: 'borderStyle',
        value: 'dotted',
        variant: 'preset'
      });
    });

    test('should parse border radius utilities', () => {
      expect(BordersParser.parse('rounded')).toEqual({
        property: 'borderRadius',
        value: '4px',
        variant: 'preset'
      });

      expect(BordersParser.parse('rounded-lg')).toEqual({
        property: 'borderRadius',
        value: '8px',
        variant: 'preset'
      });

      expect(BordersParser.parse('rounded-full')).toEqual({
        property: 'borderRadius',
        value: '9999px',
        variant: 'preset'
      });
    });

    test('should parse directional border radius utilities', () => {
      expect(BordersParser.parse('rounded-t-lg')).toEqual({
        property: 'borderTopLeftRadius, borderTopRightRadius',
        value: '8px',
        variant: 'preset'
      });

      expect(BordersParser.parse('rounded-tr')).toEqual({
        property: 'borderTopRightRadius',
        value: '4px',
        variant: 'preset'
      });
    });

    test('should parse directional border width utilities', () => {
      expect(BordersParser.parse('border-x-4')).toEqual({
        property: 'borderInlineWidth',
        value: '4px',
        variant: 'preset'
      });

      expect(BordersParser.parse('border-t-2')).toEqual({
        property: 'borderTopWidth',
        value: '2px',
        variant: 'preset'
      });
    });

    test('should parse outline utilities', () => {
      expect(BordersParser.parse('outline-none')).toEqual({
        property: 'outlineStyle',
        value: 'none',
        variant: 'preset'
      });

      // Note: 'outline' alone is not supported, only specific outline utilities
    });

    test('should parse ring utilities', () => {
      expect(BordersParser.parse('ring')).toEqual({
        property: 'ringWidth',
        value: '3px',
        variant: 'preset'
      });

      expect(BordersParser.parse('ring-2')).toEqual({
        property: 'ringWidth',
        value: '2px',
        variant: 'preset'
      });
    });

    test('should parse divide utilities', () => {
      expect(BordersParser.parse('divide-x')).toEqual({
        property: 'divideXWidth',
        value: '1px',
        variant: 'preset'
      });

      expect(BordersParser.parse('divide-y-2')).toEqual({
        property: 'divideYWidth',
        value: '2px',
        variant: 'preset'
      });
    });

    test('should parse arbitrary border values', () => {
      expect(BordersParser.parse('border-[3px]')).toEqual({
        property: 'borderWidth',
        value: '3px',
        variant: 'arbitrary'
      });

      expect(BordersParser.parse('rounded-[12px]')).toEqual({
        property: 'borderRadius',
        value: '12px',
        variant: 'arbitrary'
      });
    });

    test('should return null for invalid classes', () => {
      expect(BordersParser.parse('invalid-class')).toBeNull();
      expect(BordersParser.parse('text-blue-500')).toBeNull();
    });
  });

  describe('applyBordersStyle method', () => {
    test('should apply border width correctly', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'border-2',
        value: '',
        baseClassName: 'border-2'
      };

      BordersParser.applyBordersStyle(parsedClass, styles, {});

      expect(styles.borders).toEqual({
        borderWidth: '2px'
      });
    });

    test('should apply border radius correctly', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'rounded-lg',
        value: '',
        baseClassName: 'rounded-lg'
      };

      BordersParser.applyBordersStyle(parsedClass, styles, {});

      expect(styles.borders).toEqual({
        borderRadius: '8px'
      });
    });

    test('should accumulate multiple border properties', () => {
      const styles: any = { borders: {} };
      
      // Apply border width
      BordersParser.applyBordersStyle({
        property: 'border-2',
        value: '',
        baseClassName: 'border-2'
      }, styles, {});

      // Apply border radius
      BordersParser.applyBordersStyle({
        property: 'rounded-lg',
        value: '',
        baseClassName: 'rounded-lg'
      }, styles, {});

      expect(styles.borders).toEqual({
        borderWidth: '2px',
        borderRadius: '8px'
      });
    });
  });
}); 