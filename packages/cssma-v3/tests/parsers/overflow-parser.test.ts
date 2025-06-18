import { describe, test, expect } from 'vitest';
import { OverflowParser } from '../../src/core/parsers/overflow-parser';

describe('OverflowParser', () => {
  describe('parse method', () => {
    test('should parse overflow utilities', () => {
      expect(OverflowParser.parse('overflow-auto')).toEqual({
        property: 'overflow',
        value: 'auto',
        variant: 'preset'
      });

      expect(OverflowParser.parse('overflow-hidden')).toEqual({
        property: 'overflow',
        value: 'hidden',
        variant: 'preset'
      });

      expect(OverflowParser.parse('overflow-x-scroll')).toEqual({
        property: 'overflowX',
        value: 'scroll',
        variant: 'preset'
      });

      expect(OverflowParser.parse('overflow-y-visible')).toEqual({
        property: 'overflowY',
        value: 'visible',
        variant: 'preset'
      });
    });

    test('should parse overscroll utilities', () => {
      expect(OverflowParser.parse('overscroll-auto')).toEqual({
        property: 'overscrollBehavior',
        value: 'auto',
        variant: 'preset'
      });

      expect(OverflowParser.parse('overscroll-contain')).toEqual({
        property: 'overscrollBehavior',
        value: 'contain',
        variant: 'preset'
      });

      expect(OverflowParser.parse('overscroll-x-none')).toEqual({
        property: 'overscrollBehaviorX',
        value: 'none',
        variant: 'preset'
      });
    });

    test('should parse visibility utilities', () => {
      expect(OverflowParser.parse('visible')).toEqual({
        property: 'visibility',
        value: 'visible',
        variant: 'preset'
      });

      expect(OverflowParser.parse('invisible')).toEqual({
        property: 'visibility',
        value: 'hidden',
        variant: 'preset'
      });

      expect(OverflowParser.parse('collapse')).toEqual({
        property: 'visibility',
        value: 'collapse',
        variant: 'preset'
      });
    });

    test('should parse text overflow utilities', () => {
      expect(OverflowParser.parse('truncate')).toEqual({
        property: 'overflow, textOverflow, whiteSpace',
        value: ['hidden', 'ellipsis', 'nowrap'],
        variant: 'preset'
      });

      expect(OverflowParser.parse('text-ellipsis')).toEqual({
        property: 'textOverflow',
        value: 'ellipsis',
        variant: 'preset'
      });

      expect(OverflowParser.parse('text-clip')).toEqual({
        property: 'textOverflow',
        value: 'clip',
        variant: 'preset'
      });
    });

    test('should return null for invalid classes', () => {
      expect(OverflowParser.parse('invalid-class')).toBeNull();
      expect(OverflowParser.parse('text-blue-500')).toBeNull();
    });
  });

  describe('applyOverflowStyle method', () => {
    test('should apply overflow correctly', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'overflow-hidden',
        value: '',
        baseClassName: 'overflow-hidden'
      };

      OverflowParser.applyOverflowStyle(parsedClass, styles, {});

      expect(styles.overflow).toEqual({
        overflow: 'hidden'
      });
    });

    test('should handle text overflow classes like truncate', () => {
      const styles: any = {};
      const parsedClass = {
        property: 'truncate',
        value: '',
        baseClassName: 'truncate'
      };

      OverflowParser.applyOverflowStyle(parsedClass, styles, {});

      expect(styles.overflow).toEqual({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      });
    });
  });
}); 