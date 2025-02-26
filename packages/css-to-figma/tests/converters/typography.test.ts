import { describe, it, expect } from 'vitest';
import { convertTypography } from '../../src/converters/typography';

describe('Typography Converter', () => {
  describe('Font Size', () => {
    it('should convert text size classes', () => {
      expect(convertTypography('text-xs')).toEqual({
        fontSize: 12
      });

      expect(convertTypography('text-sm')).toEqual({
        fontSize: 14
      });

      expect(convertTypography('text-base')).toEqual({
        fontSize: 16
      });

      expect(convertTypography('text-lg')).toEqual({
        fontSize: 18
      });

      expect(convertTypography('text-xl')).toEqual({
        fontSize: 20
      });

      expect(convertTypography('text-2xl')).toEqual({
        fontSize: 24
      });
    });
  });

  describe('Font Weight', () => {
    it('should convert font weight classes', () => {
      expect(convertTypography('font-normal')).toEqual({
        fontName: { family: 'Inter', style: 'Regular' }
      });

      expect(convertTypography('font-medium')).toEqual({
        fontName: { family: 'Inter', style: 'Medium' }
      });

      expect(convertTypography('font-semibold')).toEqual({
        fontName: { family: 'Inter', style: 'SemiBold' }
      });

      expect(convertTypography('font-bold')).toEqual({
        fontName: { family: 'Inter', style: 'Bold' }
      });
    });
  });

  describe('Text Alignment', () => {
    it('should convert text alignment classes', () => {
      expect(convertTypography('text-left')).toEqual({
        textAlignHorizontal: 'LEFT'
      });

      expect(convertTypography('text-center')).toEqual({
        textAlignHorizontal: 'CENTER'
      });

      expect(convertTypography('text-right')).toEqual({
        textAlignHorizontal: 'RIGHT'
      });

      expect(convertTypography('text-justify')).toEqual({
        textAlignHorizontal: 'JUSTIFIED'
      });
    });
  });

  describe('Line Height', () => {
    it('should convert line height classes', () => {
      expect(convertTypography('leading-none')).toEqual({
        lineHeight: { value: 100, unit: 'PERCENT' }
      });

      expect(convertTypography('leading-tight')).toEqual({
        lineHeight: { value: 125, unit: 'PERCENT' }
      });

      expect(convertTypography('leading-normal')).toEqual({
        lineHeight: { value: 150, unit: 'PERCENT' }
      });

      expect(convertTypography('leading-relaxed')).toEqual({
        lineHeight: { value: 165, unit: 'PERCENT' }
      });
    });
  });

  describe('Letter Spacing', () => {
    it('should convert letter spacing classes', () => {
      expect(convertTypography('tracking-tighter')).toEqual({
        letterSpacing: -0.8
      });

      expect(convertTypography('tracking-tight')).toEqual({
        letterSpacing: -0.4
      });

      expect(convertTypography('tracking-normal')).toEqual({
        letterSpacing: 0
      });

      expect(convertTypography('tracking-wide')).toEqual({
        letterSpacing: 0.4
      });
    });
  });

  describe('Text Decoration', () => {
    it('should convert text decoration classes', () => {
      expect(convertTypography('underline')).toEqual({
        textDecoration: 'UNDERLINE'
      });

      expect(convertTypography('line-through')).toEqual({
        textDecoration: 'STRIKETHROUGH'
      });

      expect(convertTypography('no-underline')).toEqual({
        textDecoration: 'NONE'
      });
    });
  });

  describe('Combined Properties', () => {
    it('should combine multiple typography properties', () => {
      expect(convertTypography('text-xl font-bold text-center leading-relaxed tracking-wide')).toEqual({
        fontSize: 20,
        fontName: { family: 'Inter', style: 'Bold' },
        textAlignHorizontal: 'CENTER',
        lineHeight: { value: 165, unit: 'PERCENT' },
        letterSpacing: 0.4
      });
    });
  });
});
