import { describe, test, expect } from 'vitest';
import { AccessibilityParser } from '../../src/core/parsers/accessibility-parser';

describe('AccessibilityParser', () => {
  describe('parse method', () => {
    test('should parse screen reader utilities', () => {
      expect(AccessibilityParser.parse('sr-only')).toEqual({
        property: 'screenReader',
        value: {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0'
        },
        variant: 'preset'
      });

      expect(AccessibilityParser.parse('not-sr-only')).toEqual({
        property: 'screenReader',
        value: {
          position: 'static',
          width: 'auto',
          height: 'auto',
          padding: '0',
          margin: '0',
          overflow: 'visible',
          clip: 'auto',
          whiteSpace: 'normal'
        },
        variant: 'preset'
      });
    });

    test('should parse forced color adjust utilities', () => {
      expect(AccessibilityParser.parse('forced-color-adjust-auto')).toEqual({
        property: 'forcedColorAdjust',
        value: 'auto',
        variant: 'preset'
      });

      expect(AccessibilityParser.parse('forced-color-adjust-none')).toEqual({
        property: 'forcedColorAdjust',
        value: 'none',
        variant: 'preset'
      });
    });

    test('should return null for invalid classes', () => {
      expect(AccessibilityParser.parse('invalid-class')).toBeNull();
      expect(AccessibilityParser.parse('text-blue-500')).toBeNull();
    });
  });

  describe('applyAccessibilityStyle method', () => {
    test('should apply sr-only correctly', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'sr-only',
        value: '',
        baseClassName: 'sr-only'
      };

      AccessibilityParser.applyAccessibilityStyle(parsedClass, styles, {});

      expect(styles.accessibility).toEqual({
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: '0'
      });
    });

    test('should apply forced color adjust correctly', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'forced-color-adjust-auto',
        value: '',
        baseClassName: 'forced-color-adjust-auto'
      };

      AccessibilityParser.applyAccessibilityStyle(parsedClass, styles, {});

      expect(styles.accessibility).toEqual({
        forcedColorAdjust: 'auto'
      });
    });
  });
}); 