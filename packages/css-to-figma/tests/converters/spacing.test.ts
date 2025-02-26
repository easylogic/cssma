import { describe, it, expect } from 'vitest';
import { convertSpacing } from '../../src/converters/spacing';

describe('Spacing Converter', () => {
  describe('Gap', () => {
    it('should convert gap classes', () => {
      expect(convertSpacing('gap-4')).toEqual({
        itemSpacing: 16,
        counterAxisSpacing: 16
      });

      expect(convertSpacing('gap-8')).toEqual({
        itemSpacing: 32,
        counterAxisSpacing: 32
      });
    });

    it('should convert directional gap classes', () => {
      expect(convertSpacing('gap-x-4')).toEqual({
        itemSpacing: 16
      });

      expect(convertSpacing('gap-y-4')).toEqual({
        counterAxisSpacing: 16
      });

      expect(convertSpacing('gap-x-4 gap-y-6')).toEqual({
        itemSpacing: 16,
        counterAxisSpacing: 24
      });
    });

    it('should handle arbitrary gap values', () => {
      expect(convertSpacing('gap-[20]')).toEqual({
        itemSpacing: 20,
        counterAxisSpacing: 20
      });

      expect(convertSpacing('gap-x-[10] gap-y-[15]')).toEqual({
        itemSpacing: 10,
        counterAxisSpacing: 15
      });
    });
  });

  describe('Padding', () => {
    it('should convert padding classes', () => {
      expect(convertSpacing('p-4')).toEqual({
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 16
      });

      expect(convertSpacing('p-8')).toEqual({
        paddingTop: 32,
        paddingRight: 32,
        paddingBottom: 32,
        paddingLeft: 32
      });
    });

    it('should convert directional padding classes', () => {
      expect(convertSpacing('px-4')).toEqual({
        paddingLeft: 16,
        paddingRight: 16
      });

      expect(convertSpacing('py-4')).toEqual({
        paddingTop: 16,
        paddingBottom: 16
      });

      expect(convertSpacing('pt-4')).toEqual({
        paddingTop: 16
      });

      expect(convertSpacing('pr-4')).toEqual({
        paddingRight: 16
      });

      expect(convertSpacing('pb-4')).toEqual({
        paddingBottom: 16
      });

      expect(convertSpacing('pl-4')).toEqual({
        paddingLeft: 16
      });
    });

    it('should handle arbitrary padding values', () => {
      expect(convertSpacing('p-[20]')).toEqual({
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20
      });

      expect(convertSpacing('px-[10] py-[15]')).toEqual({
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15
      });
    });
  });

  describe('Combined Properties', () => {
    it('should combine gap and padding properties', () => {
      expect(convertSpacing('gap-4 p-6')).toEqual({
        itemSpacing: 16,
        counterAxisSpacing: 16,
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingLeft: 24
      });

      expect(convertSpacing('gap-x-4 py-6 px-4')).toEqual({
        itemSpacing: 16,
        paddingTop: 24,
        paddingRight: 16,
        paddingBottom: 24,
        paddingLeft: 16
      });
    });

    it('should handle mixed standard and arbitrary values', () => {
      expect(convertSpacing('gap-4 p-[25]')).toEqual({
        itemSpacing: 16,
        counterAxisSpacing: 16,
        paddingTop: 25,
        paddingRight: 25,
        paddingBottom: 25,
        paddingLeft: 25
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string', () => {
      expect(convertSpacing('')).toEqual({});
    });

    it('should handle invalid values', () => {
      expect(convertSpacing('gap-invalid')).toEqual({});
      expect(convertSpacing('p-invalid')).toEqual({});
    });

    it('should handle zero values', () => {
      expect(convertSpacing('gap-0')).toEqual({
        itemSpacing: 0,
        counterAxisSpacing: 0
      });

      expect(convertSpacing('p-0')).toEqual({
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0
      });
    });
  });
});
